import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatorStatsTableComponent } from './operator-stats-table.component';

describe('OperatorStatsTableComponent', () => {
  let component: OperatorStatsTableComponent;
  let fixture: ComponentFixture<OperatorStatsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperatorStatsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperatorStatsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
