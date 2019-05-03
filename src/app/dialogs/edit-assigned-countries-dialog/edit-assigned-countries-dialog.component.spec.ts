import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAssignedCountriesDialogComponent } from './edit-assigned-countries-dialog.component';

describe('EditAssignedCountriesDialogComponent', () => {
  let component: EditAssignedCountriesDialogComponent;
  let fixture: ComponentFixture<EditAssignedCountriesDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAssignedCountriesDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAssignedCountriesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
