import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';

import { AuthService , SignupRequest , SignupResponse} from '../../index';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ERROR_MESSAGES } from '../../constants/errors.constants';
import { MESSAGES } from '../../constants/messages.constants';
import { LoggerService } from '../../../core/services/logger.service';
import { ROUTES } from '../../constants/routes';


@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})


export class SignupComponent {
  signupForm: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  showPassword: boolean = false;
  
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private logger: LoggerService,
  ) {
    this.signupForm = this.fb.nonNullable.group(
      {
        username: ['', [Validators.required, Validators.minLength(4)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        rePassword: ['', [Validators.required]],
        mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      },
      { validators: this.passwordMatchValidator } 
    );
  }
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const rePassword = control.get('rePassword')?.value;

    if (password !== rePassword) {
      control.get('rePassword')?.setErrors({ mismatch: true });
      return { mismatch: true };
    } else {
      control.get('rePassword')?.setErrors(null);
    }
    return null;
  }

  getPasswordMatchError(): boolean {
    return this.signupForm.get('rePassword')?.hasError('mismatch') ?? false;
  }

  onSubmit(): void {
    if (this.signupForm.invalid) {
      this.toastr.error(ERROR_MESSAGES.REQUIRED, ERROR_MESSAGES.VALIDATION_ERROR); 
      return;
    }
    const signupData: SignupRequest = {
      username: this.signupForm.value.username,
      email: this.signupForm.value.email,
      password: this.signupForm.value.password,
      mobile: this.signupForm.value.mobile,
    };
    this.authService.signup(signupData).subscribe({
      next: (res : SignupResponse) => {
        if (res.statusCode === 201) {
          this.toastr.success(res.message, MESSAGES.SIGNUP_SUCCESSFUL); 
          setTimeout(() => {
            this.router.navigate([ROUTES.SIGNIN]);
          }, 2000);
        }
      },
      error: (err) => {
        this.logger.error(`${ERROR_MESSAGES.SIGNUP_FAILED}: ${err.message}`);
        this.toastr.error(err.error.message || ERROR_MESSAGES.SIGNUP_FAILED); 
      },
    });
  }
}