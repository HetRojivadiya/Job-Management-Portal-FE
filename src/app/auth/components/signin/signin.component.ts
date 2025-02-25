import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ERROR_MESSAGES } from '../../constants/errors.constants';
import { MESSAGES } from '../../constants/messages.constants';
import { ROUTES } from '../../constants/routes';
import { LoggerService } from '../../../core/services/logger.service';
import { RoleService } from '../../../core/services/role.service';
import { TokenService } from '../../../core/services/token.service';
import { UserIdService } from '../../../core/services/userId.service';
import { SigninData, SigninResponse } from '../../models/user.model';
import { take } from 'rxjs';

@Component({
  selector: 'app-signin',
  standalone: false,
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent {
  signinForm: FormGroup;
  showPopup: boolean = false;
  token: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private logger: LoggerService,
    private roleService: RoleService,
    private tokenService: TokenService,
    private userIdService: UserIdService,
  ) {
    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.signinForm.invalid) {
      this.logger.warn(ERROR_MESSAGES.SIGNIN_VALIDATION_FAILED);
      this.toastr.error(
        ERROR_MESSAGES.INVALID_DETAILS,
        ERROR_MESSAGES.VALIDATION_ERROR
      );
      return;
    }

    const signinData = this.signinForm.value;
    this.authService.signin(signinData).pipe(take(1)).subscribe({
      next: (res) => {
        if (res.statusCode === 200) {
          this.handleLoginSuccess(res.data);
        }
      },
      error: (err) => {
        this.logger.error(`${ERROR_MESSAGES.SIGNIN_FAILED}: ${err.message}`);
        this.toastr.error(
          err.error?.message || ERROR_MESSAGES.LOGIN_FAILED,
        );
      },
    });
  }

  private handleLoginSuccess(data :SigninData): void {
    this.roleService.setRole(data.role);
    this.tokenService.setToken(data.token);
    this.userIdService.refreshUserData(); 
    if (data.twoFactorEnabled) {
      setTimeout(() => {
        this.router.navigate([ROUTES.OTP_PAGE]);
      }, 100);
    } else if (data.isPopup) {
      this.token = data.token;
      this.showPopup = true;
    } else {
      this.toastr.success(MESSAGES.LOGIN_SUCCESSFUL);
      this.router.navigate([data.role === 'Admin' ? ROUTES.DASHBOARD : ROUTES.HOME]);
    }
  }

  enable2FA(): void {
    this.authService.enable2FA().pipe(take(1)).subscribe({
      next: (res) => {
        localStorage.setItem('qrCode', res.qrCode);
        localStorage.setItem('enable2FAMessage', res.message);
        this.router.navigate([ROUTES.ENABLE_2FA]);
      },
      error: (err) => {
        this.logger.error(`${ERROR_MESSAGES.ENABLE_2FA_FAILED}: ${err.message}`);
        this.toastr.error(
          err.error?.message || ERROR_MESSAGES.ENABLE_2FA_FAILED
        );
      },
    });
  }

  disable2FA(): void {
    this.authService.disable2FA().pipe(take(1)).subscribe({
      next: () => {
        this.toastr.success(MESSAGES.DISABLE_2FA_SUCCESSFUL);
        this.tokenService.setToken(this.token);
        this.showPopup = false;
        this.router.navigate([ROUTES.HOME]);
      },
      error: (err) => {
        this.logger.error(`${ERROR_MESSAGES.DISABLE_2FA_FAILED}: ${err.message}`);
        this.toastr.error(
          err.error?.message || ERROR_MESSAGES.DISABLE_2FA_FAILED
        );
      },
    });
  }
  
  remindMeLater(): void {
    this.tokenService.setToken(this.token);
    this.showPopup = false;
    this.router.navigate([ROUTES.HOME]);
  }
}
