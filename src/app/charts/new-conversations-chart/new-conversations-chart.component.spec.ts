import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewConversationsChartComponent } from './new-conversations-chart.component';

describe('NewConversationsChartComponent', () => {
  let component: NewConversationsChartComponent;
  let fixture: ComponentFixture<NewConversationsChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewConversationsChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewConversationsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
