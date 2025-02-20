import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { JobContainerComponent } from '../../../shared/components/job/features/job-container/job-container.component';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  isModalOpen = false;

  @ViewChild(JobContainerComponent) jobContainer!: JobContainerComponent;

  fetchJobs() {
    if (this.jobContainer) {
      this.jobContainer.fetchJobs(); 
    }
    this.isModalOpen = false; 
  }
}
