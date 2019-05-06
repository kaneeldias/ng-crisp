import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeanRatingsChartComponent } from './mean-ratings-chart.component';

describe('MeanRatingsChartComponent', () => {
  let component: MeanRatingsChartComponent;
  let fixture: ComponentFixture<MeanRatingsChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeanRatingsChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeanRatingsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
