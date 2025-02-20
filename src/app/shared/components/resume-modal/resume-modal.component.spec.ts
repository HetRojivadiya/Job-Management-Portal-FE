import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeModalComponent } from './resume-modal.component';

describe('ResumeModalComponent', () => {
  let component: ResumeModalComponent;
  let fixture: ComponentFixture<ResumeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResumeModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
