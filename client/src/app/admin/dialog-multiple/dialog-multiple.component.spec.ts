import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogMultipleComponent } from './dialog-multiple.component';
import {
    MatDividerModule, MatFormFieldModule, MatCardModule, MatDialogModule, MatDialogRef,
    MAT_DIALOG_DATA, MatInputModule, MatRadioModule
} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PartieMultipleService } from '../partie-multiple.service';
import { of } from 'rxjs';
import { PartieMultiple } from './partie-mutiple';

describe('DialogMultipleComponent', () => {
    let mockPartieMultipleService: jasmine.SpyObj<PartieMultipleService>;
    let component: DialogMultipleComponent;
    let fixture: ComponentFixture<DialogMultipleComponent>;

    beforeEach(() => {
        mockPartieMultipleService = jasmine.createSpyObj(["register"]);

        TestBed.configureTestingModule({
            declarations: [DialogMultipleComponent],
            imports: [
                MatDividerModule,
                MatFormFieldModule,
                MatCardModule,
                FormsModule,
                MatDialogModule,
                MatInputModule,
                BrowserAnimationsModule,
                MatRadioModule,
                HttpClientTestingModule
            ],
            providers: [
                { provide: MatDialogRef, useValue: {} },
                { provide: MAT_DIALOG_DATA, useValue: {} },
                { provide: PartieMultipleService, useValue: mockPartieMultipleService },
            ]
        });

        fixture = TestBed.createComponent(DialogMultipleComponent);
        component = fixture.componentInstance;
    });

    it('Composant devrait être créé', () => {
        expect(component).toBeTruthy();
    });

    describe("fonction ajouterPartie", () => {
        it("devrait appeler la fonction register du servie PartieMultiple", () => {
            mockPartieMultipleService.register.and.callFake((data: PartieMultiple) => of(data));
            component["data"].multipleGameName = "Partie1";
            component["data"].quantiteObjets = 1;
            component["data"].theme = "geo";
            component["data"].typeModification = "a";

            component["ajouterPartie"]();

            expect(mockPartieMultipleService.register).toHaveBeenCalled();
            expect(mockPartieMultipleService.register).toHaveBeenCalledTimes(1);
        });
    });

    describe("fonction verifierSiMessageErreur", () => {
        it("Devrait retourner vrai si le message n\'est pas vide", () => {
            component["outOfBoundNameLengthMessage"] = "Erreur";

            const result: Boolean = component["verifierSiMessageErreur"]();

            expect(result).toBeTruthy();
        });

        it("Devrait retourner faux si le message est vide", () => {
            component["outOfBoundNameLengthMessage"] = "";

            const result: Boolean = component["verifierSiMessageErreur"]();

            expect(result).toBeFalsy();
        });
    });

    describe("function checkIfOutOfBoundNameLength", () =>{
        it("Devrait retourner vrai si aucun nom de partie multiple n'est présent", () => {
            component["data"].multipleGameName = "";

            const result: Boolean = component["checkIfOutOfBoundNameLength"]();

            expect(result).toBeTruthy();
        });

        it("Devrait retourner vrai si le nom de partie multiple contient moins de trois caracteres", () => {
            component["data"].multipleGameName = "ab";

            const result: Boolean = component["checkIfOutOfBoundNameLength"]();

            expect(result).toBeTruthy();
        });

        it("Devrait retourner vrai si le nom de partie multiple contient plus de vingt caracteres", () => {
            component["data"].multipleGameName = "abcdefghijklmnopqrstuvwxyz";

            const result: Boolean = component["checkIfOutOfBoundNameLength"]();

            expect(result).toBeTruthy();
        });

        it("Devrait retourner faux si le nom de partie multiple est valide", () => {
            component["data"].multipleGameName = "abcdefg";

            const result: Boolean = component["checkIfOutOfBoundNameLength"]();

            expect(result).toBeFalsy();
        });
    });

    // describe("Fonction onClickAjouterPartie", () => {
    //     it("Devrait appeller la fonction setOutOfBoundNameLengthMessage", () => {
    //         // Arrange
    //         const spy: jasmine.Spy = spyOn<any>(component, "setOutOfBoundNameLengthMessage");

    //         // Act
    //         component["onClickAjouterPartie"]();

    //         // Assert
    //         expect(spy).toHaveBeenCalled();
    //     });
    // });
});
