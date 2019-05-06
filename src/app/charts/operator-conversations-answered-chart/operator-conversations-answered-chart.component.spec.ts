import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatorConversationsAnsweredChartComponent } from './operator-conversations-answered-chart.component';

describe('OperatorConversationsAnsweredChartComponent', () => {
  let component: OperatorConversationsAnsweredChartComponent;
  let fixture: ComponentFixture<OperatorConversationsAnsweredChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperatorConversationsAnsweredChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperatorConversationsAnsweredChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
