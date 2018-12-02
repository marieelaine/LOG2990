import { ComponentFixture, TestBed } from "@angular/core/testing";
import {
    MatDividerModule, MatFormFieldModule, MatCardModule, MatDialogModule, MatDialogRef,
    MAT_DIALOG_DATA, MatInputModule, MatRadioModule, MatCheckboxModule
} from "@angular/material";
import { FormsModule, ReactiveFormsModule, FormControl } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { By } from "@angular/platform-browser";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { of } from "rxjs";
import { PartieMultipleService } from "../partie-multiple.service";
import { DialogMultipleComponent } from "./dialog-multiple.component";
import { PartieMultiple } from "./partie-multiple";

describe("DialogMultipleComponent", () => {
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

    it("Composant devrait être créé", () => {
        expect(component).toBeTruthy();
    });

    describe("fonction ajouterPartie", () => {
        it("devrait appeler la fonction register du service PartieMultiple", () => {
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

    describe("fonction contientErreur", () => {
        it("Devrait retourner vrai si il y a un message derreur", () => {
            component["erreurTheme"] = "Erreur";

            const result: Boolean = component["contientErreur"]();

            expect(result).toBeTruthy();
        });

        it("Devrait retourner faux si le message est vide", () => {
            component["erreurTheme"] = "";
            component["erreurTransformation"] = "";
            component["nomControl"].setValue("test");
            component["qteControl"].setValue("12");

            const result: Boolean = component["contientErreur"]();

            expect(result).toBeFalsy();
        });
    });

    describe("formControl nom de partie : ", () => {
        it("Devrait retourner invalide au depart", () => {
            const nom: FormControl = component["nomControl"];
            expect(nom.valid).toBeFalsy();
        });

        it("Devrait retourner invalide si le nom de partie multiple contient moins de trois caracteres", () => {
            component["nomControl"].setValue("ab");
            expect(component["nomControl"].valid).toBeFalsy();
        });

        it("Devrait retourner invalide si le nom de partie multiple contient plus de vingt caracteres", () => {
            component["nomControl"].setValue("abcdefghijklmnopqrstuv");
            expect(component["nomControl"].valid).toBeFalsy();
        });

        it("Devrait retourner valide si le nom de partie multiple est valide", () => {
            component["nomControl"].setValue("test");
            expect(component["nomControl"].valid).toBeTruthy();
        });
    });

    describe("formControl quantité dobjets : ", () => {

        it("Devrait retourner invalide si la quantité de formes désirées est inférieur à 10", () => {
            component["qteControl"].setValue("9");
            expect(component["qteControl"].valid).toBeFalsy();
        });

        it("Devrait retourner invalide si la quantité de formes désirées est supérieure à 200", () => {
            component["qteControl"].setValue("201");
            expect(component["qteControl"].valid).toBeFalsy();
        });

        it("Devrait retourner invalide si le type de modifications est vide", () => {
            component["qteControl"].setValue("");
            expect(component["qteControl"].valid).toBeFalsy();
        });

        it("Devrait retourner invalide si le type de modifications contient des lettres", () => {
            component["qteControl"].setValue("abc");
            expect(component["qteControl"].valid).toBeFalsy();
        });

        it("Devrait retourner valide si le type de modifications est valide", () => {
            component["qteControl"].setValue("50");
            expect(component["qteControl"].valid).toBeTruthy();
        });

    });

    describe("fonction setErreurTheme : ", () => {

        it("Devrait ne pas avoir d'erreur si le thème est choisi", () => {
            component["data"].theme = "geo";
            component["setErreurTheme"]();
            expect(component["erreurTheme"]).toEqual("");
        });

        it("Devrait retourner une erreur si le thème n'est pas choisi", () => {
            component["data"].theme = "";
            component["setErreurTheme"]();
            expect(component["erreurTheme"]).toEqual("*Un theme doit etre selectionne.");
        });
    });

    describe("fonction setErreurTransformation : ", () => {

        it("Devrait ne pas avoir d'erreur si une transformation est choisie", () => {
            component["data"].typeModification = "acs";
            component["setErreurTransformation"]();
            expect(component["erreurTransformation"]).toEqual("");
        });

        it("Devrait retourner une erreur si le thème n'est pas choisi", () => {
            component["data"].typeModification = "";
            component["setErreurTransformation"]();
            expect(component["erreurTransformation"]).toEqual("*Une transformation doit etre selectionnee au minimum.");
        });
    });

    describe("Fonction onClickAjouterPartie", () => {
        it("Devrait appeller la fonction setErreurTransformation", () => {

            mockPartieMultipleService.register.and.returnValue(of({}));
            mockDialogRef.close.and.returnValue(true);
            // tslint:disable-next-line:no-any
            const spy: jasmine.Spy = spyOn<any>(component, "setErreurTransformation");
            component["onClickAjouterPartie"]();
            expect(spy).toHaveBeenCalled();
        });

        it("Devrait appeller la fonction setErreurTheme", () => {

            mockPartieMultipleService.register.and.returnValue(of({}));
            mockDialogRef.close.and.returnValue(true);
            // tslint:disable-next-line:no-any
            const spy: jasmine.Spy = spyOn<any>(component, "setErreurTheme");
            component["onClickAjouterPartie"]();
            expect(spy).toHaveBeenCalled();
        });

        it("Devrait appeller la fonction fermerDialog", () => {

            mockPartieMultipleService.register.and.returnValue(of({}));
            mockDialogRef.close.and.returnValue(true);
            // tslint:disable-next-line:no-any
            const spy: jasmine.Spy = spyOn<any>(component, "fermerDialog");
            component["onClickAjouterPartie"]();
            expect(spy).toHaveBeenCalled();
        });

        it("should close the dialog if cancel button is clicked", () => {
            const onNoClickButton: HTMLElement = fixture.debugElement.query(By.css("#onNoClickButton")).nativeElement;

            // tslint:disable-next-line:no-any
            const spy: jasmine.Spy = spyOn<any>(component, "surClickExterieurDialog");
            onNoClickButton.dispatchEvent(new Event("click"));
            expect(spy).toHaveBeenCalled();
          });

        it("should call onClickAjouterPartie when an add game button is clicked", () => {
            const onAddClickButton: HTMLElement = fixture.debugElement.query(By.css("#onAddClickButton")).nativeElement;

            // tslint:disable-next-line:no-any
            const spy: jasmine.Spy = spyOn<any>(component, "onClickAjouterPartie");
            onAddClickButton.dispatchEvent(new Event("click"));
            expect(spy).toHaveBeenCalled();
        });
    });
});
