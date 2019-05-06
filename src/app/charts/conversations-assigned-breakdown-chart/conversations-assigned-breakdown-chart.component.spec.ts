import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversationsAssignedBreakdownChartComponent } from './conversations-assigned-breakdown-chart.component';

describe('ConversationsAssignedBreakdownChartComponent', () => {
  let component: ConversationsAssignedBreakdownChartComponent;
  let fixture: ComponentFixture<ConversationsAssignedBreakdownChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConversationsAssignedBreakdownChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConversationsAssignedBreakdownChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
