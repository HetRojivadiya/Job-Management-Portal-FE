import { Component, Input, OnInit } from '@angular/core';
import { JobApplicationService } from '../../services/job-application.service';
import { Job } from '../../model/job.model';
import { take, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-applied-jobs',
  standalone: false,
  templateUrl: './applied-jobs.component.html',
  styleUrls: ['./applied-jobs.component.scss'],
})
export class AppliedJobsComponent implements OnInit {
  @Input() userId!: string;
  @Input() isCandidate!: boolean;
  appliedJobs: Job[] = [] ; 
  selectedJob: Job | null = null;
  private destroy = new Subject<void>();

  constructor(private jobApplicationService: JobApplicationService) {}

  ngOnInit(): void {
    if (this.userId) {
      this.fetchAppliedJobs();
    }
  }
  ngOnDestroy(){
    this.destroy.next();
    this.destroy.complete();
  }


  fetchAppliedJobs(): void {
    this.jobApplicationService.appyliedJobs(this.userId).pipe(takeUntil(this.destroy)).subscribe({
      next: (response) => {
        this.appliedJobs = response.data.map(job => ({
          ...job,
          status: job.status || 'Approved' 
        }));
      },
      error: (err) => {
        throw err;
      },
    });
  }

  deleteAppliedJob(applicationId: string): void {
    this.jobApplicationService.deleteJobApplication(applicationId).pipe(take(1)).subscribe(
      (response) => {

        this.appliedJobs = this.appliedJobs.filter(job => job.applicationId !== applicationId);
        this.closeJobDetails();
      },
      (error) => {
        throw error;
      }
    );
  }

  showJobDetails(job: Job) {
    this.selectedJob = job;
  }

  closeJobDetails() {
    this.selectedJob = null;
  }
}
