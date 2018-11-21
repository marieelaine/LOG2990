import { TestBed, inject } from '@angular/core/testing';

import { ChronoService } from './chrono.service';

describe('ChronoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChronoService]
    });
  });

  it('should be created', inject([ChronoService], (service: ChronoService) => {
    expect(service).toBeTruthy();
  }));
});
