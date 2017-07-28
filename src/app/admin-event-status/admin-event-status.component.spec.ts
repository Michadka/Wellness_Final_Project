import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEventStatusComponent } from './admin-event-status.component';

describe('AdminEventStatusComponent', () => {
  let component: AdminEventStatusComponent;
  let fixture: ComponentFixture<AdminEventStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEventStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEventStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
