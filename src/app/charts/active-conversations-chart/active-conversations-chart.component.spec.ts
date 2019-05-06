import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveConversationsChartComponent } from './active-conversations-chart.component';

describe('ActiveConversationsChartComponent', () => {
  let component: ActiveConversationsChartComponent;
  let fixture: ComponentFixture<ActiveConversationsChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveConversationsChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveConversationsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
