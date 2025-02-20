import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobCreateModalComponent } from './job-create-modal.component';

describe('JobCreateModalComponent', () => {
  let component: JobCreateModalComponent;
  let fixture: ComponentFixture<JobCreateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JobCreateModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobCreateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
