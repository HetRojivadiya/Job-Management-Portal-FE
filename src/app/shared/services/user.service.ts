import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../core/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly apiUrl = '/user/get-user-profile/';
  private readonly addSkillsUrl = '/user/add-skills';
  private readonly deleteSkillUrl = '/user/delete-skills';
  private readonly updateResumeUrl = '/resume/update';
  private readonly uploadResumeUrl = '/resume/upload';
  private readonly deleteResumeUrl = '/resume/delete'; 

  constructor(private apiService: ApiService) {}

  
  getUserProfile(userId: string): Observable<any> {
    return this.apiService.get<any>(`${this.apiUrl}${userId}`);
  }

  
  addSkills(skills: { skillName: string; proficiencyLevel: number }[]): Observable<any> {
    return this.apiService.post<any>(this.addSkillsUrl, skills);
  }

  
  deleteSkill(userSkillId: string): Observable<any> {
    const httpOptions = {
      body: { userSkillIds: [userSkillId] },
    };
    return this.apiService.delete<any>(this.deleteSkillUrl, httpOptions);
  }

  uploadResume(formData: FormData): Observable<any> {
    return this.apiService.post<any>(this.uploadResumeUrl, formData);
  }

  updateResume(formData: FormData): Observable<any> {
    return this.apiService.put<any>(this.updateResumeUrl, formData);
  }

  deleteResume(): Observable<any> {
    return this.apiService.delete<any>(this.deleteResumeUrl);
  }

  
}
