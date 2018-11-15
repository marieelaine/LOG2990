import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ListePartiesComponent } from './liste-parties.component';
import { MatCardModule, MAT_DIALOG_DATA, MatDialogModule, MatMenuTrigger, MatMenuModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { ListePartieSimpleComponent } from './liste-partie-simple/liste-partie-simple.component';
import { ListePartieMultipleComponent } from './liste-partie-multiple/liste-partie-multiple.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PartieSimpleSoloComponent } from '../partie/vue-simple/partie-simple-solo/partie-simple-solo.component';
import { AdminComponent } from '../admin/admin.component';
import { TempsUser } from '../admin/dialog-abstrait';

describe('ListePartiesComponent', () => {
    let component: ListePartiesComponent;
    let fixture: ComponentFixture<ListePartiesComponent>;
    const titleTest: string = "NSuccess";

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                ListePartiesComponent,
                ListePartieSimpleComponent,
                ListePartieMultipleComponent,
                PartieSimpleSoloComponent,
                AdminComponent
            ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA
            ],
            imports: [
                MatCardModule,
                RouterTestingModule.withRoutes([
                    { path: "liste-parties", component: ListePartiesComponent },
                    { path: "partie-solo", component: PartieSimpleSoloComponent },
                    { path: "admin", component: AdminComponent },
                ]),
                HttpClientTestingModule,
                MatDialogModule,
                MatMenuModule
            ],
            providers: [
                { provide: MAT_DIALOG_DATA, useValue: {} },
            ]
        });
        fixture = TestBed.createComponent(ListePartiesComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should change jouerOuReinitialiser and creerOuSupprimer to "Jouer" and "Supprimer" when url is /liste-parties', () => {
        component["setjouerOuReinitialiserAndcreerOuSupprimer"]('/liste-parties');
        expect(component["jouerOuReinitialiser"]).toBe('Jouer');
        expect(component["creerOuSupprimer"]).toBe('Créer');
        expect(component["isListePartiesMode"]).toBe(true);
    });

    it('should change jouerOuReinitialiser and creerOuSupprimer to "Reinitialiser" and "Supprimer" when url is /admin', () => {
        component["setjouerOuReinitialiserAndcreerOuSupprimer"]('/admin');
        expect(component["jouerOuReinitialiser"]).toBe('Réinitialiser');
        expect(component["creerOuSupprimer"]).toBe('Supprimer');
        expect(component["isAdminMode"]).toBe(true);
    });

    it('should return array of sorted times', () => {
        const user1: TempsUser = new TempsUser("user1", 2);
        const user2: TempsUser = new TempsUser("user2", 1);
        const sortingTimesTest: TempsUser[] = [user1, user2];

        const sortedArray: TempsUser[] = component["getSortedTimes"](sortingTimesTest);
        const expectedArray: TempsUser[] = [user2, user1];
        expect(sortedArray).toEqual(expectedArray);
    });

    it('should return array of sorted times', () => {
        const temps = new TempsUser("", 61);
        expect(component["getDisplayTime"](temps)).toBe("1:01");
    });

    it('genererTableauTempsAleatoires devrait creer une tableau de taille 3', () => {
        const array = component["genererTableauTempsAleatoires"]();
        expect(array.length).toEqual(3);
    });

    it('should return title without first letter', () => {
        expect(component["getTitleWithoutFirstLetter"](titleTest)).toBe("Success");
    });

    it('should return title first letter', () => {
        expect(component["getTitleFirstLetter"](titleTest)).toBe("N");
    });

    it('should change attribute modes', () => {
        component["setToJouerAndCreer"]();
        expect(component["isAdminMode"]).toBeFalsy();
        expect(component["isListePartiesMode"]).toBeTruthy();
        expect(component["jouerOuReinitialiser"]).toBe("Jouer");
        expect(component["creerOuSupprimer"]).toBe("Créer");
    });

    it('should change attribute modes', () => {
        component["setToReinitialiserAndSupprimer"]();
        expect(component["isAdminMode"]).toBeTruthy();
        expect(component["isListePartiesMode"]).toBeFalsy();
        expect(component["jouerOuReinitialiser"]).toBe("Réinitialiser");
        expect(component["creerOuSupprimer"]).toBe("Supprimer");
    });
});
