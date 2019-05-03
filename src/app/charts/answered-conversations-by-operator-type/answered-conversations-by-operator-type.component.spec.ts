import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnsweredConversationsByOperatorTypeComponent } from './answered-conversations-by-operator-type.component';

describe('AnsweredConversationsByOperatorTypeComponent', () => {
  let component: AnsweredConversationsByOperatorTypeComponent;
  let fixture: ComponentFixture<AnsweredConversationsByOperatorTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnsweredConversationsByOperatorTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnsweredConversationsByOperatorTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
