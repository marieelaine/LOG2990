import { TestBed } from "@angular/core/testing";
import { PartieService } from "./partie.service";
import { HttpClientTestingModule, HttpTestingController, TestRequest } from "@angular/common/http/testing";
import { TempsUser } from "../admin/temps-user";
import { ErrorHandler } from "@angular/core";
import { PartieSimple } from "../admin/dialog-simple/partie-simple";
import { PartieMultiple } from "../admin/dialog-multiple/partie-multiple";

const QUANTITE_OBJETS: number = 10;

describe("PartieService", () => {
    let service: PartieService;
    let http: HttpTestingController;
    const responseForm: string = "<form />";

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

    describe("Fonction getPartieSimple", () => {
        it("GET request should be called with proper arguments", () => {
            let partieResponse: PartieSimple = new PartieSimple("name", [], [], new Buffer(""), new Buffer(""), [[]]);
            const partie: PartieSimple = partieResponse;
            const id: string = "12345abcde";

            service.getPartieSimple(id).subscribe((response) => {
                partieResponse = response;

                http.expectOne({
                    url: "http://localhost:3000/partieSimple/getPartieSimple/" + id,
                    method: "GET"
                }).flush(responseForm);

                expect(partieResponse).toEqual(partie);
            });

        });
    });

    describe("Fonction getPartieMultiple", () => {
        it("GET request should be called with proper arguments", () => {
            let partieResponse: PartieMultiple = new PartieMultiple(
                "name", [], [], new Buffer(""), new Buffer(""),
                new Buffer(""), new Buffer(""), new Array<Array<string>>(),
                new Array<Array<string>>(), QUANTITE_OBJETS, "geo", "acs", "123");
            const id: string = "12345abcde";
            const partie: PartieMultiple = partieResponse;

            service.getPartieMultiple(id).subscribe((response) => {
                partieResponse = response;

                http.expectOne({
                    url: "http://localhost:3000/partieMultiple/getPartieMultiple/" + id,
                    method: "GET"
                }).flush(responseForm);

                expect(partieResponse).toEqual(partie);
            });

        });
    });

    describe("Fonction reinitialiserTempsPartie", () => {
        it("Devrait faire une requete PUT", () => {
            const id: string = "12345abcde";

            service.reinitialiserTempsPartieSimple(id, new Array<TempsUser>(), new Array<TempsUser>())
                .catch(() => ErrorHandler);

            const req: TestRequest = http.expectOne("http://localhost:3000/partieSimple/reinitialiseTemps/" + id);
            expect(req.request.method).toBe("PUT");
        });
    });

});
