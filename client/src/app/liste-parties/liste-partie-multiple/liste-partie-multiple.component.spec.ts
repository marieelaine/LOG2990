import { ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing";
import { ListePartieMultipleComponent } from "./liste-partie-multiple.component";
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA, ErrorHandler} from "@angular/core";
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ListePartieServiceService } from "../liste-partie-service.service";
import { PartieMultiple } from "../../admin/dialog-multiple/partie-multiple";
import { VueMultipleComponent } from "../../partie/vue-multiple/vue-multiple.component";
import * as Buffer from "buffer";
import { of } from "rxjs";
import { Location } from "@angular/common";
import { SocketClientService } from "src/app/socket/socket-client.service";
import { MatDialogModule, MAT_DIALOG_DATA } from "@angular/material";
import { Joueur } from "src/app/admin/joueur";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CookieService} from "ngx-cookie-service";

describe("ListePartieMultipleComponent", () => {
    let mockListePartieService: jasmine.SpyObj<ListePartieServiceService>;

    let component: ListePartieMultipleComponent;
    let fixture: ComponentFixture<ListePartieMultipleComponent>;
    let location: Location;
    const qteObjetsParam: number = 10;
    const partie: PartieMultiple = new PartieMultiple(
        "partie1",
        new Array<Joueur>(),
        new Array<Joueur>(),
        new Buffer.Buffer(new Array<number>()),
        new Buffer.Buffer(new Array<number>()),
        new Buffer.Buffer(new Array<number>()),
        new Buffer.Buffer(new Array<number>()),
        new Array<Array<string>>(),
        new Array<Array<string>>(),
        qteObjetsParam,
        "geo",
        "acs",
        "1");
    const parties: PartieMultiple[] = [partie];
    const listePartieEnAttente: string[] = ["123"];

    // tslint:disable-next-line:max-func-body-length
    beforeEach(() => {
        mockListePartieService = jasmine.createSpyObj([
            "getListePartieMultiple",
            "deletePartieMultiple",
            "reinitialiserTempsPartieMultiple",
            "addPartieMultipleEnAttente",
            "getListePartieSimpleEnAttente",
            "getListePartieMultipleEnAttente"
        ]);
        TestBed.configureTestingModule({
            declarations: [
                ListePartieMultipleComponent,
                VueMultipleComponent
            ],
            imports: [
                RouterTestingModule.withRoutes([
                    { path: "partie-multiple/:idPartie/:channelId", component: VueMultipleComponent },
                ]),
                HttpClientTestingModule,
                MatDialogModule,
                BrowserAnimationsModule
            ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA,
                NO_ERRORS_SCHEMA
            ],
            providers: [
                { provide: ListePartieServiceService, useValue: mockListePartieService },
                { provide: MAT_DIALOG_DATA, useValue: {} },
                SocketClientService,
                CookieService
            ]
        });

        fixture = TestBed.createComponent(ListePartieMultipleComponent);
        component = fixture.componentInstance;
        location = TestBed.get(Location);
    });

    it("Devrait creer le composant", () => {
        expect(component).toBeDefined();
    });

    describe("fonction ngOnInit", () => {
        it("Devrait apeller la fonction getListePartieMultiple du service", () => {
            mockListePartieService["getListePartieMultiple"].and.returnValue(of(parties));
            mockListePartieService["getListePartieMultipleEnAttente"].and.returnValue(of(listePartieEnAttente));

            component.ngOnInit();

            expect(mockListePartieService["getListePartieMultiple"]).toHaveBeenCalledTimes(1);
            expect(component["listeParties"]).toEqual(parties);
        });
        it("Devrait apeller la fonction getListePartieMultipleEnAttente du service", () => {
            mockListePartieService["getListePartieMultiple"].and.returnValue(of(parties));
            mockListePartieService["getListePartieMultipleEnAttente"].and.returnValue(of(listePartieEnAttente));

            component.ngOnInit();

            expect(mockListePartieService["getListePartieMultipleEnAttente"]).toHaveBeenCalledTimes(1);
        });
    });

    describe("fonction onJouerOuReinitialiserClick", () => {
        it("Devrait naviguer a la route '/partie-multiple'", fakeAsync(() => {
            component["isListePartiesMode"] = true;
            const id: string = "1";

            component["onJouerOuReinitialiserClick"](id);
            tick();

            expect(location.path()).toBe("/partie-multiple/1/0");
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
            mockListePartieService["addPartieMultipleEnAttente"].and.returnValue({ subscribe: () => {} });

            component["onCreerOuSupprimerClick"](partie["_id"]).catch(() => ErrorHandler);
            tick();

            expect(location.path()).toBe("");
        }));
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
