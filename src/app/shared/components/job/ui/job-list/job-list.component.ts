import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Job } from '../../../../model/job.model';

@Component({
  selector: 'app-job-list',
  standalone:false,
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss'],
})
export class JobListComponent {
  @Input() jobs: Job[] = [];
  @Input() isAdmin: boolean = false;
  @Output() editJob = new EventEmitter<Job>();
  @Output() deleteJob = new EventEmitter<string>();
  @Output() applyJob = new EventEmitter<string>();

}
