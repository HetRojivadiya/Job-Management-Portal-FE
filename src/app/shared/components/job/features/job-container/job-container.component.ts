import { Component, OnInit } from '@angular/core';
import { JobService } from '../../../../services/job.service';
import { Job } from '../../../../model/job.model';
import { RoleService } from '../../../../../core/services/role.service';
import { JobApplicationService } from '../../../../services/job-application.service';

@Component({
  selector: 'app-job-container',
  standalone:false,
  templateUrl: './job-container.component.html',
  styleUrls: ['./job-container.component.scss'],
})
export class JobContainerComponent implements OnInit {
  jobs: Job[] = [];
  isAdmin: boolean = false;
  selectedJob: Job | null = null;
  isModalOpen: boolean = false;
  isDeleteModalOpen: boolean = false;
  jobToDelete: string | null = null;
  isApplyModalOpen: boolean = false;
selectedJobId: string | null = null;  

  constructor(private jobService: JobService, private roleService: RoleService,private jobApplicationService : JobApplicationService) {}

  ngOnInit(): void {
    this.checkAdminStatus();
    this.fetchJobs();
  }

  fetchJobs(): void {
    this.jobService.getJobs().subscribe({
      next: (data) => {
        this.jobs = data;
      },
      error: (err) => {
        console.error('Error fetching jobs:', err);
      },
    });
  }

  async checkAdminStatus(): Promise<void> {
    const role = await this.roleService.getRole();
    this.isAdmin = role === 'Admin';
  }

  openEditModal(job: Job): void {
    this.selectedJob = { ...job };
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedJob = null;
  }

  handleJobUpdated(): void {
    this.fetchJobs();
  }

  openDeleteModal(jobId: string): void {
    this.jobToDelete = jobId;
    this.isDeleteModalOpen = true;
  }

  closeDeleteModal(): void {
    this.isDeleteModalOpen = false;
    this.jobToDelete = null;
  }

  confirmDelete(): void {
    if (this.jobToDelete) {
      this.jobService.deleteJob(this.jobToDelete).subscribe({
        next: () => {
          this.jobs = this.jobs.filter(job => job.id !== this.jobToDelete);
          this.closeDeleteModal();
        },
        error: (err) => {
          console.error('Error deleting job:', err);
        },
      });
    }
  }

  openApplyModal(jobId: string): void {
    this.selectedJobId = jobId;
    this.isApplyModalOpen = true;
  }
  
  closeApplyModal(): void {
    this.isApplyModalOpen = false;
    this.selectedJobId = null;
  }
  
  handleJobApplied(): void {
    this.fetchJobs(); 
    this.closeApplyModal();
  }


  handleJobCreated(): void {
    this.fetchJobs(); 
  }
  
  
}
