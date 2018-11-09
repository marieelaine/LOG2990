import { Component, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { ListePartieServiceService } from "../liste-partie-service.service";
import { SocketClientService } from 'src/app/socket/socket-client.service';
import * as event from "../../../../../common/communication/evenementsSocket";

@Component({
  selector: 'app-dialog-vue-attente',
  templateUrl: './dialog-vue-attente.component.html',
  styleUrls: ['./dialog-vue-attente.component.css']
})

export class DialogVueAttenteComponent implements OnDestroy {

  private partieId: string;
  protected message: string;
  protected isEnAttente: boolean;

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
    this.message =  "En attente d'un adversaire";
    this.isEnAttente = true;
  }

  ngOnDestroy(): void {
    this.listePartieService.deletePartieSimpleEnAttente(this.partieId).subscribe((res) => {
      this.router.navigate(["/liste-parties/"]);
      this.dialogRef.close();
     });
  }

  protected onDialogClose(): void {
    this.listePartieService.deletePartieSimpleEnAttente(this.partieId).subscribe((res) => {
      this.router.navigate(["/liste-parties/"]);
      this.dialogRef.close();
    });
  }

  private setMessageErreur() {
    this.message = "Erreur : cette partie n'existe plus!";
  }

  private ajouterPartieSurSocket() {
    this.socketClientService.socket.on(event.DELETE_PARTIE_SIMPLE, (data) => {
      if (this.partieId === data) {
        this.isEnAttente = false;
        this.setMessageErreur();
      }
    });
  }

}
