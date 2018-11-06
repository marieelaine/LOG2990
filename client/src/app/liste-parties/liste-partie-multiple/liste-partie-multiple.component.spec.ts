import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ListePartieMultipleComponent } from './liste-partie-multiple.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ListePartieServiceService } from '../liste-partie-service.service';
import { PartieMultiple } from "../../admin/dialog-multiple/partie-multiple";
import { VueMultipleComponent } from "../../partie/vue-multiple/vue-multiple.component";
import * as Buffer from "buffer";
import { of } from "rxjs";
import { Location } from "@angular/common";
import { SocketClientService } from 'src/app/socket/socket-client.service';

describe('PartieMultipleComponent', () => {
    let mockListePartieService: jasmine.SpyObj<ListePartieServiceService>;

    let component: ListePartieMultipleComponent;
    let fixture: ComponentFixture<ListePartieMultipleComponent>;
    let location: Location;
    const partie: PartieMultiple = new PartieMultiple(
        "partie1",
        new Array<number>(),
        new Array<number>(),
        new Buffer.Buffer(new Array<number>()),
        new Buffer.Buffer(new Array<number>()),
        new Buffer.Buffer(new Array<number>()),
        new Buffer.Buffer(new Array<number>()),
        new Buffer.Buffer(new Array<number>()),
        new Buffer.Buffer(new Array<number>()),
        15,
        "geo",
        "acs",
        "1");
    const parties: PartieMultiple[] = [partie];

    beforeEach(() => {
        mockListePartieService = jasmine.createSpyObj([
            "getListePartieMultiple",
            "deletePartieMultiple",
            "reinitialiserTempsPartieMultiple"
        ]);
        TestBed.configureTestingModule({
            declarations: [
                ListePartieMultipleComponent,
                VueMultipleComponent
            ],
            imports: [
                RouterTestingModule.withRoutes([
                    { path: "partie-multiple", component: VueMultipleComponent },
                ]),
                HttpClientTestingModule
            ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA
            ],
            providers: [
                { provide: ListePartieServiceService, useValue: mockListePartieService },
                SocketClientService
            ]
        });

        fixture = TestBed.createComponent(ListePartieMultipleComponent);
        component = fixture.componentInstance;
        location = TestBed.get(Location);
    });

    it('Devrait creer le composant', () => {
        expect(component).toBeDefined();
    });

    describe("fonction ngOnInit", () => {
        it("Devrait apeller la fonction getListePartieMultiple du service", () => {
            mockListePartieService['getListePartieMultiple'].and.returnValue(of(parties));

            component.ngOnInit();

            expect(mockListePartieService["getListePartieMultiple"]).toHaveBeenCalledTimes(1);
            expect(component["listeParties"]).toEqual(parties);
        });
    });

    describe("fonction onJouerOuReinitialiserClick", () => {
        it("Devrait naviguer a la route '/partie-multiple'", fakeAsync(() => {
            component["isListePartiesMode"] = true;
            const id: string = "";

            component["onJouerOuReinitialiserClick"](id);
            tick();

            expect(location.path()).toBe("/partie-multiple");
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
        it("Devrait naviguer a la route '/'", fakeAsync(() => {
            component["isListePartiesMode"] = true;
            const id: string = "";

            component["onCreerOuSupprimerClick"](partie["_id"]);
            tick();

            expect(location.path()).toBe("");
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
