import { TestBed, inject } from '@angular/core/testing';
import { PartieMultipleService } from './partie-multiple.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PartieMultipleService', () => {
    let service: PartieMultipleService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [PartieMultipleService],
            imports: [HttpClientTestingModule],
        });

        service = TestBed.get(PartieMultipleService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
