import { TestBed, inject } from '@angular/core/testing';

import { PartieMultipleService } from './partie-multiple.service';

describe('PartieMultipleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PartieMultipleService]
    });
  });

  it('should be created', inject([PartieMultipleService], (service: PartieMultipleService) => {
    expect(service).toBeTruthy();
  }));
});
