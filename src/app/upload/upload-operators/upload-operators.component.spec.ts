import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadOperatorsComponent } from './upload-operators.component';

describe('UploadOperatorsComponent', () => {
  let component: UploadOperatorsComponent;
  let fixture: ComponentFixture<UploadOperatorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadOperatorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadOperatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
