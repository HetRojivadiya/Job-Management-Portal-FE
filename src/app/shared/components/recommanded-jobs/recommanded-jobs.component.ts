import { Component, OnInit } from '@angular/core';
import { JobService } from '../../services/job.service';
import { Job } from '../../model/job.model';
import { Colors } from '../../enums/colors.enum';
import { take } from 'rxjs';

@Component({
  selector: 'app-recommanded-jobs',
  standalone: false,
  templateUrl: './recommanded-jobs.component.html',
  styleUrl: './recommanded-jobs.component.scss'
})
export class RecommandedJobsComponent implements OnInit {
  recommendedJobs: Job[] = [];
  colors: string[] = Object.values(Colors);

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.fetchRecommendedJobs();
  }

  fetchRecommendedJobs(): void {
    this.jobService.getRecommendedJobs().pipe(take(1)).subscribe(
      (jobs) => {
        this.recommendedJobs = jobs.map((job, index) => ({
          ...job,
          colorClass: this.colors[index % this.colors.length]
        }));},
      (error) => {
        throw error;
      }
    );
  }
}
