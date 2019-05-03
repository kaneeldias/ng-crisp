import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityDashboardComponent } from './entity-dashboard.component';

describe('EntityDashboardComponent', () => {
  let component: EntityDashboardComponent;
  let fixture: ComponentFixture<EntityDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntityDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
