import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../core/services/api.service';
import { API_ENDPOINTS } from '../constants/api-endpoints.constants';
import { ProfileResponse } from '../model/user-profile.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apiService: ApiService) {}
  
  getUserProfile(userId: string): Observable<ProfileResponse> {
    return this.apiService.get<ProfileResponse>(`${API_ENDPOINTS.GET_PROFILE_URL}${userId}`);
  }
  
  addSkills(skills: { skillName: string; proficiencyLevel: number }[]): Observable<void> {
    return this.apiService.post<void>(API_ENDPOINTS.ADD_SKILLS_URL, skills);
  }
  
  deleteSkill(userSkillId: string): Observable<void> {
    const httpOptions = {
      body: { userSkillIds: [userSkillId] },
    };
    return this.apiService.delete<void>(API_ENDPOINTS.DELETE_SKILLS_URL, httpOptions);
  }

  uploadResume(formData: FormData): Observable<void> {
    return this.apiService.post<void>(API_ENDPOINTS.UPLOAD_RESUME_URL, formData);
  }

  updateResume(formData: FormData): Observable<void> {
    return this.apiService.put<void>(API_ENDPOINTS.UPDATE_RESUME_URL, formData);
  }

  deleteResume(): Observable<void> {
    return this.apiService.delete<void>(API_ENDPOINTS.DELETE_RESUME_URL);
  }

}
