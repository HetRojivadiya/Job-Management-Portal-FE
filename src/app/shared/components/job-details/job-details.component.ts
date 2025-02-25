import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobService } from '../../services/job.service';
import { Location } from '@angular/common';
import { Job } from '../../model/job.model';
import { Subscription, switchMap } from 'rxjs';
import { ROUTES } from '../../../auth/constants/routes';
import { ERROR } from '../../constants/error.constants';

@Component({
  selector: 'app-job-details',
  standalone: false,
  templateUrl: './job-details.component.html',
  styleUrl: './job-details.component.scss'
})
export class JobDetailsComponent implements OnInit, OnDestroy {
  jobDetails: Job | null = null;
  private routeSubscription: Subscription | null = null;

  constructor(
    private jobService: JobService,
    private route: ActivatedRoute,
    private location: Location,
    private router : Router,
  ) {}

  ngOnInit(): void {
    this.routeSubscription = this.route.paramMap.pipe(
      switchMap(params => {
        const jobId = params.get('id');
        if (jobId) {
          return this.jobService.fetchJobDetails(jobId);
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

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  goBack(): void {
   this.router.navigate([ROUTES.SIGNIN]);
  }
}