import { TestBed } from '@angular/core/testing';

import { DistricsService } from './districs.service';

describe('DistricsService', () => {
  let service: DistricsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DistricsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
