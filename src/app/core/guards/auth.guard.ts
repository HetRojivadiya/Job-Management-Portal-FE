import { inject, Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services/token.service';
import { ROUTES } from '../../auth/constants/routes';

export const authGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);
  const tokenService = inject(TokenService);
  const token = await tokenService.getToken();
  
  if (token) {
    return true;
  }
  
  router.navigate([ROUTES.SIGNIN]);
  return false;
};
