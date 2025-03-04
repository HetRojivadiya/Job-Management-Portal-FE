import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SettingsComponent } from './components/settings/settings.component';
import { roleGuard } from '../core/guards/role.guard'; // Protect admin routes
import { RootComponent } from './components/root/root.component';
import { JobContainerComponent } from '../shared/components/job/features/job-container/job-container.component';
import { JobApplicationChartComponent } from '../shared/components/job-application-chart/job-application-chart.component';

const routes: Routes = [
  {
    path: '',component:RootComponent,
    children : [
    { path: 'dashboard', component: DashboardComponent, canActivate: [roleGuard] },
    { path: 'settings', component: SettingsComponent, canActivate: [roleGuard] },
    { path: 'joblist', component: JobContainerComponent, canActivate: [roleGuard] },
    { path: 'chart', component: JobApplicationChartComponent, canActivate: [roleGuard] },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
