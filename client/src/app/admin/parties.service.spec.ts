import { TestBed, inject } from '@angular/core/testing';

import { PartiesService } from './parties.service';

describe('PartiesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PartiesService]
    });
  });

  it('should be created', inject([PartiesService], (service: PartiesService) => {
    expect(service).toBeTruthy();
  }));
});
