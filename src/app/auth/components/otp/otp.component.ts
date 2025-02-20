import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ROUTES } from '../../constants/routes';
import { ERROR_MESSAGES } from '../../constants/errors.constants';
import { LoggerService } from '../../../core/services/logger.service';
import { MESSAGES } from '../../constants/messages.constants';

@Component({
  selector: 'app-otp',
  standalone: false,
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss'],
})
export class OtpComponent implements OnInit {
  otpForm: FormGroup;
  token: string = '';
  isEnable2FAPage: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private logger: LoggerService
  ) {
    this.otpForm = this.fb.group({
      otp: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
    });
  }

  ngOnInit() {
    this.token = localStorage.getItem('token') || '';
    localStorage.removeItem('token');
    this.route.url.subscribe((segments) => {
      this.isEnable2FAPage = segments.some(segment => segment.path === 'enable2FA');
    });
  }

  onSubmit(): void {
    if (this.otpForm.invalid) {
      this.toastr.error(ERROR_MESSAGES.INVALID_OTP);
      return;
    }
    const otpData = { otp: this.otpForm.value.otp, token: this.token };
    this.authService.verifyOtp(otpData).subscribe({
      next: (res) => {
        if (res.statusCode === 200) {
          this.toastr.success(MESSAGES.OTP_VERIFIED_SUCCESSFULLY);
          localStorage.setItem('token', res.data || '');
          this.router.navigate([ROUTES.HOME]);
        }
      },
      error: (err) => {
        this.toastr.error(err.error.message);
      },
    });
  }

  enable2FA() {
    localStorage.setItem('token', this.token);
    this.authService.enable2FA().subscribe({
      next: (res) => {
        localStorage.setItem('qrCode', res.qrCode);
        localStorage.setItem('enable2FAMessage', res.message);
        this.router.navigate([ROUTES.ENABLE_2FA]);
      },
      error: (err) => {
        this.logger.error(`${ERROR_MESSAGES.ENABLE_2FA_FAILED}: ${err.message}`);
        this.toastr.error(
          err.error.message || ERROR_MESSAGES.ENABLE_2FA_FAILED
        );
      },
    });
  }
}
