import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHeaderSidebarComponent } from './admin-header-sidebar.component';

describe('AdminHeaderSidebarComponent', () => {
  let component: AdminHeaderSidebarComponent;
  let fixture: ComponentFixture<AdminHeaderSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminHeaderSidebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminHeaderSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
