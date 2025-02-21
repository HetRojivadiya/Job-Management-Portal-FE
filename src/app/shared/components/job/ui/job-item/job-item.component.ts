import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Job } from '../../../../model/job.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-item',
  standalone:false,
  templateUrl: './job-item.component.html',
  styleUrls: ['./job-item.component.scss'],
})
export class JobItemComponent {
  @Input() job!: Job;
  @Input() isAdmin: boolean = false;
  @Output() edit = new EventEmitter<Job>();
  @Output() delete = new EventEmitter<string>();
  @Output() apply = new EventEmitter<string>();

   constructor(
      private router: Router, 
    ) {}

  onEdit(): void {
    this.edit.emit(this.job);
  }

  onDelete(): void {
    this.delete.emit(this.job.id);
  }

  onApply(): void{
    this.apply.emit(this.job.id);
  }

}
