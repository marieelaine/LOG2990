import { PartieSimpleService } from "./partie-simple.service";
import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import {PartieSimple} from "./dialog-simple/partie-simple";

describe("Partie Simple Service", () => {
    let service: PartieSimpleService;
    let http: HttpTestingController;
    const responseForm = '<form />';

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [PartieSimpleService]
        });

        service = TestBed.get(PartieSimpleService);
        http = TestBed.get(HttpTestingController);
    });

    it("Should do nothing", () => {
        expect(true).toBeTruthy();
    });

    it('POST request should be called with proper arguments', () => {
        let partieResponse;
        const partie = new PartieSimple("name", [], [], new Buffer(""), new Buffer(""), [[]]);

        service.register(partie).subscribe((response) => {
          partieResponse = response;
        });

        http.expectOne({
          url: 'http://127.0.0.1:3000/partieSimple/ajouter',
          method: 'POST'
        }).flush(responseForm);

        expect(partieResponse).toEqual(responseForm);
      });

});
