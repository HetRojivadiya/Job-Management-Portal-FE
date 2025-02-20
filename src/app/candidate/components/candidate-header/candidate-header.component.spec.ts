import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateHeaderComponent } from './candidate-header.component';

describe('CandidateHeaderComponent', () => {
  let component: CandidateHeaderComponent;
  let fixture: ComponentFixture<CandidateHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CandidateHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidateHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
