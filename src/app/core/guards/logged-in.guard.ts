import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { RoleService } from '../services/role.service';
import { TokenService } from '../services/token.service';
import { ROUTES } from '../../auth/constants/routes';

export const loggedInGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);
  const tokenService = inject(TokenService);
  const roleService = inject(RoleService);
  const role = await roleService.getRole();
  const token = await tokenService.getToken();

  if(token)
  {
    if(role==='Candidate')
      {
        router.navigate([ROUTES.HOME]);
      }else{
        router.navigate([ROUTES.DASHBOARD])
      }
      return false;
  }
  return true; 
}
