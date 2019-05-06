import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainAddComponentComponent } from './main-add-component.component';

describe('MainAddComponentComponent', () => {
  let component: MainAddComponentComponent;
  let fixture: ComponentFixture<MainAddComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainAddComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainAddComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
