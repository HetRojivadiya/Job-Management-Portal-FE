import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../core/services/api.service';
import { Job } from '../model/job.model';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  private readonly jobUrl = '/jobs';
  private readonly getRecommendedJobsUrl = '/jobs/recommended';

  constructor(private apiService: ApiService) {}

  getJobs(): Observable<Job[]> {
    return this.apiService.get<Job[]>(this.jobUrl);
  }

  updateJob(jobId: string, jobData: Partial<Job>): Observable<Job> {
    return this.apiService.put<Job>(`${this.jobUrl}/${jobId}`, jobData);
  }

  deleteJob(jobId: string): Observable<void> {
    return this.apiService.delete<void>(`${this.jobUrl}/${jobId}`);
  }

  createJob(jobData: any): Observable<any> {
    return this.apiService.post<any>(this.jobUrl, jobData);
  }

  fetchJobDetails(jobId: string): Observable<Job> {
    return this.apiService.get<Job>(`${this.jobUrl}/${jobId}`);
  }

  getRecommendedJobs(): Observable<Job[]> {
    return this.apiService.get<Job[]>(this.getRecommendedJobsUrl);
  }
  
}