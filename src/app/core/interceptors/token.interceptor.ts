import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '../services/token.service';
import { ToastrService } from 'ngx-toastr';
import { catchError, tap, throwError } from 'rxjs';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);
  const toastr = inject(ToastrService);

  const excludedUrls = ['/auth/login', '/auth/signup', '/auth/otp'];

  if (excludedUrls.some((url) => req.url.includes(url))) {
    return next(req);
  }

  const token = tokenService.getToken();

  const modifiedReq = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  return next(modifiedReq).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage =
        error.error?.message || error.error?.error || 'Something went wrong';
      toastr.error(errorMessage);
      return throwError(() => error);
    })
  );
};
