import {Component, ErrorHandler, Inject, OnDestroy} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { ListePartieServiceService } from "../liste-partie-service.service";
import { SocketClientService } from 'src/app/socket/socket-client.service';
import * as event from "../../../../../common/communication/evenementsSocket";
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-dialog-vue-attente',
    templateUrl: './dialog-vue-attente.component.html',
    styleUrls: ['./dialog-vue-attente.component.css']
})

export class DialogVueAttenteComponent implements OnDestroy {

    private partieId: string;
    protected message: string;
    protected isEnAttente: boolean;
    private souscriptionDeletePartieSimpleAttente: Subscription;

    constructor(
        public dialogRef: MatDialogRef<DialogVueAttenteComponent>,
        public router: Router,
        public listePartieService: ListePartieServiceService,
        public socketClientService: SocketClientService,
        @Inject(MAT_DIALOG_DATA) data
    ) {
        this.partieId = data.id;
        dialogRef.disableClose = true;
        this.ajouterPartieSurSocket();
        this.message = "En attente d'un adversaire";
        this.isEnAttente = true;
    }

    ngOnDestroy(): void {
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

    private setMessageErreur(): void {
        this.message = "Erreur : cette partie n'existe plus!";
    }

    private ajouterPartieSurSocket(): void {
        this.socketClientService.socket.on(event.DELETE_PARTIE_SIMPLE, (data: string) => {
            if (this.partieId === data) {
                this.isEnAttente = false;
                this.setMessageErreur();
            }
        });
    }

}
