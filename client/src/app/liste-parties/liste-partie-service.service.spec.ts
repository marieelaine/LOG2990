import { TestBed, inject } from '@angular/core/testing';

import { ListePartieServiceService } from './liste-partie-service.service';

describe('ListePartieServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ListePartieServiceService]
    });
  });

  it('should be created', inject([ListePartieServiceService], (service: ListePartieServiceService) => {
    expect(service).toBeTruthy();
  }));
});
