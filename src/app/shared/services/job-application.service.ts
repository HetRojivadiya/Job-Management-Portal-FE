import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ApiService } from '../../core/services/api.service';
import { AppliedJobsResponse } from '../model/job.model';
import { API_ENDPOINTS } from '../constants/api-endpoints.constants';
import {
  ApplicationCountData,
  ApplicationCountResponse,
  ApplicationStatusData,
  ApplicationStatusResponse,
  ChangeApplicationStatus,
  UserResponse,
} from '../model/job-application.model';

@Injectable({
  providedIn: 'root',
})
export class JobApplicationService {
  constructor(private http: HttpClient, private apiService: ApiService) {}

  appyliedJobs(jobId: string): Observable<AppliedJobsResponse> {
    return this.apiService.get<AppliedJobsResponse>(
      `${API_ENDPOINTS.APPLIED_URL}/${jobId}`
    );
  }

  applyForJob(formData: FormData) {
    return this.apiService.post<FormData>(API_ENDPOINTS.APPLY_URL, formData);
  }

  deleteJobApplication(applicationId: string): Observable<void> {
    return this.apiService.delete(
      `${API_ENDPOINTS.DELETED_APPLIED_URL}/${applicationId}`
    );
  }

  changeApplicationStatus(
    statusData: ChangeApplicationStatus
  ): Observable<ChangeApplicationStatus> {
    return this.apiService.post<ChangeApplicationStatus>(
      API_ENDPOINTS.CHANGE_APPLICATION_STATUS,
      statusData
    );
  }

  getApplicants(jobId: string): Observable<UserResponse[]> {
    return this.apiService
      .get<{ statusCode: number; message: string; data: UserResponse[] }>(
        `${API_ENDPOINTS.GET_APPLICATNS}/${jobId}`
      )
      .pipe(map((response) => response.data));
  }

  getApplicationStatus(): Observable<ApplicationStatusData> {
    return this.apiService
      .get<ApplicationStatusResponse>(API_ENDPOINTS.APPLICATION_STATUS)
      .pipe(map((response) => response.data));
  }

  getApplicationCount(year: number): Observable<ApplicationCountData> {
    return this.apiService
      .get<ApplicationCountResponse>(
        `${API_ENDPOINTS.APPLICATION_COUNT}?year=${year}`
      )
      .pipe(map((response) => response.data));
  }
}
