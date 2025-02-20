import { inject } from '@angular/core';
import { CanMatchFn, Route, UrlSegment, Router } from '@angular/router';
import { RoleService } from '../services/role.service';
import { ROUTES } from '../../auth/constants/routes';
import { ROUTING } from '../../shared/constants/routes';

export const roleGuard: CanMatchFn = async (route: Route, segments: UrlSegment[]) => {
  const router = inject(Router);
  const roleService = inject(RoleService);
  const role = await roleService.getRole();

  if (!role) {
    router.navigate([ROUTES.SIGNIN]);
    return false;
  }

  const expectedRole = route.data?.['role']; 

  if (expectedRole && expectedRole !== role) {
    router.navigate([ROUTING.UNAUTHORIZED]);
    return false;
  }

  return true;
};
