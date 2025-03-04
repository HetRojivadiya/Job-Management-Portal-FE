import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobApplicationChartComponent } from './job-application-chart.component';

describe('JobApplicationChartComponent', () => {
  let component: JobApplicationChartComponent;
  let fixture: ComponentFixture<JobApplicationChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JobApplicationChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobApplicationChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
