import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserService } from '../../services/user.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-resume',
  standalone: false,
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss'],
})
export class ResumeComponent implements OnInit {
  @Input() userId!: string;
  @Input() isCandidate! : boolean;
  @ViewChild('fileInput') fileInput!: ElementRef;
  
  resumeUrl: SafeResourceUrl | null = null;
  selectedResume: File | null = null;
  resumeName: string | null = null;
  resumePath: string | null = null;
  isHovering = false;
  isUploading = false;
  uploadProgress = 0;
  confirmDelete = false;
  showConfirmation = false;
  modalMessage = '';
  modalType: 'success' | 'error' | 'warning' = 'success';
  showModal = false;

  constructor(private userService: UserService, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    if (this.userId) {
      this.fetchResume();
    }
  }

  fetchResume(): void {
    this.userService.getUserProfile(this.userId).subscribe({
      next: (response) => {
        this.resumePath = response.data?.resume?.system_path;
        if (this.resumePath) {
          this.resumeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
            `http://localhost:4000/uploads/resumes/${this.resumePath.split('/').pop()}`
          );
          this.resumeName = response.data?.resume?.name;
        }
      },
      error: (err) => console.error('Error fetching resume:', err),
    });
  }

  onFileSelected(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedResume = event.target.files[0];
      this.uploadProgress = 0;
    }
  }

  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  uploadResume(): void {
    if (!this.selectedResume) {
      this.modalMessage = 'Please select a resume file before uploading.';
      this.modalType = 'warning';
      this.showModal = true;
      return;
    }

    this.isUploading = true;
    this.simulateProgress();

    const formData = new FormData();
    formData.append('resume', this.selectedResume);

    this.userService.uploadResume(formData).subscribe({
      next: () => {
        this.isUploading = false;
        this.uploadProgress = 100;
        this.modalMessage = 'Resume uploaded successfully!';
        this.modalType = 'success';
        this.showModal = true;
        this.fetchResume();
        this.selectedResume = null;
        
        setTimeout(() => this.uploadProgress = 0, 2000);
      },
      error: (err) => {
        this.isUploading = false;
        console.error('Error uploading resume:', err);
        this.modalMessage = 'Failed to upload resume.';
        this.modalType = 'error';
        this.showModal = true;
        setTimeout(() => this.uploadProgress = 0, 2000);
      }
    });
  }

  updateResume(): void {
    if (!this.selectedResume) {
      this.modalMessage = 'Please select a resume file before updating';
      this.modalType = 'warning';
      this.showModal = true;
      return;
    }

    this.isUploading = true;
    this.simulateProgress();

    const formData = new FormData();
    formData.append('resume', this.selectedResume);

    this.userService.updateResume(formData).subscribe({
      next: () => {
        this.isUploading = false;
        this.uploadProgress = 100;
        this.modalMessage = 'Resume updated successfully!';
        this.modalType = 'success';
        this.showModal = true;
        this.fetchResume();
        this.selectedResume = null;
        
        setTimeout(() => this.uploadProgress = 0, 2000);
      },
      error: (err) => {
        this.isUploading = false;
        console.error('Error updating resume:', err);
        this.modalMessage = 'Failed to update resume';
        this.modalType = 'error';
        this.showModal = true;
        
        setTimeout(() => this.uploadProgress = 0, 2000);
      }
    });
  }

  deleteResume(): void {
    if (!this.confirmDelete) {
      this.showDeleteConfirmation();
      return;
    }
    
    this.userService.deleteResume().subscribe({
      next: () => {
        this.modalMessage = 'Resume deleted successfully!';
        this.modalType = 'success';
        this.showModal = true;
        this.resumeUrl = null;
        this.resumeName = null;
        this.confirmDelete = false;
      },
      error: (err) => {
        console.error('Error deleting resume:', err);
        this.modalMessage = 'Failed to delete resume';
        this.modalType = 'error';
        this.showModal = true;
        this.confirmDelete = false;
      }
    });
  }

  showDeleteConfirmation(): void {
    this.confirmDelete = true;
    this.modalMessage = 'Are you sure you want to delete this resume?';
    this.modalType = 'warning';
    this.showModal = true;
  }


  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  simulateProgress(): void {
    this.uploadProgress = 0;
    const interval = setInterval(() => {
      if (this.uploadProgress < 90) {
        this.uploadProgress += Math.floor(Math.random() * 10) + 1;
      } else {
        clearInterval(interval);
      }
    }, 300);
  }


  closeModal(): void {
    this.showModal = false;
  }

  confirmDeleteAction(): void {
    this.deleteResume();
  }
}
