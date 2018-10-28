import { TestBed } from '@angular/core/testing';
import { PartieMultipleService } from './partie-multiple.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PartieMultiple } from './dialog-multiple/partie-multiple';

describe('PartieMultipleService', () => {
    let service: PartieMultipleService;
    let http: HttpTestingController;
    const responseForm = '<form />';

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [PartieMultipleService],
            imports: [HttpClientTestingModule],
        });

        service = TestBed.get(PartieMultipleService);
        http = TestBed.get(HttpTestingController);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('POST request should be called with proper arguments', () => {
        let partieResponse;
        const partie = new PartieMultiple("name", [], [], new Buffer(""), new Buffer(""), new Buffer(""), new Buffer(""),
                                          new Buffer(""), new Buffer(""), 10, "geo", "acs");

        service.register(partie).subscribe((response) => {
          partieResponse = response;
        });

        http.expectOne({
          url: "http://localhost:3000/partieMultiple/ajouter",
          method: 'POST'
        }).flush(responseForm);

        expect(partieResponse).toEqual(responseForm);
      });

});
