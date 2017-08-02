import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WePreviousComponent } from './we-previous.component';

describe('WePreviousComponent', () => {
  let component: WePreviousComponent;
  let fixture: ComponentFixture<WePreviousComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WePreviousComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WePreviousComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
