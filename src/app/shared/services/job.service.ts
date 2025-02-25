import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../core/services/api.service';
import { Job } from '../model/job.model';
import { API_ENDPOINTS } from '../constants/api-endpoints.constants';

@Injectable({
  providedIn: 'root',
})
export class JobService {

  constructor(private apiService: ApiService) {}

  getJobs(): Observable<Job[]> {
    return this.apiService.get<Job[]>(API_ENDPOINTS.JOBS_URL);
  }

  updateJob(jobId: string, jobData: Partial<Job>): Observable<Job> {
    return this.apiService.put<Job>(`${API_ENDPOINTS.JOBS_URL}/${jobId}`, jobData);
  }

  deleteJob(jobId: string): Observable<void> {
    return this.apiService.delete<void>(`${API_ENDPOINTS.JOBS_URL}/${jobId}`);
  }

  createJob(jobData: Job): Observable<Job> {
    return this.apiService.post<Job>(API_ENDPOINTS.JOBS_URL, jobData);
  }

  fetchJobDetails(jobId: string): Observable<Job> {
    return this.apiService.get<Job>(`${API_ENDPOINTS.JOBS_URL}/${jobId}`);
  }

  getRecommendedJobs(): Observable<Job[]> {
    return this.apiService.get<Job[]>(API_ENDPOINTS.GET_RECOMMENDED_JOB_URL);
  }
  
}