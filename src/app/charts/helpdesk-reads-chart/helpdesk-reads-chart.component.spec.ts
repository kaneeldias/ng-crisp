import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpdeskReadsChartComponent } from './helpdesk-reads-chart.component';

describe('HelpdeskReadsChartComponent', () => {
  let component: HelpdeskReadsChartComponent;
  let fixture: ComponentFixture<HelpdeskReadsChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpdeskReadsChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpdeskReadsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
