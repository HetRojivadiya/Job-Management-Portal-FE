import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../core/services/api.service';
import { UserResponse } from '../models/user-response.model';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private readonly userUrl = '/user/get-all-users';

  constructor(private apiService: ApiService) {}

  getAllUsers(): Observable<{ data: UserResponse[] }> {
    return this.apiService.get<{ data: UserResponse[] }>(this.userUrl);
  }
}
