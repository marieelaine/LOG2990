import {Component, ErrorHandler, Inject, OnDestroy} from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Router, Data } from "@angular/router";
import { ListePartieServiceService } from "../liste-partie-service.service";
import { SocketClientService } from "src/app/socket/socket-client.service";
import * as event from "../../../../../common/communication/evenementsSocket";

const ATTENTE_ADVERSAIRE: string = "En attente d'un adversaire";
const URL_LISTE_PARTIE: string = "/liste-parties/";
const PARTIE_INEXISTANTE: string = "Erreur : cette partie n'existe plus!";
const URL_PARTIE_SIMPLE: string = "/partie-simple/";
const URL_PARTIE_MULTIPLE: string = "/partie-multiple/";
const URL_SLASH: string = "/";

@Component({
    selector: "app-dialog-vue-attente",
    templateUrl: "./dialog-vue-attente.component.html",
    styleUrls: ["./dialog-vue-attente.component.css"]
})

export class DialogVueAttenteComponent implements OnDestroy {

    private partieId: string;
    protected message: string;
    protected isEnAttente: boolean;
    private isSimple: boolean;

    public constructor(
        public dialogRef: MatDialogRef<DialogVueAttenteComponent>,
        public router: Router,
        public listePartieService: ListePartieServiceService,
        public socketClientService: SocketClientService,
        @Inject(MAT_DIALOG_DATA) data: Data
    ) {
        this.partieId = data.id;
        this.isSimple = data.isSimple;
        dialogRef.disableClose = true;
        this.ajouterPartieSurSocket();
        this.message = ATTENTE_ADVERSAIRE;
        this.isEnAttente = true;
    }

    public ngOnDestroy(): void {
        this.isSimple ? this.deletePartieSimpleAttente() : this.deletePartieMultipleAttente();
    }

    protected onDialogClose(): void {
        this.dialogRef.close();
        this.router.navigate([URL_LISTE_PARTIE]).catch(() => ErrorHandler);
    }

    private deletePartieSimpleAttente(): void {
        this.listePartieService.deletePartieSimpleEnAttente(this.partieId).subscribe(async (res) => {
            this.dialogRef.close();
            await this.listePartieService.dialogAttenteSimpleFerme();
        });
    }

    private deletePartieMultipleAttente(): void {
        this.listePartieService.deletePartieMultipleEnAttente(this.partieId).subscribe(async (res) => {
            this.dialogRef.close();
            await this.listePartieService.dialogAttenteMultipleFerme();
        });
    }

    private setMessageDialog(): void {
        this.message = PARTIE_INEXISTANTE;
    }

    private setMessageErreur(data: string): void {
        if (this.partieId === data) {
            this.isEnAttente = false;
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
                this.listePartieService.deletePartieSimpleEnAttente(this.partieId).subscribe((res) => {
                    this.dialogRef.close();
                    this.router.navigate([URL_PARTIE_SIMPLE + data.partieId + URL_SLASH + data.channelId])
                    .catch(() => ErrorHandler);
                });
            }
        });

        this.socketClientService.socket.on(event.JOINDRE_PARTIE_MULTIJOUEUR_MULTIPLE, (data) => {
            if (data.partieId === this.partieId) {
                this.listePartieService.deletePartieMultipleEnAttente(this.partieId).subscribe((res) => {
                this.dialogRef.close();
                this.router.navigate([URL_PARTIE_MULTIPLE + data.partieId + URL_SLASH + data.channelId])
                .catch(() => ErrorHandler);
                });
            }
        });
    }
}
