import { TestBed } from '@angular/core/testing';

import { ArretbusService } from './arretbus.service';

describe('ArretbusService', () => {
  let service: ArretbusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArretbusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
