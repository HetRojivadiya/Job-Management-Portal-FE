import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JobUpdateModalComponent } from './components/job/ui/job-update-modal/job-update-modal.component';
import { ConfirmDialogComponent } from './components/job/ui/confirm-dialog/confirm-dialog.component';
import { JobContainerComponent } from './components/job/features/job-container/job-container.component';
import { JobListComponent } from './components/job/ui/job-list/job-list.component';
import { JobItemComponent } from './components/job/ui/job-item/job-item.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AddSkillModalComponent } from './components/add-skill-modal/add-skill-modal.component';
import { ResumeComponent } from './components/resume/resume.component';
import { ResumeModalComponent } from './components/resume-modal/resume-modal.component';
import { AppliedJobsComponent } from './components/applied-jobs/applied-jobs.component';
import { JobCreateModalComponent } from './components/job/features/job-create-modal/job-create-modal.component';
import { JobApplyModalComponent } from './components/job/features/job-apply-modal/job-apply-modal.component';
import { JobDetailsComponent } from './components/job-details/job-details.component';
import { RouterModule } from '@angular/router';
import { RecommandedJobsComponent } from './components/recommanded-jobs/recommanded-jobs.component';
import { TimeAgoPipe } from './pipes/time-ago.pipe';

import { AgGridAngular } from 'ag-grid-angular';
import { DataGridComponent } from './components/data-grid/data-grid.component'; 
import { ApplicantsListComponent } from './components/applicants-list/applicants-list.component';
import { ApplicationStatusChartComponent } from './components/application-status-chart/application-status-chart.component';
import { JobApplicationChartComponent } from './components/job-application-chart/job-application-chart.component';


@NgModule({
  declarations: [JobUpdateModalComponent, ConfirmDialogComponent, JobContainerComponent, JobListComponent, JobItemComponent, ProfileComponent, AddSkillModalComponent, ResumeComponent, ResumeModalComponent, AppliedJobsComponent, JobCreateModalComponent, JobApplyModalComponent, JobDetailsComponent, RecommandedJobsComponent, DataGridComponent,ApplicantsListComponent, ApplicationStatusChartComponent, JobApplicationChartComponent ],
  imports: [
    CommonModule,
      FormsModule,
      ReactiveFormsModule,
      RouterModule,
      TimeAgoPipe,
      AgGridAngular,
  ],
  exports: [JobContainerComponent,ProfileComponent,JobCreateModalComponent,JobDetailsComponent,TimeAgoPipe,DataGridComponent ,ApplicantsListComponent,JobApplicationChartComponent],  
})
export class SharedModule { }
