import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadConversationsComponent } from './upload-conversations.component';

describe('UploadConversationsComponent', () => {
  let component: UploadConversationsComponent;
  let fixture: ComponentFixture<UploadConversationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadConversationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadConversationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
