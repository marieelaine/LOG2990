import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { DialogErreurComponent } from "./dialog-erreur.component";
import { MatDialogModule, MatDividerModule, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

describe("DialogErreurComponent", () => {
    let component: DialogErreurComponent;
    let fixture: ComponentFixture<DialogErreurComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [DialogErreurComponent],
            imports: [
                MatDialogModule,
                MatDividerModule,
            ],
            providers: [
                { provide: MatDialogRef, useValue: {} },
                { provide: MAT_DIALOG_DATA, useValue: {} }
            ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA,
            ]
        });

        fixture = TestBed.createComponent(DialogErreurComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("devrait fermer le dialog si l'utilisateur appuie sur le bouton pour fermer", () => {
        const onNoClickButton: HTMLElement = fixture.debugElement.query(By.css(".dialogButtons")).nativeElement;

        // tslint:disable-next-line:no-any
        const spy: jasmine.Spy = spyOn<any>(component, "fermerDialog");
        onNoClickButton.dispatchEvent(new Event("click"));

        expect(spy).toHaveBeenCalled();
    });
});
