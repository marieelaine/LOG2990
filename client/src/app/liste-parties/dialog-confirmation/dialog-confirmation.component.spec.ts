import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { DialogConfirmationComponent } from "./dialog-confirmation.component";
import { MatDividerModule, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { PartieSimple } from "src/app/admin/dialog-simple/partie-simple";
import { PartieMultiple } from "src/app/admin/dialog-multiple/partie-multiple";
import { TempsUser } from "src/app/admin/dialog-abstrait";

describe("DialogConfirmationComponent", () => {
    const dialogMock:  = {
        close: () => { }
    };
    let component: DialogConfirmationComponent;
    let fixture: ComponentFixture<DialogConfirmationComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [DialogConfirmationComponent],
            imports: [
                MatDividerModule,
                HttpClientTestingModule,
                RouterTestingModule,
            ],
            providers: [
                { provide: MatDialogRef, useValue: dialogMock },
                { provide: MAT_DIALOG_DATA, useValue: {} },
            ]
        });

        fixture = TestBed.createComponent(DialogConfirmationComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it("devrait fermer le dialog si l'utilisateur appuie sur le bouton pour fermer", () => {
        const onNoClickButton = fixture.debugElement.query(By.css("#onConfirmationButtonYes")).nativeElement;

        // tslint:disable-next-line:no-any
        const spy: jasmine.Spy = spyOn<any>(component, "onDialogClose");
        onNoClickButton.dispatchEvent(new Event("click"));

        expect(spy).toHaveBeenCalled();
    });

    it("devrait appeler onConfirmationClick lorsque l'utiliateur click sur Yes", () => {
        const onNoClickButton = fixture.debugElement.query(By.css("#onConfirmationButtonNo")).nativeElement;

        // tslint:disable-next-line:no-any
        const spy: jasmine.Spy = spyOn<any>(component, "onConfirmationClick");
        onNoClickButton.dispatchEvent(new Event("click"));

        expect(spy).toHaveBeenCalled();
    });

    describe("onConfirmationClick", () => {
        it("devrait appeler supprimerPartieSimple si isSimple == true;", () => {
            component["listeParties"] = [];
            component["isSimple"] = true;

            // tslint:disable-next-line:no-any
            const spy: jasmine.Spy = spyOn<any>(component, "supprimerPartieSimple");

            component["onConfirmationClick"]();

            expect(spy).toHaveBeenCalled();
        });
        it("devrait appeler supprimerPartieMultiple si isSimple == false;", () => {
            component["listeParties"] = [];
            component["isSimple"] = false;

            // tslint:disable-next-line:no-any
            const spy: jasmine.Spy = spyOn<any>(component, "supprimerPartieMultiple");

            component["onConfirmationClick"]();

            expect(spy).toHaveBeenCalled();
        });
    });

    describe("supprimerPartieSimple", () => {
        beforeEach(() => {
            component["listePartiesSimple"] = [];
        });
        it("devrait appeler listePartieService.deletePartieSimple", () => {

            // tslint:disable-next-line:no-any
            const spy: jasmine.Spy = spyOn<any>(component["listePartieService"], "deletePartieSimple");

            component["supprimerPartieSimple"]();

            expect(spy).toHaveBeenCalled();
        });
        it("devrait appeler supprimerPartieDeLaffichage", () => {

            // tslint:disable-next-line:no-any
            const spy: jasmine.Spy = spyOn<any>(component, "supprimerPartieSimpleDeLaffichage");

            component["supprimerPartieSimple"]();

            expect(spy).toHaveBeenCalled();
        });
    });

    describe("supprimerPartieMultiple", () => {
        beforeEach(() => {
            component["listePartiesMultiples"] = [];
        });
        it("devrait appeler listePartieService.deletePartieMultiple", () => {

            // tslint:disable-next-line:no-any
            const spy: jasmine.Spy = spyOn<any>(component["listePartieService"], "deletePartieMultiple");

            component["supprimerPartieMultiple"]();

            expect(spy).toHaveBeenCalled();
        });
        it("devrait appeler supprimerPartieDeLaffichage", () => {

            // tslint:disable-next-line:no-any
            const spy: jasmine.Spy = spyOn<any>(component, "supprimerPartieMultipleDeLaffichage");

            component["supprimerPartieMultiple"]();

            expect(spy).toHaveBeenCalled();
        });
    });

    describe("supprimerPartieSimpleDeLaffichage", () => {
        beforeEach(() => {
            component["listePartiesSimples"] = [ new PartieSimple ("nomPartie", new Array<TempsUser>(), new Array<TempsUser>(),
                                                                   Buffer.from(new Array<number>()),
                                                                   Buffer.from(new Array<number>()), [["1,2"]], "123")];
        });
        it("devrait enlever la partie de la liste si elle existe", () => {

            component["partieId"] = "123";

            component["supprimerPartieSimpleDeLaffichage"]();

            expect(component["listePartiesSimples"]).toEqual([]);
        });
        it("ne devrait pas enlever la partie de la liste si elle n'existe pas", () => {

            component["partieId"] = "1";

            const expectedArray: Array<PartieSimple> = component["listePartiesSimples"];

            component["supprimerPartieSimpleDeLaffichage"]();

            expect(component["listePartiesSimples"]).toEqual(expectedArray);
        });
    });

    describe("supprimerPartieMultipleDeLaffichage", () => {
        beforeEach(() => {
            component["listePartiesMultiples"] = [ new PartieMultiple("", new Array<TempsUser>(), new Array<TempsUser>(),
                                                                      Buffer.from(new Array()), Buffer.from(new Array()),
                                                                      Buffer.from(new Array()), Buffer.from(new Array()),
                                                                      new Array<Array<string>>(), new Array<Array<string>>(),
                                                                      10, "", "123") ];
        });
        it("devrait enlever la partie de la liste si elle existe", () => {

            component["partieId"] = "123";

            component["supprimerPartieMultipleDeLaffichage"]();

            expect(component["listePartiesSimples"]).toEqual([]);
        });
        it("ne devrait pas enlever la partie de la liste si elle n'existe pas", () => {

            component["partieId"] = "1";

            const expectedArray: Array<PartieSimple> = component["listePartiesMultiple"];

            component["supprimerPartieMultipleDeLaffichage"]();

            expect(component["listePartiesMultiple"]).toEqual(expectedArray);
        });
    });

    describe("setListeParties", () => {
        it("devrait assigner la listePartie de data à ListePartieSimple si isSimple == true", () => {
            const data = { listeParties: [ new PartieSimple ("nomPartie", new Array<TempsUser>(), new Array<TempsUser>(),
                                                             Buffer.from(new Array<number>()),
                                                             Buffer.from(new Array<number>()), [["1,2"]], "123")] };
            component["isSimple"] = true;

            component["setListeParties"](data);

            expect(component["listePartiesSimples"]).toEqual(data.listeParties);
            expect(component["listePartiesMultiples"]).toEqual([]);
        });
        it("devrait assigner la listePartie de data à ListePartieMultiple si isSimple == false", () => {
            const data = { listeParties: [ new PartieMultiple("", new Array<TempsUser>(), new Array<TempsUser>(),
                                                              Buffer.from(new Array()), Buffer.from(new Array()),
                                                              Buffer.from(new Array()), Buffer.from(new Array()),
                                                              new Array<Array<string>>(), new Array<Array<string>>(),
                                                              10, "", "123") ] };
            component["isSimple"] = false;

            component["setListeParties"](data);

            expect(component["listePartiesMultiples"]).toEqual(data.listeParties);
            expect(component["listePartiesSimples"]).toEqual([]);
        });
    });
});
