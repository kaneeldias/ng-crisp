import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversationsCreatedByCountryChartComponent } from './conversations-created-by-country-chart.component';

describe('ConversationsCreatedByCountryChartComponent', () => {
  let component: ConversationsCreatedByCountryChartComponent;
  let fixture: ComponentFixture<ConversationsCreatedByCountryChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConversationsCreatedByCountryChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConversationsCreatedByCountryChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
