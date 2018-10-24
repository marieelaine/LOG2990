import { TestBed, inject } from '@angular/core/testing';

import { ClientSocketService } from './client-socket.service';

describe('ClientSocketService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClientSocketService]
    });
  });

  it('should be created', inject([ClientSocketService], (service: ClientSocketService) => {
    expect(service).toBeTruthy();
  }));
});
