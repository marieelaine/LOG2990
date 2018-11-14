import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogMultipleComponent } from './dialog-multiple.component';
import {
    MatDividerModule, MatFormFieldModule, MatCardModule, MatDialogModule, MatDialogRef,
    MAT_DIALOG_DATA, MatInputModule, MatRadioModule, MatCheckboxModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PartieMultipleService } from '../partie-multiple.service';
import { of } from 'rxjs';
import { By } from "@angular/platform-browser";
import { PartieMultiple } from './partie-multiple';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('DialogMultipleComponent', () => {
    let mockPartieMultipleService: jasmine.SpyObj<PartieMultipleService>;
    let mockDialogRef: jasmine.SpyObj<MatDialogRef<DialogMultipleComponent>>;
    let component: DialogMultipleComponent;
    let fixture: ComponentFixture<DialogMultipleComponent>;

    // tslint:disable-next-line:max-func-body-length
    beforeEach(() => {
        mockPartieMultipleService = jasmine.createSpyObj(["register"]);
        mockDialogRef = jasmine.createSpyObj(["close"]);

        TestBed.configureTestingModule({
            declarations: [DialogMultipleComponent],
            imports: [
                MatDividerModule,
                MatFormFieldModule,
                MatCardModule,
                FormsModule,
                MatDialogModule,
                MatInputModule,
                MatCheckboxModule,
                BrowserAnimationsModule,
                MatRadioModule,
                HttpClientTestingModule,
                ReactiveFormsModule
            ],
            providers: [
                { provide: MatDialogRef, useValue: mockDialogRef },
                { provide: MAT_DIALOG_DATA, useValue: {} },
                { provide: PartieMultipleService, useValue: mockPartieMultipleService },
            ],
            schemas: [
                NO_ERRORS_SCHEMA
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

    describe("function checkIfOutOfBoundNameLength", () => {
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

        it("Devrait retourner vrai si la quantité de formes désirées est inférieur à 10", () => {
            component["data"].quantiteObjets = 9;

            const result: Boolean = component["checkIfOutOfBoundNumberForms"]();

            expect(result).toBeTruthy();
        });

        it("Devrait retourner vrai si la quantité de formes désirées est supérieure à 200", () => {
            component["data"].quantiteObjets = 201;

            const result: Boolean = component["checkIfOutOfBoundNumberForms"]();

            expect(result).toBeTruthy();
        });

        it("Devrait retourner vrai si le type de modifications est vide", () => {
            component["data"].typeModification = "";

            const result: Boolean = component["checkAllCheckbox"]();

            expect(result).toBeTruthy();
        });

        it("Devrait retourner vrai si le thème n'est pas choisi", () => {
            component["data"].theme = "";

            const result: Boolean = component["checkThemeButton"]();

            expect(result).toBeTruthy();
        });

        it("Devrait retourner faux si le thème est choisi", () => {
            component["data"].theme = "geo";

            const result: Boolean = component["checkThemeButton"]();

            expect(result).toBeFalsy();
        });

        it("Devrait retourner faux si le type de modifications n'est pas vide", () => {
            component["data"].typeModification = "acs";

            const result: Boolean = component["checkAllCheckbox"]();

            expect(result).toBeFalsy();
        });

        it("Devrait retourner faux si le nom de partie multiple est valide", () => {
            component["data"].multipleGameName = "abcdefg";

            const result: Boolean = component["checkIfOutOfBoundNameLength"]();

            expect(result).toBeFalsy();
        });

        it("Devrait retourner faux si la quantité de formes désirées est entre 10 et 200", () => {
            component["data"].quantiteObjets = 57;

            const result: Boolean = component["checkIfOutOfBoundNumberForms"]();

            expect(result).toBeFalsy();
        });
    });

    describe("Fonction onClickAjouterPartie", () => {
        it("Devrait appeller la fonction setOutOfBoundNameLengthMessage", () => {

            mockPartieMultipleService.register.and.returnValue(of({}));
            mockDialogRef.close.and.returnValue(true);
            // tslint:disable-next-line:no-any
            const spy: jasmine.Spy = spyOn<any>(component, "setOutOfBoundNameLengthMessage");
            component["onClickAjouterPartie"]();
            expect(spy).toHaveBeenCalled();
        });

        it("Devrait appeller la fonction setOutOfBoundNumberFormsMessage", () => {

            mockPartieMultipleService.register.and.returnValue(of({}));
            mockDialogRef.close.and.returnValue(true);
            // tslint:disable-next-line:no-any
            const spy: jasmine.Spy = spyOn<any>(component, "setOutOfBoundNumberFormsMessage");
            component["onClickAjouterPartie"]();
            expect(spy).toHaveBeenCalled();
        });

        it("Devrait appeller la fonction setCheckboxMessage", () => {

            mockPartieMultipleService.register.and.returnValue(of({}));
            mockDialogRef.close.and.returnValue(true);
            // tslint:disable-next-line:no-any
            const spy: jasmine.Spy = spyOn<any>(component, "setCheckboxMessage");
            component["onClickAjouterPartie"]();
            expect(spy).toHaveBeenCalled();
        });

        it("Devrait appeller la fonction setThemeMessage", () => {

            mockPartieMultipleService.register.and.returnValue(of({}));
            mockDialogRef.close.and.returnValue(true);
            // tslint:disable-next-line:no-any
            const spy: jasmine.Spy = spyOn<any>(component, "setThemeMessage");
            component["onClickAjouterPartie"]();
            expect(spy).toHaveBeenCalled();
        });

        it("Devrait appeller la fonction closeDialogIfRequirements", () => {

            mockPartieMultipleService.register.and.returnValue(of({}));
            mockDialogRef.close.and.returnValue(true);
            // tslint:disable-next-line:no-any
            const spy: jasmine.Spy = spyOn<any>(component, "closeDialogIfRequirements");
            component["onClickAjouterPartie"]();
            expect(spy).toHaveBeenCalled();
        });

        it("should close the dialog if cancel button is clicked", () => {
            const onNoClickButton = fixture.debugElement.query(By.css("#onNoClickButton")).nativeElement;

            // tslint:disable-next-line:no-any
            const spy: jasmine.Spy = spyOn<any>(component, "surClickExterieurDialog");
            onNoClickButton.dispatchEvent(new Event("click"));
            expect(spy).toHaveBeenCalled();
          });

        it("should call onClickAjouterPartie when an add game button is clicked", () => {
            const onAddClickButton = fixture.debugElement.query(By.css("#onAddClickButton")).nativeElement;

            // tslint:disable-next-line:no-any
            const spy: jasmine.Spy = spyOn<any>(component, "onClickAjouterPartie");
            onAddClickButton.dispatchEvent(new Event("click"));
            expect(spy).toHaveBeenCalled();
        });
    });
});
