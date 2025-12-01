import { TestBed } from '@angular/core/testing';

import { KozmeticarService } from './kozmeticar.service';

describe('KozmeticarService', () => {
  let service: KozmeticarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KozmeticarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
