import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { firstValueFrom } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private role: string | null = null;

  constructor(
    private authService: AuthService,
    private tokenService: TokenService
  ) {}

  setRole(role: string): void {
    this.role = role;
  }

  async getRole(): Promise<string> {
    if (this.tokenService.getToken()) {
      if (this.role) {
        return this.role;
      }
      try {
        const res = await firstValueFrom(this.authService.getRole());
        this.role = res.data;
        return this.role;
      } catch {
        throw new Error('Error fetching role:');
      }
    }
    return '';
  }

  deleteRole(): void {
    this.role = null;
  }
}
