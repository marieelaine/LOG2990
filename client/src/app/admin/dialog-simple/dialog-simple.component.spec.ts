import { ComponentFixture, TestBed } from "@angular/core/testing";

import { DialogSimpleComponent } from "./dialog-simple.component";
import {
    MatDividerModule, MatFormFieldModule, MatCardModule, MatDialogModule, MatDialogRef,
    MAT_DIALOG_DATA, MatInputModule, MatCheckboxModule
} from "@angular/material";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { HttpClientTestingModule } from "@angular/common/http/testing";
import { createMockImageFile } from "../../../testing/file-creator";
import { By } from "@angular/platform-browser";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";

describe("DialogSimpleComponent", () => {
    let component: DialogSimpleComponent;
    let fixture: ComponentFixture<DialogSimpleComponent>;

    beforeEach(() => {
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
                { provide: MatDialogRef, useValue: {} },
                { provide: MAT_DIALOG_DATA, useValue: {} },
            ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA,
                NO_ERRORS_SCHEMA
            ]
        });

        fixture = TestBed.createComponent(DialogSimpleComponent);
        component = fixture.componentInstance;
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should return false if all error messages are null", () => {
        component["outOfBoundNameLengthMessage"] = "";
        component["wrongImageSizeOrTypeMessage"] = "";
        component["wrongNumberOfImagesMessage"] = "";
        expect(component["verifierSiMessageErreur"]()).toBe(false);
    });

    it("should return true if at least one error message is not null", () => {
        component["outOfBoundNameLengthMessage"] = "Error message";
        expect(component["verifierSiMessageErreur"]()).toBe(true);
    });

    it("should set outOfBoundNameLengthMessage if name does not meet requierments", () => {
        component["data"].simpleGameName = "A";
        component["setOutOfBoundNameLengthMessage"]();
        expect(component["outOfBoundNameLengthMessage"]).toEqual("*Le nom du jeu doit être entre 3 et 20 charactères.");
    });

    it("should set outOfBoundNameLengthMessage if name does not meet requierments", () => {
        component["data"].simpleGameName = "aaaaaaaaaaaaaaaaaaaaa";
        component["setOutOfBoundNameLengthMessage"]();
        expect(component["outOfBoundNameLengthMessage"]).toEqual("*Le nom du jeu doit être entre 3 et 20 charactères.");
    });

    it("should not set outOfBoundNameLengthMessage if name meet requierments", () => {
        component["data"].simpleGameName = "Nissan Patrol";
        component["setOutOfBoundNameLengthMessage"]();
        expect(component["outOfBoundNameLengthMessage"]).toEqual("");
    });

    it("should set wrongNumberOfImagesMessage if there are less than two images", () => {
        component["selectedFiles"][0] = createMockImageFile(true);
        component["setWrongNumberOfImagesMessage"]();
        expect(component["wrongNumberOfImagesMessage"]).toEqual("*Vous devez entrer deux images.");
    });

    it("should not set wrongNumberOfImagesMessage if there are two images", () => {
        component["selectedFiles"][0] = createMockImageFile(true);
        component["selectedFiles"][1] = createMockImageFile(true);
        component["setWrongNumberOfImagesMessage"]();
        expect(component["wrongNumberOfImagesMessage"]).toEqual("");
    });

    it("should call onUploadImage when an image is uploaded", () => {
    const uploadImage1 = fixture.debugElement.query(By.css("#uploadImage1")).nativeElement;

    // tslint:disable-next-line:no-any
    const spy: jasmine.Spy = spyOn<any>(component, "onUploadImage");
    uploadImage1.dispatchEvent(new Event("change"));
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

    it("should set wrongImageSizeOrTypeMessage image does not respect good size", () => {
        const imageInfo = { "size": 64, "width": 1080, "height": 480 };
        component["selectedFiles"][0] = createMockImageFile(true);
        component["setWrongImageSizeOrTypeMessage"](imageInfo);
        expect(component["wrongImageSizeOrTypeMessage"]).toEqual("*L'image doit être de format BMP 24 bits et de taille 640 x 480 pixels");
    });

    it("should set wrongImageSizeOrTypeMessage image does not respect good type", () => {
        const imageInfo = { "size": 24, "width": 640, "height": 480 };
        component["currentImageNumber"] = 0;
        component["selectedFiles"][0] = createMockImageFile(false);
        component["setWrongImageSizeOrTypeMessage"](imageInfo);
        expect(component["wrongImageSizeOrTypeMessage"]).toEqual("*L'image doit être de format BMP 24 bits et de taille 640 x 480 pixels");
    });

    it("should not set wrongImageSizeOrTypeMessage image respect good type and size", () => {
        const imageInfo = { "size": 24, "width": 640, "height": 480 };
        component["selectedFiles"][0] = createMockImageFile(true);
        component["setWrongImageSizeOrTypeMessage"](imageInfo);
        expect(component["wrongImageSizeOrTypeMessage"]).toEqual("");
    });
});
