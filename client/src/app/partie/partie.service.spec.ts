import { TestBed } from "@angular/core/testing";
import { PartieService } from "./partie.service";
import { HttpClientTestingModule, HttpTestingController, TestRequest } from "@angular/common/http/testing";
import { TempsUser } from "../admin/joueur";
import { ErrorHandler } from "@angular/core";
import { PartieSimple } from "../admin/dialog-simple/partie-simple";
import { PartieMultiple } from "../admin/dialog-multiple/partie-multiple";
import * as constantes from "../constantes";

const QUANTITE_OBJETS: number = 10;

describe("PartieService", () => {
    let service: PartieService;
    let http: HttpTestingController;
    const responseForm: string = constantes.RESPONSE_FORM;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                PartieService
            ],
            imports: [
                HttpClientTestingModule,
            ],
        });

        service = TestBed.get(PartieService);
        http = TestBed.get(HttpTestingController);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });

    // describe("Fonction getPartieSimpleInterface", () => {
    //     it("GET request should be called with proper arguments", () => {
    //         let partieResponse: PartieSimpleInterface = ("name", [], [], new Buffer(""), new Buffer(""), [[]]);
    //         const partie: PartieSimpleInterface = partieResponse;
    //         const id: string = "12345abcde";

    //         service.getPartieSimple(id).subscribe((response) => {
    //             partieResponse = response;

    //             http.expectOne({
    //                 url: constantes.GET_PARTIE_SIMPLE + id,
    //                 method: constantes.METHODE_GET
    //             }).flush(responseForm);

    //             expect(partieResponse).toEqual(partie);
    //         });

    //     });
    // });

    // describe("Fonction getPartieMultipleInterface", () => {
    //     it("GET request should be called with proper arguments", () => {
    //         let partieResponse: PartieMultiple = new PartieMultiple(
    //             "name", [], [], new Buffer(""), new Buffer(""),
    //             new Buffer(""), new Buffer(""), new Array<Array<string>>(),
    //             new Array<Array<string>>(), QUANTITE_OBJETS, "geo", "acs", "123");
    //         const id: string = "12345abcde";
    //         const partie: PartieMultiple = partieResponse;

    //         service.getPartieMultiple(id).subscribe((response) => {
    //             partieResponse = response;

    //             http.expectOne({
    //                 url: constantes.GET_PARTIE_MULTIPLE + id,
    //                 method: constantes.METHODE_GET
    //             }).flush(responseForm);

    //             expect(partieResponse).toEqual(partie);
    //         });

    //     });
    // });

    describe("Fonction reinitialiserTempsPartie", () => {
        it("Devrait faire une requete PUT", () => {
            const id: string = "12345abcde";

            service.reinitialiserTempsPartieSimple(id, new Array<TempsUser>(), new Array<TempsUser>())
                .catch(() => ErrorHandler);

            const req: TestRequest = http.expectOne(constantes.REINITIALISER_TEMPS_SIMPLE_URL + id);
            expect(req.request.method).toBe(constantes.METHODE_PUT);
        });
    });

});
