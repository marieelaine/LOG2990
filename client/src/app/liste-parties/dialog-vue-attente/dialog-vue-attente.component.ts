import {Component, ErrorHandler, Inject, OnDestroy} from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Router, Data } from "@angular/router";
import { ListePartieServiceService } from "../liste-partie-service.service";
import { SocketClientService } from "src/app/socket/socket-client.service";
import * as event from "../../../../../common/communication/evenementsSocket";
import { Subscription } from "rxjs";

@Component({
    selector: "app-dialog-vue-attente",
    templateUrl: "./dialog-vue-attente.component.html",
    styleUrls: ["./dialog-vue-attente.component.css"]
})

export class DialogVueAttenteComponent implements OnDestroy {

    private partieId: string;
    private souscriptionDeletePartieSimpleAttente: Subscription;
    protected message: string;
    protected isEnAttente: boolean;

    public constructor(
        public dialogRef: MatDialogRef<DialogVueAttenteComponent>,
        public router: Router,
        public listePartieService: ListePartieServiceService,
        public socketClientService: SocketClientService,
        @Inject(MAT_DIALOG_DATA) data: Data
    ) {
        this.partieId = data.id;
        dialogRef.disableClose = true;
        this.ajouterPartieSurSocket();
        this.message = "En attente d'un adversaire";
        this.isEnAttente = true;
    }

    public ngOnDestroy(): void {
        if (this.souscriptionDeletePartieSimpleAttente) {
            this.listePartieService.deletePartieSimpleEnAttente(this.partieId).subscribe((res) => {
                this.router.navigate(["/liste-parties/"]).catch(() => ErrorHandler);
                this.dialogRef.close();
                this.socketClientService.socket.emit(event.DIALOG_ATTENTE_FERME);
            });
        }
    }

    protected onDialogClose(): void {
        this.souscriptionDeletePartieSimpleAttente = this.listePartieService.deletePartieSimpleEnAttente(this.partieId).subscribe((res) => {
            this.router.navigate(["/liste-parties/"]).catch(() => ErrorHandler);
            this.dialogRef.close();
            this.socketClientService.socket.emit(event.DIALOG_ATTENTE_FERME);
        });
    }

    private setMessageDialog(): void {
        this.message = "Erreur : cette partie n'existe plus!";
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
                    this.router.navigate(["/partie-simple/" + data.partieId + "/" + data.channelId])
                    .catch(() => ErrorHandler);
                });
            }
        });

        this.socketClientService.socket.on(event.JOINDRE_PARTIE_MULTIJOUEUR_MULTIPLE, (data) => {
            if (data.partieId === this.partieId) {
                this.listePartieService.deletePartieMultipleEnAttente(this.partieId).subscribe((res) => {
                this.dialogRef.close();
                this.router.navigate(["/partie-multiple/" + data.partieId + "/" + data.channelId])
                .catch(() => ErrorHandler);
                });
            }
        });
    }
}
