import { TestBed, inject } from '@angular/core/testing';

import { ListePartieServiceService } from './liste-partie-service.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ListePartieServiceService', () => {
    let service: ListePartieServiceService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ListePartieServiceService,
            ],
            imports: [HttpClientTestingModule]
        });

        service = TestBed.get(ListePartieServiceService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
