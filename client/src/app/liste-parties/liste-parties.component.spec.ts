import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ListePartiesComponent } from "./liste-parties.component";
import { MatCardModule, MAT_DIALOG_DATA, MatDialogModule, MatMenuModule } from "@angular/material";
import { RouterTestingModule } from "@angular/router/testing";
import { ListePartieSimpleComponent } from "./liste-partie-simple/liste-partie-simple.component";
import { ListePartieMultipleComponent } from "./liste-partie-multiple/liste-partie-multiple.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { AdminComponent } from "../admin/admin.component";
import { VueSimpleComponent } from "../partie/vue-simple/vue-simple.component";
import { Joueur } from "../admin/joueur";
import { DomSanitizer, BrowserModule } from "@angular/platform-browser";

describe("ListePartiesComponent", () => {
    let component: ListePartiesComponent;
    let fixture: ComponentFixture<ListePartiesComponent>;
    const titleTest: string = "NSuccess";

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                ListePartiesComponent,
                ListePartieSimpleComponent,
                VueSimpleComponent,
                ListePartieMultipleComponent,
                AdminComponent
            ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA
            ],
            imports: [
                MatCardModule,
                RouterTestingModule.withRoutes([
                    { path: "liste-parties", component: ListePartiesComponent },
                    { path: "partie-solo", component: VueSimpleComponent },
                    { path: "admin", component: AdminComponent },
                ]),
                HttpClientTestingModule, MatDialogModule, MatMenuModule, BrowserModule
            ],
            providers: [
                { provide: MAT_DIALOG_DATA, useValue: {} },
                { provide: DomSanitizer, useValue: { sanitize: () => "safeString", bypassSecurityTrustHtml : () => "safestring" }},
            ]
        });
        fixture = TestBed.createComponent(ListePartiesComponent);
        component = fixture.componentInstance;
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should change jouerOuReinitialiser and creerOuSupprimer to 'Jouer' and 'Supprimer' when url is /liste-parties", () => {
        component["setjouerOuReinitialiserEtcreerOuSupprimer"]("/liste-parties");
        expect(component["jouerOuReinitialiser"]).toBe("Jouer");
        expect(component["creerOuSupprimer"]).toBe("Créer");
        expect(component["isListePartiesMode"]).toBe(true);
    });

    it("should change jouerOuReinitialiser and creerOuSupprimer to 'Reinitialiser' and 'Supprimer' when url is /admin", () => {
        component["setjouerOuReinitialiserEtcreerOuSupprimer"]("/admin");
        expect(component["jouerOuReinitialiser"]).toBe("Réinitialiser");
        expect(component["creerOuSupprimer"]).toBe("Supprimer");
        expect(component["isAdminMode"]).toBe(true);
    });

    it("should return array of sorted times", () => {
        const tempsParam: number = 2;
        const user1: Joueur = new Joueur("user1", tempsParam);
        const user2: Joueur = new Joueur("user2", 1);
        const sortingTimesTest: Joueur[] = [user1, user2];

        const sortedArray: Joueur[] = component["getTempsEnOrdre"](sortingTimesTest);
        const expectedArray: Joueur[] = [user2, user1];
        expect(sortedArray).toEqual(expectedArray);
    });

    it("should return array of sorted times", () => {
        const tempsParam: number = 61;
        const tempsUser: Joueur = new Joueur("", tempsParam);
        expect(component["getTempsDisplay"](tempsUser)).toBe("1:01");
    });

    it("genererTableauTempsAleatoires devrait creer une tableau de taille 3", () => {
        const arrLength: number = 3;
        const array: Array<Joueur> = component["genererTableauTempsAleatoires"]();
        expect(array.length).toEqual(arrLength);
    });

    it("should return title without first letter", () => {
        expect(component["getTitreSansPremiereLettre"](titleTest)).toBe("Success");
    });

    it("should return title first letter", () => {
        expect(component["getPremiereLettreTitre"](titleTest)).toBe("N");
    });

    it("should change attribute modes", () => {
        component["setJouerEtCreer"]();
        expect(component["isAdminMode"]).toBeFalsy();
        expect(component["isListePartiesMode"]).toBeTruthy();
        expect(component["jouerOuReinitialiser"]).toBe("Jouer");
        expect(component["creerOuSupprimer"]).toBe("Créer");
    });

    it("should change attribute modes", () => {
        component["setReinitialiserEtSupprimer"]();
        expect(component["isAdminMode"]).toBeTruthy();
        expect(component["isListePartiesMode"]).toBeFalsy();
        expect(component["jouerOuReinitialiser"]).toBe("Réinitialiser");
        expect(component["creerOuSupprimer"]).toBe("Supprimer");
    });
});
