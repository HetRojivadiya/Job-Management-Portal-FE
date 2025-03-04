import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { JobApplicationService } from '../../services/job-application.service';
import { getApplicationStatusChartConfig, getJobApplicationChartConfig } from '../../../shared/utils/chart-config';
import { ApplicationStatusData } from '../../model/job-application.model';
import { take } from 'rxjs';

@Component({
  selector: 'app-application-status-chart',
  standalone: false,
  templateUrl: './application-status-chart.component.html',
  styleUrls: ['./application-status-chart.component.css']
})
export class ApplicationStatusChartComponent implements OnInit {
  @ViewChild('appStatusChart') chartRef!: ElementRef;
  chart!: Chart;

  constructor(private jobApplicationService: JobApplicationService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.fetchApplicationStatus();
  }

  fetchApplicationStatus() {
    this.jobApplicationService.getApplicationStatus().pipe(take(1)).subscribe({
      next: (data) => {
        this.renderChart(data);
      },
      error: (err) => {
       throw Error(err);
      }
    });
  }

  renderChart(data:ApplicationStatusData) {
    if (this.chart) {
      this.chart.destroy();
    }

    const chartConfig = getApplicationStatusChartConfig(data);
    this.chart = new Chart(this.chartRef.nativeElement, chartConfig);
  }
}
