import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatorAssignedTableComponent } from './operator-assigned-table.component';

describe('OperatorAssignedTableComponent', () => {
  let component: OperatorAssignedTableComponent;
  let fixture: ComponentFixture<OperatorAssignedTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperatorAssignedTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperatorAssignedTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
