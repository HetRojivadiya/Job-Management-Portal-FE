import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from '../../core/services/api.service';
import { AppliedJobsResponse } from '../model/job.model'; 

@Injectable({
  providedIn: 'root'
})
export class JobApplicationService {
  private apiUrl = '/job-application/apply';
  private appliedUrl = '/job-application/applied'; 
  private deleteAppliedUrl = '/job-application';

  constructor(private http: HttpClient,private apiService:ApiService) {}


  appyliedJobs(jobId : string)
  {
     return this.apiService.get<AppliedJobsResponse>(`${this.appliedUrl}/${jobId}`);
  }

  applyForJob(formData: FormData)
  {
    return this.apiService.post<FormData>(this.apiUrl, formData);
  }

  deleteJobApplication(applicationId: string): Observable<any> {
    return this.apiService.delete(`${this.deleteAppliedUrl}/${applicationId}`);
  }
  
}
