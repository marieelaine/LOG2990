import {TestBed, ComponentFixture, fakeAsync, tick} from "@angular/core/testing";
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

        it("Devrait initialiser l'attribut time a 0", () => {
            expect(service["time"]).toEqual(0);
        });

        it("Devrait initialiser l'attribut running a faux", () => {
            expect(service["running"]).toBeFalsy();
        });
    });

    describe("Fonction getTime", () => {
        it("Devrait retourner 0", () => {
            expect(service.getTime()).toBe(0);
        });
    });

    describe("Fonction reset", () => {
        it("Devrait remettre l'attribut time a 0 et l'attribut running a false", () => {
            const temps: number = 10;
            service["time"] = temps;
            service["running"] = true;

            service.reset();

            expect(service["time"]).toEqual(0);
            expect(service["running"]).toBeFalsy();
        });
    });

    describe("Calcul de bon temps", () => {
        it("Devrait retourner 5", fakeAsync(() => {
            const temps: number = 5000;
            const valRetour: number = 5;
            service.startTimer();
            tick(temps);
            service.stopTimer();
            expect(service.getTime()).toBe(valRetour);
        }));

        it("Devrait retourner \'05\' pour minute et second", fakeAsync(() => {
            const temps: number = 305000;
            service.startTimer();
            tick(temps);
            expect(service["getSecondsSrtring"]()).toBe("05");
            expect(service["getMinutesString"]()).toBe("05");
            service.stopTimer();
        }));
    });
});
