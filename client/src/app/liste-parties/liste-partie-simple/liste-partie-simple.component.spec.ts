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
import { SocketClientService } from "src/app/socket/socket-client.service";
import { MatDialogModule } from "@angular/material/dialog";
import { PartieSimpleSoloComponent } from "src/app/partie/vue-simple/partie-simple-solo/partie-simple-solo.component";

describe("Liste Partie Simple Component", () => {
    let mockListePartieService: jasmine.SpyObj<ListePartieServiceService>;

    let component: ListePartieSimpleComponent;
    let fixture: ComponentFixture<ListePartieSimpleComponent>;
    let location: Location;
    const partie: PartieSimple = new PartieSimple(
        "partie1",
        new Array<number>(),
        new Array<number>(),
        new Buffer.Buffer(new Array<number>()),
        new Buffer.Buffer(new Array<number>()),
        new Array<Array<string>>(),
        "1");
    const parties: PartieSimple[] = [partie];

    // tslint:disable-next-line:max-func-body-length
    beforeEach(() => {
        mockListePartieService = jasmine.createSpyObj([
            "getListePartieSimple", "deletePartieSimple", "reinitialiserTempsPartie"
        ]);
        TestBed.configureTestingModule({
            declarations: [
                ListePartieSimpleComponent,
                PartieSimpleSoloComponent,
            ],
            imports: [
                RouterTestingModule.withRoutes([
                    { path: "partie-simple-solo/", component: PartieSimpleSoloComponent },
                ]),
                HttpClientTestingModule,
                MatDialogModule
            ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA
            ],
            providers: [
                { provide: ListePartieServiceService, useValue: mockListePartieService },
                SocketClientService,
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
            mockListePartieService['getListePartieSimple'].and.returnValue(of(parties));

            component.ngOnInit();

            expect(mockListePartieService["getListePartieSimple"]).toHaveBeenCalledTimes(1);
            expect(component["listeParties"]).toEqual(parties);
        });
    });

    describe("fonction onJouerOuReinitialiserClick", () => {
        it("Devrait naviguer a la route '/partie-solo/'", fakeAsync(() => {
            component["isListePartiesMode"] = true;
            const id: string = "";

            component["onJouerOuReinitialiserClick"](id);
            tick();

            expect(location.path()).toBe("/partie-simple-solo/");
        }));
        it("Devrait rester a la route courante", fakeAsync(() => {
            const pathAvant: string = location.path();
            component["isListePartiesMode"] = false;
            component["isAdminMode"] = false;

            component["onJouerOuReinitialiserClick"]("");
            tick();

            expect(location.path()).toBe(pathAvant);
        }));
    });

    describe("fonction onCreerOuSupprimerClick", () => {
        it("Devrait naviguer a la route '/partie-solo'", fakeAsync(() => {
            component["isListePartiesMode"] = true;
            const id: string = "";

            component["onCreerOuSupprimerClick"](id);
            tick();

            expect(location.path()).toBe("/partie-solo");
        }));
        it("Devrait rester a la route courante", fakeAsync(() => {
            const pathAvant: string = location.path();
            component["isListePartiesMode"] = false;
            component["isAdminMode"] = false;

            component["onCreerOuSupprimerClick"]("");
            tick();

            expect(location.path()).toBe(pathAvant);
        }));
    });

});
