import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WellnesseventComponent } from './wellnessevent.component';

describe('WellnesseventComponent', () => {
  let component: WellnesseventComponent;
  let fixture: ComponentFixture<WellnesseventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WellnesseventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WellnesseventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
