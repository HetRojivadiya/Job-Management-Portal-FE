import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../../shared/constants/api-endpoints.constants';
import { SignupRequest, SignupResponse, SigninRequest, SigninResponse, Disable2FAResponse, Enable2FAResponse, VerifyOtpRequest, VerifyOtpResponse, VerifyTokenRequest, VerifyTokenResponse } from '../../auth/index';
import { ApiService } from './api.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private apiService: ApiService) {}

  signup(signupData: SignupRequest): Observable<SignupResponse> {
    return this.apiService.post<SignupResponse>(API_ENDPOINTS.SIGNUP, signupData);
  }

  signin(signinData: SigninRequest): Observable<SigninResponse> {
    return this.apiService.post<SigninResponse>(API_ENDPOINTS.LOGIN, signinData);
  }

  disable2FA(): Observable<Disable2FAResponse> {
    return this.apiService.post<Disable2FAResponse>(API_ENDPOINTS.DISABLE_2FA, {}); 
  }

  enable2FA(): Observable<Enable2FAResponse> {
    return this.apiService.post<Enable2FAResponse>(API_ENDPOINTS.ENABLE_2FA, {}); 
  }

  verifyOtp(data : VerifyOtpRequest): Observable<VerifyOtpResponse> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${data.token}`);
    return this.apiService.post<VerifyOtpResponse>(
      API_ENDPOINTS.VERIFY_OTP, 
      { otp : data.otp }, 
      { headers }
    );
  }

  verifyToken(data : VerifyTokenRequest): Observable<VerifyTokenResponse> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${data.token}`);
    return this.apiService.post<VerifyTokenResponse>(API_ENDPOINTS.VERIFY_EMAIL, {}, { headers });
  }

  getRole(): Observable<{ statusCode: number; message: string; data: string }> {
    return this.apiService.get<{ statusCode: number; message: string; data: string }>(API_ENDPOINTS.CHECK_ROLE);
  }
}
