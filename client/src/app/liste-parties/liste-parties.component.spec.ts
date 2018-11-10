// TODO ARRANGER LES TESTS

import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { ListePartiesComponent } from './liste-parties.component';
// import { MatCardModule, MAT_DIALOG_DATA, MatDialogModule, MatMenuTrigger, MatMenuModule } from '@angular/material';
// import { RouterTestingModule } from '@angular/router/testing';
// import { PartieSimple } from "../admin/dialog-simple/partie-simple";
// import { ListePartieSimpleComponent } from './liste-partie-simple/liste-partie-simple.component';
// import { ListePartieMultipleComponent } from './liste-partie-multiple/liste-partie-multiple.component';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { By } from "@angular/platform-browser";
// import { PartieSimpleSoloComponent } from '../partie/vue-simple/partie-simple-solo/partie-simple-solo.component';
// import { AdminComponent } from '../admin/admin.component';
// import { TempsUser } from '../admin/dialog-abstrait';

// describe('ListePartiesComponent', () => {
//     let component: ListePartiesComponent;
//     let fixture: ComponentFixture<ListePartiesComponent>;

//     const user1: TempsUser = new TempsUser("user1", 1);
//     const user2: TempsUser = new TempsUser("user2", 2);
//     const bestTimesTest: TempsUser[] = [user1, user2];
//     const sortingTimesTest: TempsUser[] = [643, 5, 213, 1465, 1, 0];
//     const titleTest: String = "NSuccess";
//     const convertTimeTest: number = 547;
//     const displaySecondsTest: number = 57;
//     const displayMinutesTest: number = 9;
//     const partie1 = new PartieSimple("name", [1, 2], [1, 2], new Buffer(""), new Buffer(""), [[]]);
//     const partie2 = new PartieSimple("name2", [1, 2], [1, 2], new Buffer(""), new Buffer(""), [[]]);
//     const listeParties: PartieSimple[] = [partie1, partie2];

//     beforeEach(() => {
//         TestBed.configureTestingModule({
//             declarations: [
//                 ListePartiesComponent,
//                 ListePartieSimpleComponent,
//                 ListePartieMultipleComponent,
//                 PartieSimpleSoloComponent,
//                 AdminComponent
//             ],
//             schemas: [
//                 CUSTOM_ELEMENTS_SCHEMA
//             ],
//             imports: [
//                 MatCardModule,
//                 RouterTestingModule.withRoutes([
//                     { path: "liste-parties", component: ListePartiesComponent },
//                     { path: "partie-solo", component: PartieSimpleSoloComponent },
//                     { path: "admin", component: AdminComponent },
//                 ]),
//                 HttpClientTestingModule,
//                 MatDialogModule,
//                 MatMenuModule
//             ],
//             providers: [
//                 { provide: MAT_DIALOG_DATA, useValue: {} },
//             ]
//         });
//         fixture = TestBed.createComponent(ListePartiesComponent);
//         component = fixture.componentInstance;
//     });

//     it('should create', () => {
//         expect(component).toBeTruthy();
//     });

//     it('should change jouerOuReinitialiser and creerOuSupprimer to "Jouer" and "Supprimer" when url is /liste-parties', () => {
//         component["setjouerOuReinitialiserAndcreerOuSupprimer"]('/liste-parties');
//         expect(component["jouerOuReinitialiser"]).toBe('Jouer');
//         expect(component["creerOuSupprimer"]).toBe('Créer');
//         expect(component["isListePartiesMode"]).toBe(true);
//     });

//     it('should change jouerOuReinitialiser and creerOuSupprimer to "Reinitialiser" and "Supprimer" when url is /admin', () => {
//         component["setjouerOuReinitialiserAndcreerOuSupprimer"]('/admin');
//         expect(component["jouerOuReinitialiser"]).toBe('Réinitialiser');
//         expect(component["creerOuSupprimer"]).toBe('Supprimer');
//         expect(component["isAdminMode"]).toBe(true);
//     });

//     // Tests classement des meilleurs temps
//     it('should return best time', () => {
//         expect(component["getBestTime"](bestTimesTest)).toBe("0:01");
//     });

//     it('should return second best time', () => {
//         expect(component["getSecondBestTime"](bestTimesTest)).toBe("0:02");
//     });

//     it('should return third best time', () => {
//         expect(component["getThirdBestTime"](bestTimesTest)).toBe("-");
//     });

//     // Test ordonnance d'un tableau de temps
//     it('should return array of sorted times', () => {
//         expect(component["getSortedTimes"](sortingTimesTest)).toEqual([0, 1, 5, 213, 643, 1465]);
//     });

//     // Test conversion en minutes et secondes
//     it('should return array of sorted times', () => {
//         expect(component["convertSecondsToMinutes"](convertTimeTest)).toBe("9:07");
//     });

//     // Test retour du temps a afficher
//     it('should return array of sorted times', () => {
//         expect(component["getDisplayTime"](displayMinutesTest, displaySecondsTest)).toBe("9:57");
//     });

//     // Test generer nouveaux tableaux des temps
//     it('should create new random array of sorted times', () => {
//         component["genererTableauTempsAleatoires"](partie1);
//         expect(partie1["_tempsSolo"]).not.toEqual([1, 2]);
//         expect(partie1["_tempsUnContreUn"]).not.toEqual([1, 2]);
//     });

//     // Test remove first letter of title
//     it('should return title without first letter', () => {
//         expect(component["getTitleWithoutFirstLetter"](titleTest)).toBe("Success");
//     });

//     // Test get first letter of title
//     it('should return title first letter', () => {
//         expect(component["getTitleFirstLetter"](titleTest)).toBe("N");
//     });

//     // Test setToJouerAndCreer
//     it('should change attribute modes', () => {
//         component["setToJouerAndCreer"]();
//         expect(component["isAdminMode"]).toBeFalsy();
//         expect(component["isListePartiesMode"]).toBeTruthy();
//         expect(component["jouerOuReinitialiser"]).toBe("Jouer");
//         expect(component["creerOuSupprimer"]).toBe("Créer");
//     });

//     // Test setToReinitialiserAndSupprimer
//     it('should change attribute modes', () => {
//         component["setToReinitialiserAndSupprimer"]();
//         expect(component["isAdminMode"]).toBeTruthy();
//         expect(component["isListePartiesMode"]).toBeFalsy();
//         expect(component["jouerOuReinitialiser"]).toBe("Réinitialiser");
//         expect(component["creerOuSupprimer"]).toBe("Supprimer");
//     });
// });
// 
