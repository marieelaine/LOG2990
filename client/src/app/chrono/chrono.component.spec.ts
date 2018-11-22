import { ComponentFixture, TestBed, tick, fakeAsync } from "@angular/core/testing";
import { ChronoComponent } from "./chrono.component";

describe("ChronoComponent", () => {
    let component: ChronoComponent;
    let fixture: ComponentFixture<ChronoComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                ChronoComponent
            ]
        });

        fixture = TestBed.createComponent(ChronoComponent);
        component = fixture.componentInstance;
    });

    describe("Constructeur", () => {
        it("Devrait créer", () => {
            expect(component).toBeTruthy();
        });

        it("Devrait initialiser l'attribut time a 0", () => {
            expect(component["time"]).toEqual(0);
        });

        it("Devrait initialiser l'attribut running a faux", () => {
            expect(component["running"]).toBeFalsy();
        });
    });

    describe("Fonction getTime", () => {
        it("Devrait retourner 0", () => {
            expect(component.getTime()).toBe(0);
        });
    });

    describe("Fonction reset", () => {
        it("Devrait remettre l'attribut time a 0 et l'attribut running a false", () => {
            const temps: number = 10;
            component["time"] = temps;
            component["running"] = true;

            component["reset"]();

            expect(component["time"]).toEqual(0);
            expect(component["running"]).toBeFalsy();
        });
    });

    describe("Calcul de bon temps", () => {
        it("Devrait retourner 5", fakeAsync(() => {
            const temps: number = 5000;
            const valRetour: number = 5;
            component.startTimer();
            tick(temps);
            component.stopTimer();
            expect(component.getTime()).toBe(valRetour);
        }));

        it("Devrait retourner \'05\' pour minute et second", fakeAsync(() => {
            const temps: number = 305000;
            component.startTimer();
            tick(temps);
            expect(component["getSecondsSrtring"]()).toBe("05");
            expect(component["getMinutesString"]()).toBe("05");
            component.stopTimer();
        }));
    });
});
