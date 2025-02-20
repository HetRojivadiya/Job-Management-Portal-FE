import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VerifySuccessComponent } from './components/verify-success/verify-success.component';
import { OtpComponent } from './components/otp/otp.component';
import { Enable2FAComponent } from './components/enable2-fa/enable2-fa.component';


@NgModule({
  declarations: [
    SignupComponent,
    SigninComponent,
    VerifySuccessComponent,
    OtpComponent,
    Enable2FAComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
