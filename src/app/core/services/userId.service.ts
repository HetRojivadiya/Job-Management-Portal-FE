import { Injectable } from '@angular/core';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class UserIdService {
  private userId: string | null = null;
  private username: string | null = null;

  constructor(private tokenService: TokenService) { 
    this.loadUserData();
  }
  
  private loadUserData(): void {
    const token = this.tokenService.getToken();
    if (token) {
      this.decodeToken(token);
    } else {
      this.clearUserData();
    }
  }

  private decodeToken(token: string): void {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.userId = payload.id || null;
      this.username = payload.username || null;
    } catch (error) {
      this.clearUserData();
    }
  }

  getId(): string | null {
    return this.userId;
  }

  getUsername(): string | null {
    return this.username;
  }

  refreshUserData(): void {
    this.loadUserData();
  }

  clearUserData(): void {
    this.userId = null;
    this.username = null;
  }
}
