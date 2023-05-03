import { TestBed } from '@angular/core/testing';

import { DownloadXlService } from './download-xl.service';

describe('DownloadXlService', () => {
  let service: DownloadXlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DownloadXlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
