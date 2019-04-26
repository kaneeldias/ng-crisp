import { TestBed } from '@angular/core/testing';

import { MainWeekService } from './main-week.service';

describe('MainWeekService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MainWeekService = TestBed.get(MainWeekService);
    expect(service).toBeTruthy();
  });
});
