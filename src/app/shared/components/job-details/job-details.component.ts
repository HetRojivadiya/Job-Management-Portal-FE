import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobService } from '../../services/job.service';
import { Location } from '@angular/common';
import { Job } from '../../model/job.model';
import { Subscription, switchMap } from 'rxjs';
import { ROUTES } from '../../../auth/constants/routes';
import { ERROR } from '../../constants/error.constants';
import { RoleService } from '../../../core/services/role.service';
import { CONDITION } from '../../constants/conditional.constants';

@Component({
  selector: 'app-job-details',
  standalone: false,
  templateUrl: './job-details.component.html',
  styleUrl: './job-details.component.scss'
})
export class JobDetailsComponent implements OnInit, OnDestroy {
  jobDetails: Job | null = null;
  private routeSubscription: Subscription | null = null;
  isCandidate: boolean = false;
  jobId : string = ''

  constructor(
    private jobService: JobService,
    private route: ActivatedRoute,
     private roleService: RoleService,
    private router : Router,
  ) {}

  ngOnInit(): void {
    this.checkAdminStatus();
    this.routeSubscription = this.route.paramMap.pipe(
      switchMap(params => {
        this.jobId = params.get('id') || '';
        if (this.jobId) {
          return this.jobService.fetchJobDetails(this.jobId);
        }
        throw new Error(ERROR.NO_JOBID);
      })
    ).subscribe({
      next: (response: Job) => {
        this.jobDetails = response;
      },
      error: (err) => {
        throw err;
      }
    });
  }

   async checkAdminStatus(): Promise<void> {
      const role = await this.roleService.getRole();
      this.isCandidate = role === CONDITION.CANDIDATE;
      
    }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  goBack(): void {
   this.router.navigate([ROUTES.SIGNIN]);
  }
}