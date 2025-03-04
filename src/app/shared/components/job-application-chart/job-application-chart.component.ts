import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { JobApplicationService } from '../../services/job-application.service';
import { JobService } from '../../services/job.service';
import { getJobApplicationChartConfig } from '../../utils/chart-config';
import { take } from 'rxjs';

@Component({
  selector: 'app-job-application-chart',
  standalone: false,
  templateUrl: './job-application-chart.component.html',
  styleUrls: ['./job-application-chart.component.css']
})
export class JobApplicationChartComponent implements AfterViewInit {
  @ViewChild('jobApplicationChart', { static: false }) chartRef!: ElementRef;
  
  chart!: Chart;
  jobCounts: number[] = Array(12).fill(0);
  applicationCounts: number[] = Array(12).fill(0);
  availableYears: number[] = this.generatePastYears();
  selectedYear: number = new Date().getFullYear();

  constructor(
    private jobService: JobService, 
    private applicationService: JobApplicationService
  ) {
    Chart.register(...registerables);
  }

  generatePastYears(): number[] {
    const currentYear = new Date().getFullYear();
    return [currentYear, currentYear - 1, currentYear - 2, currentYear - 3];
  }

  ngAfterViewInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.jobService.getJobCount(this.selectedYear).pipe(take(1)).subscribe(
      (data) => {
        this.jobCounts = data || Array(12).fill(0); 
        this.renderChart();
      },
      (error) => {
        throw Error(error)
      }
    );

    this.applicationService.getApplicationCount(this.selectedYear).pipe(take(1)).subscribe(
      (data) => {
        this.applicationCounts = data || Array(12).fill(0);
        this.renderChart();
      },
      (error) => {
        throw Error(error)
      }
    );
  }

  renderChart() {
    if (!this.chartRef || !this.chartRef.nativeElement) return;

    if (this.chart) this.chart.destroy();

    const ctx = this.chartRef.nativeElement.getContext('2d');
    this.chart = new Chart(ctx, getJobApplicationChartConfig(this.jobCounts, this.applicationCounts));
  }
}
