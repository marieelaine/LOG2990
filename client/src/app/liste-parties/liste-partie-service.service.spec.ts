import { TestBed } from "@angular/core/testing";

import { ListePartieServiceService } from "./liste-partie-service.service";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { ErrorHandler } from "@angular/core";

describe("ListePartieServiceService", () => {
    let service: ListePartieServiceService;
    let mockHttp: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ListePartieServiceService,
            ],
            imports: [
                HttpClientTestingModule,
            ]
        });

        service = TestBed.get(ListePartieServiceService);
        mockHttp = TestBed.get(HttpTestingController);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });

    describe("Fonction getListeImageSimple", () => {
        it("Devrait faire une requete GET", () => {
            service.getListePartieSimple().subscribe();

            const req = mockHttp.expectOne("http://localhost:3000/partieSimple/getListePartieSimple");
            expect(req.request.method).toBe("GET");
        });
    });

    describe("Fonction deletePartieSimple", () => {
        it("Devrait faire une requete DELETE", () => {
            const id: string = "12345abcde";
            service.deletePartieSimple(id)
            .catch(() => ErrorHandler);

            const req = mockHttp.expectOne("http://localhost:3000/partieSimple/delete/" + id);
            expect(req.request.method).toBe("DELETE");
        });
    });

    describe("Fonction reinitialiserTempsPartie", () => {
        it("Devrait faire une requete DELETE", () => {
            const id: string = "12345abcde";
            // TODO service.reinitialiserTempsPartie(id);

            const req = mockHttp.expectOne("http://localhost:3000/partieSimple/reinitialiseTemps/" + id);
            expect(req.request.method).toBe("GET");
        });
    });

    afterEach(() => {
        mockHttp.verify();
    });
});
