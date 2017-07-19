import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WellnesseventFormComponent } from './wellnessevent-form.component';

describe('WellnesseventFormComponent', () => {
  let component: WellnesseventFormComponent;
  let fixture: ComponentFixture<WellnesseventFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WellnesseventFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WellnesseventFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
