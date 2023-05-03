import { TestBed } from '@angular/core/testing';

import { ViewGetService } from './view-get.service';

describe('ViewGetService', () => {
  let service: ViewGetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewGetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
