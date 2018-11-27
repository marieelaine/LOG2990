import { TestBed } from "@angular/core/testing";
import { PartieMultipleService } from "./partie-multiple.service";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { PartieMultiple } from "./dialog-multiple/partie-multiple";
import * as constantes from "../constantes";

const QUANTITE_OBJETS: number = 10;

describe("PartieMultipleService", () => {
    let service: PartieMultipleService;
    let http: HttpTestingController;
    const responseForm: string = constantes.RESPONSE_FORM;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [PartieMultipleService],
            imports: [HttpClientTestingModule],
        });

        service = TestBed.get(PartieMultipleService);
        http = TestBed.get(HttpTestingController);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });

    it("POST request should be called with proper arguments", () => {
        let partieResponse: PartieMultiple = new PartieMultiple("name", [], [], new Buffer(""), new Buffer(""),
                                                                new Buffer(""), new Buffer(""), new Array<Array<string>>(),
                                                                new Array<Array<string>>(), QUANTITE_OBJETS, "geo", "acs", "123");

        const partie: PartieMultiple = new PartieMultiple("name", [], [], new Buffer(""), new Buffer(""), new Buffer(""), new Buffer(""),
                                                          new Array<Array<string>>(), new Array<Array<string>>(),
                                                          QUANTITE_OBJETS, "geo", "acs", "123");

        service.register(partie).subscribe((response) => {
            partieResponse = response;

            http.expectOne({
              url: constantes.AJOUTER_PARTIE_MULTIPLE_URL,
              method: constantes.METHODE_POST
            }).flush(responseForm);

            expect(partieResponse).toEqual(partie);
        });
    });

});
