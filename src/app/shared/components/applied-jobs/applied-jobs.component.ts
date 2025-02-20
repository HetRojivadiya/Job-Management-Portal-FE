import { Component, Input, OnInit } from '@angular/core';
import { JobApplicationService } from '../../services/job-application.service';
import { Job } from '../../model/job.model';

@Component({
  selector: 'app-applied-jobs',
  standalone: false,
  templateUrl: './applied-jobs.component.html',
  styleUrls: ['./applied-jobs.component.scss'],
})
export class AppliedJobsComponent implements OnInit {
  @Input() userId!: string;
  appliedJobs: Job[] = [] ; 
  selectedJob: any = null;

  constructor(private jobApplicationService: JobApplicationService) {}

  ngOnInit(): void {
    if (this.userId) {
      this.fetchAppliedJobs();
    }
  }

  fetchAppliedJobs(): void {
    this.jobApplicationService.appyliedJobs(this.userId).subscribe({
      next: (response) => {
        this.appliedJobs = response.data.map(job => ({
          ...job,
          status: job.status || 'Approved' 
        }));
      },
      error: (err) => {
        console.error('Error fetching applied jobs:', err);
      },
    });
  }

  deleteAppliedJob(applicationId: string): void {
    this.jobApplicationService.deleteJobApplication(applicationId).subscribe(
      (response) => {

        this.appliedJobs = this.appliedJobs.filter(job => job.applicationId !== applicationId);
        this.closeJobDetails();
      },
      (error) => {
        console.error('Error deleting job application:', error);
      }
    );
  }

  showJobDetails(job: any) {
    this.selectedJob = job;
  }

  closeJobDetails() {
    this.selectedJob = null;
  }
}
