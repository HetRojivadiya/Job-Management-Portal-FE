import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { UserProfile } from '../../model/user-profile.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Location } from '@angular/common';
import { RoleService } from '../../../core/services/role.service';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  userProfile: UserProfile = {} as UserProfile;
  resumeUrl: SafeResourceUrl | null = null;
  showSkillModal: boolean = false;
  isDeletingSkill: boolean = false;
  isCandidate: boolean = false;
 
  newSkills: { skillName: string; proficiencyLevel: number }[] = [
    { skillName: '', proficiencyLevel: 1 },
  ];
  

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private location: Location,
     private roleService: RoleService,
  ) {}

  ngOnInit(): void {
    this.checkAdminStatus();
    const userId= this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.fetchUserProfile(userId);
    }
  }

  async checkAdminStatus(): Promise<void> {
    const role = await this.roleService.getRole();
    this.isCandidate = role === 'Candidate';
    
  }

  fetchUserProfile(userId: string): void {
    this.userService.getUserProfile(userId).subscribe({
      next: (response) => {
        this.userProfile = response.data || ({} as UserProfile);
        this.userProfile.skills = this.userProfile.skills || [];
        if (this.userProfile?.resume?.system_path) {
          this.resumeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
            'http://localhost:4000/uploads/resumes/' +
              this.userProfile.resume.system_path.split('/').pop()
          );
        }
      },
      error: (err) => {throw new Error(err);}
    });
  }

  openSkillModal(): void {
    this.showSkillModal = true;
  }

  closeSkillModal(): void {
    this.showSkillModal = false;
    this.newSkills = [{ skillName: '', proficiencyLevel: 1 }]; 
  }

  removeSkill(index: number): void {
    if (this.newSkills.length > 1) {
      this.newSkills.splice(index, 1);
    }
  }

  toggleDeleteSkillMode(): void {
    this.isDeletingSkill = !this.isDeletingSkill; 
  }

  deleteSkill(skillId: string): void {
    if (!this.userProfile.skills) return; 
  
    this.userService.deleteSkill(skillId).subscribe({
      next: () => {
        const index = this.userProfile.skills!.findIndex(skill => skill.userSkillId === skillId);
        if (index !== -1) {
          this.userProfile.skills!.splice(index, 1);
        }
      },
      error: (err) => {
        throw new Error(err);
      }
    });
  }

  refreshSkills(): void {
    this.fetchUserProfile(this.userProfile.userId);
  }
  
  goBack(): void {
    this.location.back();
  }
}
