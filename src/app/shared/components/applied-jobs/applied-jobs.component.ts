import { Component, Input, OnInit } from '@angular/core';
import { JobApplicationService } from '../../services/job-application.service';
import { Job } from '../../model/job.model';
import { take, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ChangeApplicationStatus } from '../../model/job-application.model';
import { ERROR } from '../../constants/error.constants';

@Component({
  selector: 'app-applied-jobs',
  standalone: false,
  templateUrl: './applied-jobs.component.html',
  styleUrls: ['./applied-jobs.component.scss'],
})
export class AppliedJobsComponent implements OnInit {
  @Input() userId!: string;
  @Input() isCandidate!: boolean;
  appliedJobs: Job[] = [];
  selectedJob: Job | null = null;
  private destroy = new Subject<void>();
  isModalOpen = false;
  showRejectField = false;
  rejectReason = '';
  errorMessage = '';

  constructor(private jobApplicationService: JobApplicationService) {}

  ngOnInit(): void {
    if (this.userId) {
      this.fetchAppliedJobs();
    }
  }
  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }

  fetchAppliedJobs(): void {
    this.jobApplicationService
      .appyliedJobs(this.userId)
      .pipe(takeUntil(this.destroy))
      .subscribe({
        next: (response) => {
          this.appliedJobs = response.data.map((job) => ({
            ...job,
          }));
        },
        error: (err) => {
          throw err;
        },
      });
  }

  deleteAppliedJob(applicationId: string): void {
    this.jobApplicationService
      .deleteJobApplication(applicationId)
      .pipe(take(1))
      .subscribe(
        (response) => {
          this.appliedJobs = this.appliedJobs.filter(
            (job) => job.applicationId !== applicationId
          );
          this.closeJobDetails();
        },
        (error) => {
          throw error;
        }
      );
  }

  openModal() {
    this.isModalOpen = true;
    this.showRejectField = false;
    this.rejectReason = '';
  }

  closeModal() {
    this.isModalOpen = false;
  }

  updateStatus(status: string) {
    if (status === 'Rejected' && !this.rejectReason.trim()) {
      this.errorMessage = ERROR.PROVIDE_REASON_FOR_REJECTION;
      return;
    }
    this.errorMessage = '';
    const statusData: ChangeApplicationStatus = {
      status: status,
      rejectionMessage: this.rejectReason,
      applicationId: this.selectedJob?.applicationId || '',
    };

    this.changeApplicationStatus(statusData);

    this.closeModal();
  }

  changeApplicationStatus(statusData: ChangeApplicationStatus): void {
    this.jobApplicationService
      .changeApplicationStatus(statusData)
      .pipe(takeUntil(this.destroy))
      .subscribe({
        next: () => {
          this.fetchAppliedJobs(), (this.selectedJob = null);
        },
        error: (err) => {
          throw err;
        },
      });
  }

  showJobDetails(job: Job) {
    this.selectedJob = job;
  }

  closeJobDetails() {
    this.selectedJob = null;
  }
}
