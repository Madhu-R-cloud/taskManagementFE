import { TestBed } from '@angular/core/testing';

import { InsertEmpService } from './insert-emp.service';

describe('InsertEmpService', () => {
  let service: InsertEmpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InsertEmpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
