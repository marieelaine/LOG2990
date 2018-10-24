import { TestBed, inject } from '@angular/core/testing';

import { PartieSimpleService } from './partie-simple.service';

describe('PartieSimpleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PartieSimpleService]
    });
  });

  it('should be created', inject([PartieSimpleService], (service: PartieSimpleService) => {
    expect(service).toBeTruthy();
  }));
});
