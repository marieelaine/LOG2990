import { ComponentFixture, TestBed } from "@angular/core/testing";
import { DialogVueAttenteComponent } from "./dialog-vue-attente.component";
import { MatDividerModule, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { SocketClientService } from "src/app/socket/socket-client.service";
import { ListePartieServiceService } from "../liste-partie-service.service";

describe("DialogVueAttenteComponent", () => {
    const dialogMock = {
        disableClose: true,
        close: () => { }
    };

    let mockListePartieService: jasmine.SpyObj<ListePartieServiceService>;

    let component: DialogVueAttenteComponent;
    let fixture: ComponentFixture<DialogVueAttenteComponent>;

    beforeEach(() => {
        mockListePartieService = jasmine.createSpyObj([
            "deletePartieSimpleEnAttente",
        ]);

        TestBed.configureTestingModule({
            declarations: [DialogVueAttenteComponent],
            imports: [
                MatDividerModule,
                HttpClientTestingModule,
                RouterTestingModule,
            ],
            providers: [
                { provide: MatDialogRef, useValue: dialogMock },
                { provide: MAT_DIALOG_DATA, useValue: {} },
                SocketClientService,
                { provide: ListePartieServiceService, useValue: mockListePartieService },
            ]
        });

        fixture = TestBed.createComponent(DialogVueAttenteComponent);
        component = fixture.componentInstance;
    });

    it("Devrait créer le composant", () => {
        expect(component).toBeTruthy();
    });

    describe("Constructeur", () => {
        it("Devrait initialiser l'attribut message avec la bonne valeur", () => {
            expect(component["message"]).toEqual("En attente d'un adversaire");
        });

        it("Devrait initialiser l'attribut isEnAttente à vrai", () => {
            expect(component["isEnAttente"]).toBeTruthy();
        });

        it("Devrait initialiser l'attribut disableClose de l'objet dialogRef à vrai", () => {
            expect(component.dialogRef.disableClose).toBeTruthy();
        });
    });

    describe("Fonction ajouterPartieSurSocket", () => {
        it("Devrait appeller la fonction on de socket lors de l'appel de la fonction", () => {
            // Arrange
            const spySocket: jasmine.Spy = spyOn(component.socketClientService.socket, "on");

            // Act
            component["ajouterPartieSurSocket"]();

            // Assert
            expect(spySocket).toHaveBeenCalledTimes(1);
        });
    });

    describe("Fonction setMessageErreur", () => {
        it("Devrait mettre la bonne valeur dans l'attribut message", () => {
            // Arrange
            const messageInitial: string = component["message"];

            // Act
            component["setMessageErreur"]();

            // Assert
            expect(component["message"]).not.toEqual(messageInitial);
            expect(component["message"]).toEqual("Erreur : cette partie n'existe plus!");
        });
    });
});
