import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveAnsweredConversationsChartComponent } from './active-answered-conversations-chart.component';

describe('ActiveAnsweredConversationsChartComponent', () => {
  let component: ActiveAnsweredConversationsChartComponent;
  let fixture: ComponentFixture<ActiveAnsweredConversationsChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveAnsweredConversationsChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveAnsweredConversationsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
