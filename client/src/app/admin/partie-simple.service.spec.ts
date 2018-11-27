import { PartieSimpleService } from "./partie-simple.service";
import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import {PartieSimple} from "./dialog-simple/partie-simple";
import * as constantes from "../constantes";

describe("Partie Simple Service", () => {
    let service: PartieSimpleService;
    let http: HttpTestingController;
    const responseForm: string = constantes.RESPONSE_FORM;

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

    it("POST request should be called with proper arguments", () => {
        let partieResponse: PartieSimple = new PartieSimple("name", [], [], new Buffer(""), new Buffer(""), [[]]);
        const partie: PartieSimple = new PartieSimple("name", [], [], new Buffer(""), new Buffer(""), [[]]);

        service.register(partie).subscribe((response) => {
          partieResponse = response;

          http.expectOne({
            url: constantes.AJOUTER_PARTIE_SIMPLE_URL,
            method: constantes.METHODE_POST
          }).flush(responseForm);

          expect(partieResponse).toEqual(partie);
        });
      });
});
