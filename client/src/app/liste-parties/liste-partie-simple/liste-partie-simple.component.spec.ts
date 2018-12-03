import { ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA, ErrorHandler } from "@angular/core";
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
import { VueSimpleComponent } from "src/app/partie/vue-simple/vue-simple.component";
import { Joueur } from "src/app/admin/joueur";
import {CookieService} from "ngx-cookie-service";

describe("Liste Partie Simple Component", () => {
    let mockListePartieService: jasmine.SpyObj<ListePartieServiceService>;

    let component: ListePartieSimpleComponent;
    let fixture: ComponentFixture<ListePartieSimpleComponent>;
    let location: Location;
    const partie: PartieSimple = new PartieSimple(
        "partie1",
        new Array<Joueur>(),
        new Array<Joueur>(),
        new Buffer.Buffer(new Array<number>()),
        new Buffer.Buffer(new Array<number>()),
        new Array<Array<string>>(),
        "1");
    const parties: PartieSimple[] = [partie];
    const partiesAttente: string[] = ["partie1"];

    // tslint:disable-next-line:max-func-body-length
    beforeEach(() => {
        mockListePartieService = jasmine.createSpyObj([
            "getListePartieSimple",
            "deletePartieSimple",
            "reinitialiserTempsPartie",
            "getListePartieSimpleEnAttente"
        ]);
        TestBed.configureTestingModule({
            declarations: [
                ListePartieSimpleComponent,
                VueSimpleComponent,
            ],
            imports: [
                RouterTestingModule.withRoutes([
                    { path: "partie-simple/:idPartie/:channelId", component: VueSimpleComponent },
                ]),
                HttpClientTestingModule,
                MatDialogModule
            ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA,
                NO_ERRORS_SCHEMA
            ],
            providers: [
                { provide: ListePartieServiceService, useValue: mockListePartieService },
                SocketClientService,
                CookieService
            ]
        });

        fixture = TestBed.createComponent(ListePartieSimpleComponent);
        component = fixture.componentInstance;
        location = TestBed.get(Location);
    });

    it("Devrait creer le composant", () => {
        expect(component).toBeDefined();
    });

    describe("Fonction ngOnInit", () => {
        it("Devrait appeler la fonction getListePartieSimple et getListePartieSimpleEnAttente du service", () => {
            mockListePartieService.getListePartieSimple.and.returnValue(of(parties));
            mockListePartieService.getListePartieSimpleEnAttente.and.returnValue(of(partiesAttente));

            component.ngOnInit();
            expect(mockListePartieService.getListePartieSimple).toHaveBeenCalledTimes(1);
            expect(mockListePartieService.getListePartieSimpleEnAttente).toHaveBeenCalledTimes(1);
        });

        it("getListePartieSimple et getListePartieSimpleEnAttente devraient avoir les bonnes valeurs de retour", () => {
            mockListePartieService.getListePartieSimple.and.returnValue(of(parties));
            mockListePartieService.getListePartieSimpleEnAttente.and.returnValue(of(partiesAttente));

            component.ngOnInit();
            expect(component["listeParties"]).toEqual(parties);
            expect(component["listePartieEnAttente"]).toEqual(partiesAttente);
        });
    });

    describe("fonction onJouerOuReinitialiserClick", () => {
        it("Devrait naviguer a la route '/partie-simple'", fakeAsync(() => {
            component["isListePartiesMode"] = true;
            const id: string = "1";

            component["onJouerOuReinitialiserClick"](id);
            tick();

            expect(location.path()).toBe("/partie-simple/1/0");
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
        it("Devrait rester a la route courante", fakeAsync(() => {
            const pathAvant: string = location.path();
            component["isListePartiesMode"] = false;
            component["isAdminMode"] = false;

            component["onCreerOuSupprimerClick"]("").catch(() => ErrorHandler);
            tick();

            expect(location.path()).toBe(pathAvant);
        }));
    });

});
