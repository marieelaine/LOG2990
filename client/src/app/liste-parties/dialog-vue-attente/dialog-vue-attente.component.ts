import {Component, ErrorHandler, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Router, Data } from "@angular/router";
import { ListePartieServiceService } from "../liste-partie-service.service";
import { SocketClientService } from "src/app/socket/socket-client.service";
import * as event from "../../../../../common/communication/evenementsSocket";

const ATTENTE_ADVERSAIRE: string = "En attente d'un adversaire";
const PARTIE_INEXISTANTE: string = "Erreur : cette partie n'existe plus!";
const URL_PARTIE_SIMPLE: string = "/partie-simple/";
const URL_PARTIE_MULTIPLE: string = "/partie-multiple/";
const URL_SLASH: string = "/";
const EVENTLISTENER_TYPE: string = "beforeunload";

@Component({
    selector: "app-dialog-vue-attente",
    templateUrl: "./dialog-vue-attente.component.html",
    styleUrls: ["./dialog-vue-attente.component.css"],
})

export class DialogVueAttenteComponent {

    private partieId: string;
    protected message: string;
    protected estEnAttente: boolean;
    private estSimple: boolean;

    public constructor(
        public dialogRef: MatDialogRef<DialogVueAttenteComponent>,
        public router: Router,
        public listePartieService: ListePartieServiceService,
        public socketClientService: SocketClientService,
        @Inject(MAT_DIALOG_DATA) data: Data
    ) {
        this.partieId = data.id;
        this.estSimple = data.isSimple;
        dialogRef.disableClose = true;
        this.ajouterPartieSurSocket();
        this.estEnAttente = true;
        this.changementPage();
        this.message = ATTENTE_ADVERSAIRE;
    }

    protected fermerDialog(): void {
        this.dialogRef.close();
        this.estSimple ? this.supprimerPartieSimpleAttente() : this.supprimerPartieMultipleAttente();
    }

    private supprimerPartieSimpleAttente(): void {
        this.listePartieService.supprimerPartieSimpleEnAttente(this.partieId).subscribe(async (res) => {
            this.dialogRef.close();
            await this.listePartieService.dialogAttenteSimpleFerme();
        });
    }

    private supprimerPartieMultipleAttente(): void {
        this.listePartieService.supprimerPartieMultipleEnAttente(this.partieId).subscribe(async (res) => {
            this.dialogRef.close();
            await this.listePartieService.dialogAttenteMultipleFerme();
        });
    }

    private setMessageDialog(): void {
        this.message = PARTIE_INEXISTANTE;
    }

    private setMessageErreur(data: string): void {
        if (this.partieId === data) {
            this.estEnAttente = false;
            this.setMessageDialog();
        }
    }

    private ajouterPartieSurSocket(): void {
        this.socketClientService.socket.on(event.DELETE_PARTIE_SIMPLE, (data: string) => {
            this.setMessageErreur(data);
        });

        this.socketClientService.socket.on(event.DELETE_PARTIE_MULTIPLE, (data: string) => {
            this.setMessageErreur(data);
        });

        this.socketClientService.socket.on(event.JOINDRE_PARTIE_MULTIJOUEUR_SIMPLE, (data) => {
            if (data.partieId === this.partieId) {
                this.listePartieService.supprimerPartieSimpleEnAttente(this.partieId).subscribe((res) => {
                    this.dialogRef.close();
                    this.router.navigate([URL_PARTIE_SIMPLE + data.partieId + URL_SLASH + data.channelId])
                    .catch(() => ErrorHandler);
                });
            }
        });

        this.socketClientService.socket.on(event.JOINDRE_PARTIE_MULTIJOUEUR_MULTIPLE, (data) => {
            if (data.partieId === this.partieId) {
                this.listePartieService.supprimerPartieMultipleEnAttente(this.partieId).subscribe((res) => {
                this.dialogRef.close();
                this.router.navigate([URL_PARTIE_MULTIPLE + data.partieId + URL_SLASH + data.channelId])
                .catch(() => ErrorHandler);
                });
            }
        });
    }

    private changementPage(): void {
        window.addEventListener(EVENTLISTENER_TYPE, () => {
            this.estSimple ? this.supprimerPartieSimpleAttente() : this.supprimerPartieMultipleAttente();
        });
    }
}
