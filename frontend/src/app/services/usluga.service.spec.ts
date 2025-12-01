import { TestBed } from '@angular/core/testing';

import { UslugaService } from './usluga.service';

describe('UslugaService', () => {
  let service: UslugaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UslugaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
