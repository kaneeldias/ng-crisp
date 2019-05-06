import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatorConversationsAnsweredPieChartComponent } from './operator-conversations-answered-pie-chart.component';

describe('OperatorConversationsAnsweredPieChartComponent', () => {
  let component: OperatorConversationsAnsweredPieChartComponent;
  let fixture: ComponentFixture<OperatorConversationsAnsweredPieChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperatorConversationsAnsweredPieChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperatorConversationsAnsweredPieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
