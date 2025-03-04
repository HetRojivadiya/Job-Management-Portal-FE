import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';
import { loggedInGuard } from './core/guards/logged-in.guard';
import { UnauthorizedComponent } from './shared/components/common/unauthorized/unauthorized.component';
import { NotFoundComponent } from './shared/components/common/not-found/not-found.component';
import { ProfileComponent } from './shared/components/profile/profile.component';
import { JobDetailsComponent } from './shared/components/job-details/job-details.component';
import { ROUTING } from './shared/constants/routes';
import { ROUTES } from './auth/constants/routes';
import { CONDITION } from './shared/constants/conditional.constants';



const routes: Routes = [
  { path: '', redirectTo: ROUTES.SIGNIN, pathMatch: 'full' },
  { path: ROUTING.AUTH, canActivate: [loggedInGuard], loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  { path: ROUTING.CANDIDATE, canActivate: [authGuard],canMatch: [roleGuard], data: { role: CONDITION.CANDIDATE } , loadChildren: () => import('./candidate/candidate.module').then(m => m.CandidateModule)},
  { path: ROUTING.ADMIN, canActivate: [authGuard],canMatch: [roleGuard], data: { role: CONDITION.ADMIN } ,loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)},
  { path: ROUTING.UNAUTHORIZED, component: UnauthorizedComponent },
  { path: ROUTING.NOT_FOUND, component: NotFoundComponent },
  { path: ROUTING.PROFILE, component: ProfileComponent },
  { path: ROUTING.JOB_DETAILS, component: JobDetailsComponent },
  { path: '**', redirectTo: 'notfound' } ,
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
