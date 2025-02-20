import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../../../core/services/token.service';
import { ROUTES } from '../../../auth/constants/routes';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private router: Router,private tokenService : TokenService) {}

  logout(): void {
    this.tokenService.removeToken();
    this.router.navigate([ROUTES.SIGNIN]);
  }
}
