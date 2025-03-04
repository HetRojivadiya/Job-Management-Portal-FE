import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserService } from '../../services/user.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { API_ENDPOINTS } from '../../constants/api-endpoints.constants';
import { MESSAGES } from '../../constants/message.constants';
import { ModalType } from '../../enums/modal-type.enum';
import { ProfileResponse, UserProfile } from '../../model/user-profile.model';
import { take } from 'rxjs';

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
  modalType: string | null = null;
  isHovering = false;
  isUploading = false;
  uploadProgress = 0;
  confirmDelete = false;
  showConfirmation = false;
  modalMessage = '';
  showModal = false;
  selectedResumeSize : string | null = null;
  userProfile: UserProfile = {} as UserProfile;

  constructor(private userService: UserService, private sanitizer: DomSanitizer) {}
  ngOnInit(): void {
    if (this.userId) {
      this.fetchResume();
    }
  }
  fetchResume(): void {
    this.userService.getUserProfile(this.userId).pipe(take(1)).subscribe({
      next: (response : ProfileResponse) => {
        this.userProfile = response.data || ({} as UserProfile);
        this.resumePath = this.userProfile?.resume?.system_path || '';
        if (this.resumePath) {
          this.resumeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
            `${API_ENDPOINTS.GET_RESUME_LINK}${this.resumePath.split('/').pop()}`
          );
          this.resumeName = response.data?.resume?.name || '';
        }
      },
      error: (err) => {
          throw err;
      }
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedResume = input.files[0];
  
      this.selectedResumeSize = this.selectedResume.size 
        ? this.formatFileSize(this.selectedResume.size) 
        : null;
  
      this.uploadProgress = 0;
    }
  }
  

  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  uploadResume(): void {
    if (!this.selectedResume) {
      this.modalMessage = MESSAGES.SELECT_FILE;
      this.modalType = ModalType.Warning;
      this.showModal = true;
      return;
    }
    this.isUploading = true;
    this.simulateProgress();
    const formData = new FormData();
    formData.append('resume', this.selectedResume);
    this.userService.uploadResume(formData).pipe(take(1)).subscribe({
      next: () => {
        this.isUploading = false;
        this.uploadProgress = 100;
        this.modalMessage = MESSAGES.RESUME_UPLOAD_SUCCESSFULLY;
        this.modalType = ModalType.Success;
        this.showModal = true;
        this.fetchResume();
        this.selectedResume = null;
        setTimeout(() => this.uploadProgress = 0, 2000);
      },
      error: (err) => {
        this.isUploading = false;
        this.modalMessage = MESSAGES.RESUME_UPLOAD_FAILED;
        this.modalType = ModalType.Error;
        this.showModal = true;
        setTimeout(() => this.uploadProgress = 0, 2000);
      }
    });
  }

  updateResume(): void {
    if (!this.selectedResume) {
      this.modalMessage = MESSAGES.SELECT_FILE;
      this.modalType = ModalType.Warning;
      this.showModal = true;
      return;
    }
    this.isUploading = true;
    this.simulateProgress();
    const formData = new FormData();
    formData.append('resume', this.selectedResume);
    this.userService.updateResume(formData).pipe(take(1)).subscribe({
      next: () => {
        this.isUploading = false;
        this.uploadProgress = 100;
        this.modalMessage = MESSAGES.RESUME_UPLOAD_SUCCESSFULLY;
        this.modalType = ModalType.Success;
        this.showModal = true;
        this.fetchResume();
        this.selectedResume = null;
        setTimeout(() => this.uploadProgress = 0, 2000);
      },
      error: (err) => {
        this.isUploading = false;
        this.modalMessage = MESSAGES.RESUME_UPLOAD_FAILED;
        this.modalType = ModalType.Error;
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
    this.userService.deleteResume().pipe(take(1)).subscribe({
      next: () => {
        this.modalMessage = MESSAGES.RESUME_DELETE_SUCCESSFULLY;
        this.modalType = ModalType.Success;
        this.showModal = true;
        this.resumeUrl = null;
        this.resumeName = null;
        this.confirmDelete = false;
      },
      error: (err) => {
        this.modalMessage =MESSAGES.RESUME_DELETE_FAILED;
        this.modalType = ModalType.Error;
        this.showModal = true;
        this.confirmDelete = false;
      }
    });
  }

  showDeleteConfirmation(): void {
    this.confirmDelete = true;
    this.modalMessage = MESSAGES.ARE_YOU_SURE_DELETE_RESUME;
    this.modalType = ModalType.Warning;
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
