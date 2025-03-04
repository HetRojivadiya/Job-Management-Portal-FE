export interface SignupRequest {
    username: string;
    email: string;
    password: string;
    mobile: string;
  }
  
export interface SignupResponse {
    statusCode: number;
    message: string;
}

export interface SigninRequest { 
    email : string;
    password : string;
}

export interface SigninData {
    token: string;
    role : string;
    twoFactorEnabled : boolean;
    isPopup : boolean,
}

export interface  SigninResponse {
    statusCode: number;
    message: string;
    data : SigninData;
}


export interface Disable2FARequest { 
    token: string;
}

export interface  Disable2FAResponse {
    statusCode: number;
    message: string;
    data : Disable2FARequest;
}

export interface Enable2FAResponse {
    qrCode: string;
    message: string;
}

export interface VerifyOtpRequest {
    otp: string;
    token: string;
}

export interface VerifyOtpResponse {
    statusCode: number;
    message: string;
    data?: string;
}

export interface VerifyTokenRequest {
    token: string;
}

export interface VerifyTokenResponse {
    status: boolean;
}


export interface ForgotPasswordRequest {
    email : string;
}

export interface ForgotPasswordResponse {
    statusCode :number;
    message :string;
}

export interface ResetPasswordRequest {
    newPassword: string;
    token: string;
}

export interface ResetPasswordResponse {
    statusCode :number;
    message :string;
}