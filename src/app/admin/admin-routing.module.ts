import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsersComponent } from './components/users/users.component';
import { SettingsComponent } from './components/settings/settings.component';
import { roleGuard } from '../core/guards/role.guard'; // Protect admin routes
import { RootComponent } from './components/root/root.component';

const routes: Routes = [
  {
    path: '',component:RootComponent,
    children : [
    { path: 'dashboard', component: DashboardComponent, canActivate: [roleGuard] },
    { path: 'users', component: UsersComponent, canActivate: [roleGuard] },
    { path: 'settings', component: SettingsComponent, canActivate: [roleGuard] },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
