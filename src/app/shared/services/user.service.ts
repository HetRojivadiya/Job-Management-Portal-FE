import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../core/services/api.service';
import { API_ENDPOINTS } from '../constants/api-endpoints.constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apiService: ApiService) {}
  
  getUserProfile(userId: string): Observable<any> {
    return this.apiService.get<any>(`${API_ENDPOINTS.GET_PROFILE_URL}${userId}`);
  }

  
  addSkills(skills: { skillName: string; proficiencyLevel: number }[]): Observable<any> {
    return this.apiService.post<any>(API_ENDPOINTS.ADD_SKILLS_URL, skills);
  }
  
  deleteSkill(userSkillId: string): Observable<any> {
    const httpOptions = {
      body: { userSkillIds: [userSkillId] },
    };
    return this.apiService.delete<any>(API_ENDPOINTS.DELETE_SKILLS_URL, httpOptions);
  }

  uploadResume(formData: FormData): Observable<any> {
    return this.apiService.post<any>(API_ENDPOINTS.UPLOAD_RESUME_URL, formData);
  }

  updateResume(formData: FormData): Observable<any> {
    return this.apiService.put<any>(API_ENDPOINTS.UPLOAD_RESUME_URL, formData);
  }

  deleteResume(): Observable<any> {
    return this.apiService.delete<any>(API_ENDPOINTS.DELETED_APPLIED_URL);
  }

}
