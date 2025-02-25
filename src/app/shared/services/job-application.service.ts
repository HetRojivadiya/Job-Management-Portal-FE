import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from '../../core/services/api.service';
import { AppliedJobsResponse } from '../model/job.model'; 
import { API_ENDPOINTS } from '../constants/api-endpoints.constants';

@Injectable({
  providedIn: 'root'
})
export class JobApplicationService {
  constructor(private http: HttpClient,private apiService:ApiService) {}

  appyliedJobs(jobId : string){
     return this.apiService.get<AppliedJobsResponse>(`${API_ENDPOINTS.APPLIED_URL}/${jobId}`);
  }

  applyForJob(formData: FormData){
    return this.apiService.post<FormData>(API_ENDPOINTS.APPLY_URL, formData);
  }

  deleteJobApplication(applicationId: string): Observable<void> {
    return this.apiService.delete(`${API_ENDPOINTS.DELETED_APPLIED_URL}/${applicationId}`);
  }
  
}
