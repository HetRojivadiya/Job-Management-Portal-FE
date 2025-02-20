import { Component, EventEmitter, Output, Input } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-add-skill-modal',
  standalone : false,
  templateUrl: './add-skill-modal.component.html',
  styleUrls: ['./add-skill-modal.component.scss'],
})
export class AddSkillModalComponent {
  @Input() showSkillModal: boolean = false;
  @Output() closeModal = new EventEmitter<void>();
  @Output() skillsUpdated = new EventEmitter<void>();

  newSkills: { skillName: string; proficiencyLevel: number }[] = [
    { skillName: '', proficiencyLevel: 1 },
  ];

  constructor(private userService: UserService) {}

  addNewSkillField(): void {
    this.newSkills.push({ skillName: '', proficiencyLevel: 1 });
  }

  removeSkill(index: number): void {
    if (this.newSkills.length > 1) {
      this.newSkills.splice(index, 1);
    }
  }

  closeSkillModal(): void {
    this.closeModal.emit();
    this.newSkills = [{ skillName: '', proficiencyLevel: 1 }];
  }

  addSkills(): void {
    if (this.newSkills.some(skill => !skill.skillName.trim() || skill.proficiencyLevel < 1 || skill.proficiencyLevel > 10)) {
      return;
    }
    
    this.userService.addSkills(this.newSkills).subscribe({
      next: () => {
        this.skillsUpdated.emit();
        this.closeSkillModal();
      },
      error: (err) => {
        throw new Error(err.message);
      }
    });
  }
}
