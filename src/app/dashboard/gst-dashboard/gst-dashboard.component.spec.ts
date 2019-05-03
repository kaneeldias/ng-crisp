import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GstDashboardComponent } from './gst-dashboard.component';

describe('GstDashboardComponent', () => {
  let component: GstDashboardComponent;
  let fixture: ComponentFixture<GstDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GstDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GstDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
