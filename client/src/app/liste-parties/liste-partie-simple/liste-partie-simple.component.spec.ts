import { ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { RouterTestingModule } from "@angular/router/testing";
import { Location } from "@angular/common";
import { ListePartieSimpleComponent } from "./liste-partie-simple.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ListePartieServiceService } from "../liste-partie-service.service";
import { PartieSimple } from "src/app/admin/dialog-simple/partie-simple";
import * as Buffer from "buffer";
import { of } from "rxjs";
import { Router } from "@angular/router";
import { PartieSoloComponent } from "src/app/partie/vue-simple/partie-solo/partie-solo.component";

describe("PartieSimpleComponent", () => {
    let mockListePartieService: jasmine.SpyObj<ListePartieServiceService>;

    let component: ListePartieSimpleComponent;
    let fixture: ComponentFixture<ListePartieSimpleComponent>;
    let location: Location;

    beforeEach(() => {
        mockListePartieService = jasmine.createSpyObj([
            "getListeImageSimple",
            "deletePartieSimple",
            "reinitialiserTempsPartie"
        ]);

        TestBed.configureTestingModule({
            declarations: [
                ListePartieSimpleComponent,
                PartieSoloComponent,
            ],
            imports: [
                RouterTestingModule.withRoutes([
                    { path: "partie-solo", component: PartieSoloComponent },
                ]),
                HttpClientTestingModule
            ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA
            ],
            providers: [
                { provide: ListePartieServiceService, useValue: mockListePartieService },
            ]
        });

        fixture = TestBed.createComponent(ListePartieSimpleComponent);
        component = fixture.componentInstance;
        location = TestBed.get(Location);
    });

    it("Devrait creer le composant", () => {
        expect(component).toBeDefined();
    });

    describe("fonction ngOnInit", () => {
        it("Devrait apeller la fonction getListeImageSimple du service", () => {
            const partie: PartieSimple = new PartieSimple(
                "partie1",
                new Array<number>(),
                new Array<number>(),
                new Buffer.Buffer(new Array<number>()),
                new Buffer.Buffer(new Array<number>()),
                new Array<Array<string>>(),
                "1");
            const parties: PartieSimple[] = [partie];
            mockListePartieService.getListeImageSimple.and.returnValue(of(parties));

            component.ngOnInit();

            expect(mockListePartieService.getListeImageSimple).toHaveBeenCalledTimes(1);
            expect(component["listeParties"]).toEqual(parties);
        });
    });

    describe("fonction onJouerOuReinitialiserClick", () => {
        it("Devrait naviguer a la route '/partie-solo/'", fakeAsync(() => {
            component["isListePartiesMode"] = true;
            const id: string = "";

            component.onJouerOuReinitialiserClick(id);
            tick();

            expect(location.path()).toBe("/partie-solo");
        }));
        it("Devrait rester a la route courante", fakeAsync(() => {
            const pathAvant: string = location.path();
            component["isListePartiesMode"] = false;
            component["isAdminMode"] = false;

            component.onJouerOuReinitialiserClick("");
            tick();

            expect(location.path()).toBe(pathAvant);
        }));
    });

    // it("should call onJouerOuReinitialiserClick when click on "Jouer" or "Reinitialiser" button", () => {
    //   const button = fixture.debugElement.query(By.css("#boutonJouerOurReinitialiser")).nativeElement;

    //   spyOn(component, "onJouerOuReinitialiserClick");
    //   button.dispatchEvent(new Event("click"));

    //   expect(component.onJouerOuReinitialiserClick).toHaveBeenCalled();
    // });

});
