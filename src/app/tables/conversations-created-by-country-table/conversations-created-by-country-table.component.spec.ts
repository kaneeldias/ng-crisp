import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversationsCreatedByCountryTableComponent } from './conversations-created-by-country-table.component';

describe('ConversationsCreatedByCountryTableComponent', () => {
  let component: ConversationsCreatedByCountryTableComponent;
  let fixture: ComponentFixture<ConversationsCreatedByCountryTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConversationsCreatedByCountryTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConversationsCreatedByCountryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
