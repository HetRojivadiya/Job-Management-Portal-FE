import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AdminHeaderComponent } from './components/header-sidebar/admin-header/admin-header.component';
import { AdminHeaderSidebarComponent } from './components/header-sidebar/admin-header-sidebar/admin-header-sidebar.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { SharedModule } from '../shared/shared.module';
import { RootComponent } from './components/root/root.component';
import { AgGridAngular } from 'ag-grid-angular';

@NgModule({
  declarations: [
    DashboardComponent,
    SettingsComponent,
    AdminHeaderComponent,
    AdminHeaderSidebarComponent,
    UserListComponent,
    RootComponent,

  ],
  imports: [CommonModule, AdminRoutingModule, SharedModule, AgGridAngular],
})
export class AdminModule {}
