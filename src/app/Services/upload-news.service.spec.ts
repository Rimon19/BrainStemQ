import { TestBed } from '@angular/core/testing';

import { UploadNewsService } from './upload-news.service';

describe('UploadNewsService', () => {
  let service: UploadNewsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadNewsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
