import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-resume-modal',
  standalone: false,
  templateUrl: './resume-modal.component.html',
  styleUrl: './resume-modal.component.scss'
})
export class ResumeModalComponent {
    @Input() showModal = false;
    @Input() message = '';
    @Input() type: string | null = null;
    @Output() closeModal = new EventEmitter<void>();
    @Output() confirmAction = new EventEmitter<void>();
  
    close() {
      this.closeModal.emit();
    }
  
    confirm() {
      this.confirmAction.emit();
      this.close();
    }
  
}
