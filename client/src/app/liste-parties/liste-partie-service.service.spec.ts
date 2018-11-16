import { TestBed, fakeAsync } from "@angular/core/testing";

import { ListePartieServiceService } from "./liste-partie-service.service";
import { HttpClientTestingModule, HttpTestingController, TestRequest } from "@angular/common/http/testing";
import { ErrorHandler } from "@angular/core";
import { TempsUser } from "../admin/temps-user";

describe("Liste Partie Service Service", () => {
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
        it("Devrait faire une requete GET", fakeAsync(() => {
            service.getListePartieSimple().subscribe();

            const req: TestRequest = mockHttp.expectOne("http://localhost:3000/partieSimple/getListePartieSimple");
            expect(req.request.method).toBe("GET");
        }));
    });

    describe("Fonction deletePartieSimple", () => {
        it("Devrait faire une requete DELETE", () => {
            const id: string = "12345abcde";
            service.deletePartieSimple(id)
            .catch(() => ErrorHandler);

            const req: TestRequest = mockHttp.expectOne("http://localhost:3000/partieSimple/delete/" + id);
            expect(req.request.method).toBe("DELETE");
        });
    });

    describe("Fonction reinitialiserTempsPartie", () => {
        it("Devrait faire une requete PUT", () => {
            const id: string = "12345abcde";

            service.reinitialiserTempsPartie(id, new Array<TempsUser>(), new Array<TempsUser>()).catch(() => ErrorHandler);

            const req: TestRequest = mockHttp.expectOne("http://localhost:3000/partieSimple/reinitialiseTemps/" + id);
            expect(req.request.method).toBe("PUT");
        });
    });

    describe("Fonction getListeImageMultiple", () => {
        it("Devrait faire une requete GET", fakeAsync(() => {
            service.getListePartieMultiple().subscribe();

            const req: TestRequest = mockHttp.expectOne("http://localhost:3000/partieMultiple/getListePartieMultiple");
            expect(req.request.method).toBe("GET");
        }));
    });

    describe("Fonction deletePartieMultiple", () => {
        it("Devrait faire une requete DELETE", () => {
            const id: string = "12345abcde";
            service.deletePartieMultiple(id)
            .catch(() => ErrorHandler);

            const req: TestRequest = mockHttp.expectOne("http://localhost:3000/partieMultiple/delete/" + id);
            expect(req.request.method).toBe("DELETE");
        });
    });

    describe("Fonction reinitialiserTempsPartieMultiple", () => {
        it("Devrait faire une requete PUT", () => {
            const id: string = "12345abcde";

            service.reinitialiserTempsPartieMultiple(id, new Array<TempsUser>(), new Array<TempsUser>()).catch(() => ErrorHandler);

            const req: TestRequest = mockHttp.expectOne("http://localhost:3000/partieMultiple/reinitialiseTemps/" + id);
            expect(req.request.method).toBe("PUT");
        });
    });

    afterEach(() => {
        mockHttp.verify();
    });
});
