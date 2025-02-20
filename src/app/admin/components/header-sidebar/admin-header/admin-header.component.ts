import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RoleService } from '../../../../core/services/role.service';
import { TokenService } from '../../../../core/services/token.service';
import { UserIdService } from '../../../../core/services/userId.service';

@Component({
  selector: 'app-admin-header',
  standalone: false,
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.scss',
})
export class AdminHeaderComponent {
  userId: string | null = null;
  userName: string | null = null;

  constructor(private router: Router, private roleService: RoleService,private tokenService :TokenService, 
      private userIdService: UserIdService) {
        this.userId = this.userIdService.getId();
        this.userName = this.userIdService.getUsername();
      }

  logout(): void {
    this.tokenService.removeToken();
    this.roleService.deleteRole();
    this.userIdService.clearUserData();
    this.router.navigate(['/auth/signin']);
  }
}
