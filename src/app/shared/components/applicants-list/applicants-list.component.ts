import { Component, Input, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { Colors } from '../../enums/colors.enum';
import { JobApplicationService } from '../../services/job-application.service';
import { UserResponse, UserProfileResponse } from '../../model/job-application.model';

@Component({
  selector: 'app-applicants-list',
  standalone: false,
  templateUrl: './applicants-list.component.html',
  styleUrl: './applicants-list.component.scss'
})
export class ApplicantsListComponent implements OnInit {

  @Input() jobId: string = '';
  applicants: (UserProfileResponse & { colorClass?: string })[] = [];
  colors: string[] = Object.values(Colors);

  constructor(private jobApplicationService: JobApplicationService) {}

  ngOnInit(): void {
    this.fetchApplicants();
  }

  fetchApplicants(): void {
    this.jobApplicationService.getApplicants(this.jobId).pipe(take(1)).subscribe(
      (users: UserResponse[]) => {
        this.applicants = users.map((userResponse, index) => ({
          ...userResponse.userProfile, 
          colorClass: this.colors[index % this.colors.length] 
        }));
      },
      (error) => {
        throw Error(error);
      }
    );
  }
  
}
