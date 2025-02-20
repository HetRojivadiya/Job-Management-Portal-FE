import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoleService } from '../../../core/services/role.service';
import { TokenService } from '../../../core/services/token.service';
import { UserIdService } from '../../../core/services/userId.service';
import { ROUTES } from '../../../auth/constants/routes';

@Component({
  selector: 'app-candidate-header',
  standalone: false,
  templateUrl: './candidate-header.component.html',
  styleUrl: './candidate-header.component.scss'
})
export class CandidateHeaderComponent implements OnInit {
  userId: string | null = null;
  userName: string | null = null;

  constructor(
    private router: Router, 
    private roleService: RoleService,
    private tokenService: TokenService,
    private userIdService: UserIdService
  ) {}

  ngOnInit(): void {
    this.userId = this.userIdService.getId();
    this.userName = this.userIdService.getUsername();
  }

  logout(): void {
    this.tokenService.removeToken();
    this.roleService.deleteRole();
    this.userIdService.clearUserData();
    this.router.navigate([ROUTES.SIGNIN]);
  }
}