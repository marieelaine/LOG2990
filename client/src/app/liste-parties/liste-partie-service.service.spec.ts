import { TestBed, fakeAsync } from "@angular/core/testing";

import { ListePartieServiceService } from "./liste-partie-service.service";
import { HttpClientTestingModule, HttpTestingController, TestRequest } from "@angular/common/http/testing";
import { ErrorHandler } from "@angular/core";
import { Joueur } from "../admin/joueur";
import * as constantes from "../constantes";

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

            const req: TestRequest = mockHttp.expectOne(constantes.GET_LISTE_SIMPLE_URL);
            expect(req.request.method).toBe(constantes.METHODE_GET);
        }));
    });

    describe("Fonction deletePartieSimple", () => {
        it("Devrait faire une requete DELETE", () => {
            const id: string = "12345abcde";
            service.supprimerPartieSimple(id)
            .catch(() => ErrorHandler);

            const req: TestRequest = mockHttp.expectOne(constantes.DELETE_PARTIE_SIMPLE_URL + id);
            expect(req.request.method).toBe(constantes.METHODE_DELETE);
        });
    });

    describe("Fonction reinitialiserTempsPartie", () => {
        it("Devrait faire une requete PUT", () => {
            const id: string = "12345abcde";

            service.reinitialiserTempsPartieSimple(id, new Array<Joueur>(), new Array<Joueur>()).catch(() => ErrorHandler);

            const req: TestRequest = mockHttp.expectOne(constantes.REINITIALISER_TEMPS_SIMPLE_URL + id);
            expect(req.request.method).toBe(constantes.METHODE_PUT);
        });
    });

    describe("Fonction getListeImageMultiple", () => {
        it("Devrait faire une requete GET", fakeAsync(() => {
            service.getListePartieMultiple().subscribe();

            const req: TestRequest = mockHttp.expectOne(constantes.GET_LISTE_MULTIPLE_URL);
            expect(req.request.method).toBe(constantes.METHODE_GET);
        }));
    });

    describe("Fonction deletePartieMultiple", () => {
        it("Devrait faire une requete DELETE", () => {
            const id: string = "12345abcde";
            service.supprimerPartieMultiple(id)
            .catch(() => ErrorHandler);

            const req: TestRequest = mockHttp.expectOne(constantes.DELETE_PARTIE_MULTIPLE_URL + id);
            expect(req.request.method).toBe(constantes.METHODE_DELETE);
        });
    });

    describe("Fonction reinitialiserTempsPartieMultiple", () => {
        it("Devrait faire une requete PUT", () => {
            const id: string = "12345abcde";

            service.reinitialiserTempsPartieMultiple(id, new Array<Joueur>(), new Array<Joueur>()).catch(() => ErrorHandler);

            const req: TestRequest = mockHttp.expectOne(constantes.REINITIALISER_TEMPS_MULTIPLE_URL + id);
            expect(req.request.method).toBe(constantes.METHODE_PUT);
        });
    });

    afterEach(() => {
        mockHttp.verify();
    });
});
