import { ComponentFixture, TestBed } from "@angular/core/testing";
import { DialogVueAttenteComponent } from "./dialog-vue-attente.component";
import { MatDividerModule, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { SocketClientService } from "src/app/socket/socket-client.service";
import { ListePartieServiceService } from "../liste-partie-service.service";

describe("DialogVueAttenteComponent", () => {

    let mockListePartieService: jasmine.SpyObj<ListePartieServiceService>;

    let component: DialogVueAttenteComponent;
    let fixture: ComponentFixture<DialogVueAttenteComponent>;

    beforeEach(() => {
        mockListePartieService = jasmine.createSpyObj([
            "supprimerPartieSimpleEnAttente",
            "supprimerPartieMultipleEnAttente"
        ]);

        TestBed.configureTestingModule({
            declarations: [DialogVueAttenteComponent],
            imports: [
                MatDividerModule,
                HttpClientTestingModule,
                RouterTestingModule,
            ],
            providers: [
                { provide: MatDialogRef, useValue: {} },
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

        it("Devrait initialiser l'attribut estEnAttente à vrai", () => {
            expect(component["estEnAttente"]).toBeTruthy();
        });

        it("Devrait initialiser l'attribut disableClose de l'objet dialogRef à vrai", () => {
            expect(component.dialogRef.disableClose).toBeTruthy();
        });
    });

    describe("Fonction ajouterPartieSurSocket", () => {
        it("Devrait appeler la fonction on de socket lors de l'appel de la fonction", () => {
            const spySocket: jasmine.Spy = spyOn(component.socketClientService.socket, "on");
            const nbCalls: number = 4;

            component["ajouterPartieSurSocket"]();

            expect(spySocket).toHaveBeenCalledTimes(nbCalls);
        });
    });

    describe("Fonction setMessageErreur", () => {
        it("Devrait mettre la bonne valeur dans l'attribut message", () => {
            const messageInitial: string = component["message"];

            component["setMessageDialog"]();

            expect(component["message"]).not.toEqual(messageInitial);
            expect(component["message"]).toEqual("Erreur : cette partie n'existe plus!");
        });
    });
});
