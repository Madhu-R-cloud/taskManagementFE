import { TestBed } from '@angular/core/testing';

import { AdminDeleteService } from './admin-delete.service';

describe('AdminDeleteService', () => {
  let service: AdminDeleteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminDeleteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
