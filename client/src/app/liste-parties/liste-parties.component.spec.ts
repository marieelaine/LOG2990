import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ListePartiesComponent } from './liste-parties.component';
import { MatCardModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';

import { ListePartieSimpleComponent } from './liste-partie-simple/liste-partie-simple.component';
import { ListePartieMultipleComponent } from './liste-partie-multiple/liste-partie-multiple.component';
import { PartieSoloComponent } from '../partie/vue-simple/partie-solo/partie-solo.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ListePartiesComponent', () => {
    let component: ListePartiesComponent;
    let fixture: ComponentFixture<ListePartiesComponent>;

    const bestTimesTest: number[] = [1, 2];
    const sortingTimesTest: number[] = [643, 5, 213, 1465, 1, 0];
    const titleTest: String = "NSuccess";
    const convertTimeTest: number = 547;
    const displaySecondsTest: number = 57;
    const displayMinutesTest: number = 9;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ListePartiesComponent, ListePartieSimpleComponent, ListePartieMultipleComponent, PartieSoloComponent],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA
            ],
            imports: [
                MatCardModule,
                RouterTestingModule.withRoutes([
                    { path: "liste-parties", component: ListePartiesComponent },
                    { path: "partie-solo", component: PartieSoloComponent },
                    { path: "admin", component: PartieSoloComponent },
                ]),
                HttpClientTestingModule
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
        expect(component.jouerOuReinitialiser).toBe('Jouer');
        expect(component.creerOuSupprimer).toBe('Créer');
        expect(component.isListePartiesMode).toBe(true);
    });

    it('should change jouerOuReinitialiser and creerOuSupprimer to "Reinitialiser" and "Supprimer" when url is /admin', () => {
        component["setjouerOuReinitialiserAndcreerOuSupprimer"]('/admin');
        expect(component.jouerOuReinitialiser).toBe('Réinitialiser');
        expect(component.creerOuSupprimer).toBe('Supprimer');
        expect(component.isAdminMode).toBe(true);
    });

    // Tests classement des meilleurs temps
    it('should return best time', () => {
        expect(component["getBestTime"](bestTimesTest)).toBe("0:01");
    });

    it('should return second best time', () => {
        expect(component["getSecondBestTime"](bestTimesTest)).toBe("0:02");
    });

    it('should return third best time', () => {
        expect(component["getThirdBestTime"](bestTimesTest)).toBe("-");
    });

    // Test ordonnance d'un tableau de temps
    it('should return array of sorted times', () => {
        expect(component["getSortedTimes"](sortingTimesTest)).toEqual([0, 1, 5, 213, 643, 1465]);
    });

    // Test remove first letter of title
    it('should return title without first letter', () => {
        expect(component["getTitleWithoutFirstLetter"](titleTest)).toBe("Success");
    });

    // Test conversion en minutes et secondes
    it('should return array of sorted times', () => {
        expect(component["convertSecondsToMinutes"](convertTimeTest)).toBe("9:07");
    });

    // Test retour du temps a afficher
    it('should return array of sorted times', () => {
        expect(component["getDisplayTime"](displayMinutesTest, displaySecondsTest)).toBe("9:57");
    });
});
