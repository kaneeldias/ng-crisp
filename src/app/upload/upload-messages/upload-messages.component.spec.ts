import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadMessagesComponent } from './upload-messages.component';

describe('UploadMessagesComponent', () => {
  let component: UploadMessagesComponent;
  let fixture: ComponentFixture<UploadMessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadMessagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
