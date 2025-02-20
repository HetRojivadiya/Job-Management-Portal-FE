import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JobService } from '../../../../services/job.service';

@Component({
  selector: 'app-job-create-modal',
  standalone:false,
  templateUrl: './job-create-modal.component.html',
  styleUrls: ['./job-create-modal.component.scss'],
})
export class JobCreateModalComponent {
  @Output() closeModal = new EventEmitter<void>();
  @Output() jobCreated = new EventEmitter<void>();

  jobForm: FormGroup;
  isDropdownOpen = false;

  availableSkills: string[] = [
    'Java', 'Spring Boot', 'Angular', 'React', 'Node.js',
    'Python', 'Django', 'Flask', 'C#', '.NET',
    'SQL', 'MongoDB', 'GraphQL', 'Docker', 'Kubernetes',
    'AWS', 'Azure', 'Firebase', 'Flutter', 'Swift'
  ];

  selectedSkills: string[] = [];

  constructor(private fb: FormBuilder, private jobService: JobService) {
    this.jobForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      experience_level: [1, [Validators.required, Validators.min(0)]],
      salary_range: [20000, [Validators.required, Validators.min(0)]],
      location: ['', Validators.required],
      deadline: ['', Validators.required],
      skills: [[]],
    });
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

  submitJob(): void {
    if (this.jobForm.valid) {
      const newJob = this.jobForm.value;
      this.jobService.createJob(newJob).subscribe(() => {
        this.jobCreated.emit();
        this.closeModal.emit();
      });
    }
  }
}
