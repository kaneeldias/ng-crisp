import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverallDashboardComponentComponent } from './overall-dashboard-component.component';

describe('OverallDashboardComponentComponent', () => {
  let component: OverallDashboardComponentComponent;
  let fixture: ComponentFixture<OverallDashboardComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverallDashboardComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverallDashboardComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
