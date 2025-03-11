import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { VerifySuccessComponent } from './components/verify-success/verify-success.component';
import { Enable2FAComponent } from './components/enable2-fa/enable2-fa.component';
import { OtpComponent } from './components/otp/otp.component';
import { authGuard } from '../core/guards/auth.guard';
import { ROUTING } from './constants/routes';

const routes: Routes = [
  { path: ROUTING.SIGNIN,component: SigninComponent}, 
  { path: ROUTING.SIGNUP,component: SignupComponent},
  { path: ROUTING.VERIFY_SUCCESS, component: VerifySuccessComponent},
  { path: ROUTING.ENABLE_2FA,canActivate: [authGuard],component: Enable2FAComponent},
  { path: ROUTING.OTP,component: OtpComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
