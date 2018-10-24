import { TestBed, inject } from '@angular/core/testing';

import { PartieMultipleService } from './partie-multiple.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PartieMultipleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PartieMultipleService],
      imports: [HttpClientTestingModule],
    });
  });

  it('should be created', inject([PartieMultipleService], (service: PartieMultipleService) => {
    expect(service).toBeTruthy();
  }));
});
