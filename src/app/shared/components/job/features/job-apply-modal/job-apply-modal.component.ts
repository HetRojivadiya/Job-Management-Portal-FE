import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JobApplicationService } from '../../../../services/job-application.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-job-apply-modal',
  standalone: false,
  templateUrl: './job-apply-modal.component.html',
  styleUrls: ['./job-apply-modal.component.scss']
})
export class JobApplyModalComponent {
  @Input() jobId: string | null = null;
  @Input() isOpen: boolean = false;
  @Output() closeModal = new EventEmitter<void>();
  @Output() applicationSubmitted = new EventEmitter<void>();

  applyForm: FormGroup;
  selectedFile: File | null = null;
  isSubmitting: boolean = false;
  showSuccess: boolean = false;

  constructor(
    private fb: FormBuilder,
    private jobApplicationService: JobApplicationService
  ) {
    this.applyForm = this.fb.group({
      resume: [null, Validators.required]
    });
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      if (file.type === 'application/pdf') {
        this.selectedFile = file;
      } 
    }
  }
  

  clearSelectedFile(event: Event): void {
    event.stopPropagation();
    this.selectedFile = null;
    this.applyForm.get('resume')?.setValue(null);
  }

  submitApplication(): void {
    if (!this.jobId || !this.selectedFile) return;

    this.isSubmitting = true;
    const formData = new FormData();
    formData.append('jobId', this.jobId);
    formData.append('resume', this.selectedFile);

    this.jobApplicationService.applyForJob(formData).pipe(take(1)).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.showSuccess = true;
        setTimeout(() => {
          this.applicationSubmitted.emit();
          this.showSuccess = false;
          this.closeModal.emit();
        }, 3000); 
      },
      error: (err) => {
        this.isSubmitting = false;
      }
    });
  }
}