import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationStatusChartComponent } from './application-status-chart.component';

describe('ApplicationStatusChartComponent', () => {
  let component: ApplicationStatusChartComponent;
  let fixture: ComponentFixture<ApplicationStatusChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApplicationStatusChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicationStatusChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
