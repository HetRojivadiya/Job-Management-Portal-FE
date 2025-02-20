import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsersComponent } from './components/users/users.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AdminHeaderComponent } from './components/header-sidebar/admin-header/admin-header.component';
import { AdminHeaderSidebarComponent } from './components/header-sidebar/admin-header-sidebar/admin-header-sidebar.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { SharedModule } from '../shared/shared.module';
import { RootComponent } from './components/root/root.component';


@NgModule({
  declarations: [
    DashboardComponent,
    UsersComponent,
    SettingsComponent,
    AdminHeaderComponent,
    AdminHeaderSidebarComponent,
    UserListComponent,
    RootComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
  ]
})
export class AdminModule { }
