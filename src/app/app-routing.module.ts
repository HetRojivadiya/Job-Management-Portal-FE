import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';
import { loggedInGuard } from './core/guards/logged-in.guard';
import { UnauthorizedComponent } from './shared/components/common/unauthorized/unauthorized.component';
import { NotFoundComponent } from './shared/components/common/not-found/not-found.component';
import { ProfileComponent } from './shared/components/profile/profile.component';
import { JobDetailsComponent } from './shared/components/job-details/job-details.component';



const routes: Routes = [
  { path: '', redirectTo: 'auth/signin', pathMatch: 'full' },
  { path: 'auth', canActivate: [loggedInGuard], loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  { path: 'candidate', canActivate: [authGuard],canMatch: [roleGuard], data: { role: 'Candidate' } , loadChildren: () => import('./candidate/candidate.module').then(m => m.CandidateModule)},
  { path: 'admin', canActivate: [authGuard],canMatch: [roleGuard], data: { role: 'Admin' } ,loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)},
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: 'notfound', component: NotFoundComponent },
  { path: 'profile/:id', component: ProfileComponent },
  { path: 'job-details/:id', component: JobDetailsComponent },
  { path: '**', redirectTo: 'notfound' } ,
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
