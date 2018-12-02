import {TestBed, fakeAsync, tick} from "@angular/core/testing";
import {ChronoService} from "./chrono.service";

describe("ChronoService", () => {
    let service: ChronoService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ChronoService
            ]
        });

        service = TestBed.get(ChronoService);
    });

    describe("Constructeur", () => {
        it("Devrait créer", () => {
            expect(service).toBeTruthy();
        });

        it("Devrait initialiser l'attribut temps a 0", () => {
            expect(service["temps"]).toEqual(0);
        });

        it("Devrait initialiser l'attribut enMarche a faux", () => {
            expect(service["enMarche"]).toBeFalsy();
        });
    });

    describe("Fonction getTemps", () => {
        it("Devrait retourner 0", () => {
            expect(service.getTemps()).toBe(0);
        });
    });

    describe("Fonction reset", () => {
        it("Devrait remettre l'attribut temps a 0 et l'attribut enMarche a false", () => {
            const temps: number = 10;
            service["temps"] = temps;
            service["enMarche"] = true;

            service.reset();

            expect(service["temps"]).toEqual(0);
            expect(service["enMarche"]).toBeFalsy();
        });
    });

    describe("Calcul de bon temps", () => {
        it("Devrait retourner 5", fakeAsync(() => {
            const temps: number = 5000;
            const valRetour: number = 5;
            service.commencerChrono();
            tick(temps);
            service.arreterChrono();
            expect(service.getTemps()).toBe(valRetour);
        }));

        it("Devrait retourner \'05\' pour minute et second", fakeAsync(() => {
            const temps: number = 305000;
            service.commencerChrono();
            tick(temps);
            expect(service["getSecondesString"]()).toBe("05");
            expect(service["getMinutesString"]()).toBe("05");
            service.arreterChrono();
        }));
    });
});
