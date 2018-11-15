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
            // Arrange
            component["time"] = 10;
            component["running"] = true;

            // Act
            component["reset"]();

            // Assert
            expect(component["time"]).toEqual(0);
            expect(component["running"]).toBeFalsy();
        });
    });

    describe("Calcul de bon temps", () => {
        it("Devrait retourner 5", fakeAsync(() => {
            component.startTimer();
            tick(5000);
            component.stopTimer();
            expect(component.getTime()).toBe(5);
        }));

        it("Devrait retourner \'05\' pour minute et second", fakeAsync(() => {
            component.startTimer();
            tick(305000);
            expect(component["getSecondsSrtring"]()).toBe("05");
            expect(component["getMinutesString"]()).toBe("05");
            component.stopTimer();
        }));
    });
});
