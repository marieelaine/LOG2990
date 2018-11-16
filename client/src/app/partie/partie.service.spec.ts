import { TestBed } from "@angular/core/testing";
import { PartieService } from "./partie.service";
import { HttpClientTestingModule, HttpTestingController, TestRequest } from "@angular/common/http/testing";
import { TempsUser } from "../admin/temps-user";
import {ErrorHandler} from "@angular/core";

describe("PartieService", () => {
    let service: PartieService;
    let http: HttpTestingController;
    const responseForm = "<form />";

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
            let partieResponse;
            const id: string = "12345abcde";

            service.getPartieSimple(id).subscribe((response) => {
            partieResponse = response;
            });

            http.expectOne({
            url: "http://localhost:3000/partieSimple/getPartieSimple/" + id,
            method: "GET"
            }).flush(responseForm);

            expect(partieResponse).toEqual(responseForm);
        });
    });

    describe("Fonction getPartieMultiple", () => {
        it("GET request should be called with proper arguments", () => {
            let partieResponse;
            const id: string = "12345abcde";

            service.getPartieMultiple(id).subscribe((response) => {
            partieResponse = response;
            });

            http.expectOne({
            url: "http://localhost:3000/partieMultiple/getPartieMultiple/" + id,
            method: "GET"
            }).flush(responseForm);

            expect(partieResponse).toEqual(responseForm);
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
