import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { JobService } from '../../../../services/job.service';
import { Job } from '../../../../model/job.model';
import { JobSkill } from '../../../../enums/job-skills.enum';
import { take } from 'rxjs';

@Component({
  selector: 'app-job-update-modal',
  standalone :false,
  templateUrl: './job-update-modal.component.html',
  styleUrls: ['./job-update-modal.component.scss'],
})
export class JobUpdateModalComponent implements OnInit {
  @Input() job: Job | null = null;
  @Output() closeModal = new EventEmitter<void>();
  @Output() jobUpdated = new EventEmitter<Partial<Job>>();

  jobForm!: FormGroup;
  isDropdownOpen: boolean = false;

  availableSkills: string[] = Object.values(JobSkill);

  selectedSkills: string[] = [];

  constructor(private fb: FormBuilder, private jobService: JobService) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.jobForm = this.fb.group({
      title: [''],
      description: [''],
      experience_level: [0],
      salary_range: [0],
      location: [''],
      deadline: [''],
      skills: [[]],
    });

    if (this.job) {
      this.jobForm.patchValue({
        ...this.job,
        skills: this.job.skills.map(skill => skill.skillName),
      });
      this.selectedSkills = this.job.skills.map(skill => skill.skillName);
    }
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  toggleSkill(skill: string): void {
    if (this.selectedSkills.includes(skill)) {
      this.selectedSkills = this.selectedSkills.filter(s => s !== skill);
    } else {
      this.selectedSkills.push(skill);
    }
    this.jobForm.controls['skills'].setValue(this.selectedSkills);
  }

  removeSkill(skill: string): void {
    this.selectedSkills = this.selectedSkills.filter(s => s !== skill);
    this.jobForm.controls['skills'].setValue(this.selectedSkills);
  }

  updateJob(): void {
    if (this.job && this.jobForm.valid) {
      const updatedJob = { ...this.job, ...this.jobForm.value };
      this.jobService.updateJob(this.job.id, updatedJob).pipe(take(1)).subscribe(() => {
        this.jobUpdated.emit();
        this.closeModal.emit();
      });


    }
  }
}
