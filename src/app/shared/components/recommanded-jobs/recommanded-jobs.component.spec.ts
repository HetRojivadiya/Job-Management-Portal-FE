import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommandedJobsComponent } from './recommanded-jobs.component';

describe('RecommandedJobsComponent', () => {
  let component: RecommandedJobsComponent;
  let fixture: ComponentFixture<RecommandedJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecommandedJobsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecommandedJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
