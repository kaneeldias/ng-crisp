import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversationsActiveAnsweredByCountryChartComponent } from './conversations-active-answered-by-country-chart.component';

describe('ConversationsActiveAnsweredByCountryChartComponent', () => {
  let component: ConversationsActiveAnsweredByCountryChartComponent;
  let fixture: ComponentFixture<ConversationsActiveAnsweredByCountryChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConversationsActiveAnsweredByCountryChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConversationsActiveAnsweredByCountryChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
