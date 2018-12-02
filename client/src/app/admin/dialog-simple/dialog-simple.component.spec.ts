import { ComponentFixture, TestBed } from "@angular/core/testing";
import {
    MatDividerModule, MatFormFieldModule, MatCardModule, MatDialogModule, MatDialogRef,
    MAT_DIALOG_DATA, MatInputModule, MatCheckboxModule
} from "@angular/material";
import { By } from "@angular/platform-browser";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule, FormControl } from "@angular/forms";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { MockFileCreator } from "../../../testing/file-creator";
import { DialogSimpleComponent, ImageInfo } from "./dialog-simple.component";
import { PartieSimpleService } from "../partie-simple.service";
import { PartieSimple } from "./partie-simple";
import { Observable } from "rxjs";
import "rxjs/add/observable/of";

class PartieSimpleServiceMock {
    public register(partieSimple: PartieSimple): Observable<PartieSimple> {
        return Observable.of(partieSimple);
    }
}

describe("DialogSimpleComponent", () => {
    let mockPartieSimpleService: jasmine.SpyObj<PartieSimpleService>;
    let component: DialogSimpleComponent;
    let fixture: ComponentFixture<DialogSimpleComponent>;
    const mockFile: MockFileCreator = new MockFileCreator();

    beforeEach(() => {
        mockPartieSimpleService = jasmine.createSpyObj(["register"]);

        TestBed.configureTestingModule({
            declarations: [DialogSimpleComponent],
            imports: [
                MatDividerModule,
                MatFormFieldModule,
                MatCardModule,
                FormsModule,
                MatDialogModule,
                MatInputModule,
                BrowserAnimationsModule,
                HttpClientTestingModule,
                MatCheckboxModule,
                ReactiveFormsModule
            ],
            providers: [
                { provide: PartieSimpleService, useValue: PartieSimpleServiceMock },
                { provide: MatDialogRef, useValue: {} }, { provide: MAT_DIALOG_DATA, useValue: {} },
            ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA,
            ]
        });

        fixture = TestBed.createComponent(DialogSimpleComponent);
        component = fixture.componentInstance;
    });

    it("Composant devrait être créé", () => {
        expect(component).toBeTruthy();
    });

    describe("fonction ajouterPartie", () => {
        it("devrait appeler la fonction register du service PartieSimple", () => {
            // tslint:disable-next-line:no-any
            const registerSpy: jasmine.Spy = spyOn<any>(component["partieSimpleService"], "register")
            .and.returnValue({subscribe: () => {} });

            component["ajouterPartie"]();

            expect(registerSpy).toHaveBeenCalled();
            expect(registerSpy).toHaveBeenCalledTimes(1);
        });
    });

    describe("fonction contientErreur", () => {
        it("Devrait retourner vrai si il y a un message derreur", () => {
            component["erreurNbImage"] = "Erreur";
            const result: Boolean = component["contientErreur"]();
            expect(result).toBeTruthy();
        });

        it("Devrait retourner faux si le message est vide", () => {
            component["erreurNbImage"] = "";
            component["erreurTypeImage"] = "";
            component["nomControl"].setValue("test");

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

    describe("fonction setErreurImage : ", () => {

        it("Devrait ne pas avoir d'erreur si bon type et bonne taille", () => {
            const imageInfo: ImageInfo = { "size": 24, "width": 640, "height": 480 };
            component["fichier"][0] = mockFile.createMockImageFile(true);
            component["setErreursImage"](imageInfo);
            expect(component["erreurTypeImage"]).toEqual("");
        });

        it("Devrait retourner une erreur si mauvaise taille d'image", () => {
            const imageInfo: ImageInfo = { "size": 64, "width": 1080, "height": 480 };
            component["fichier"][0] = mockFile.createMockImageFile(true);

            const resultat: boolean = component["estBonneTaille"](imageInfo);
            expect(resultat).toBeFalsy();
            component["setErreursImage"](imageInfo);
            expect(component["erreurTypeImage"]).toEqual("*L'image doit être de format BMP 24 bits et de taille 640 x 480 pixels");
        });

        it("Devrait retourner une erreur si mauvaise type d'image", () => {
            component["fichier"][0] = mockFile.createMockImageFile(false);
            const resultat: boolean = component["estBonType"]();
            expect(resultat).toBeFalsy();
        });

    });

    describe("fonction setErreurNbImage : ", () => {

        it("Devrait retourner une erreur si pas bon nombre d'image", () => {
            component["fichier"][0] = mockFile.createMockImageFile(true);
            component["setErreurNbImage"]();
            expect(component["erreurNbImage"]).toEqual("*Vous devez entrer deux images.");
        });

        it("Devrait retourner une erreur si pas bon nombre d'image", () => {
            component["fichier"][0] = mockFile.createMockImageFile(true);
            component["fichier"][1] = mockFile.createMockImageFile(true);
            component["setErreurNbImage"]();
            expect(component["erreurNbImage"]).toEqual("");
        });

    });

    describe("fonction onAjoutImage : ", () => {

        it("Devrait appeler onAjoutImage quand on upload une image", () => {
            const uploadImage1: HTMLElement = fixture.debugElement.query(By.css("#uploadImage1")).nativeElement;

            // tslint:disable-next-line:no-any
            const spy: jasmine.Spy = spyOn<any>(component, "onAjoutImage");
            uploadImage1.dispatchEvent(new Event("change"));
            expect(spy).toHaveBeenCalled();
        });

        it("Devrait fermer le dialog quand on clique sur annuler", () => {
            const onNoClickButton: HTMLElement = fixture.debugElement.query(By.css("#onNoClickButton")).nativeElement;

            // tslint:disable-next-line:no-any
            const spy: jasmine.Spy = spyOn<any>(component, "surClickExterieurDialog");
            onNoClickButton.dispatchEvent(new Event("click"));

            expect(spy).toHaveBeenCalled();
        });

        it("Devrait appeler onClickAjouterPartie quand on clique sur Ajouter", () => {
            const onAddClickButton: HTMLElement = fixture.debugElement.query(By.css("#onAddClickButton")).nativeElement;

            // tslint:disable-next-line:no-any
            const spy: jasmine.Spy = spyOn<any>(component, "onClickAjouterPartie");
            onAddClickButton.dispatchEvent(new Event("click"));

            expect(spy).toHaveBeenCalled();
        });
    });
});
