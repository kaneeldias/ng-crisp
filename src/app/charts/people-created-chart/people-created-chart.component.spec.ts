import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleCreatedChartComponent } from './people-created-chart.component';

describe('PeopleCreatedChartComponent', () => {
  let component: PeopleCreatedChartComponent;
  let fixture: ComponentFixture<PeopleCreatedChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeopleCreatedChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleCreatedChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
