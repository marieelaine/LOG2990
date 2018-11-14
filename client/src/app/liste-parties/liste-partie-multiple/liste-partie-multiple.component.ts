import { Component, OnInit, ErrorHandler } from '@angular/core';
import { ListePartiesComponent } from '../liste-parties.component';
import { Router } from '@angular/router';
import { ListePartieServiceService } from "../liste-partie-service.service";
import { PartieMultiple } from 'src/app/admin/dialog-multiple/partie-multiple';
import { DialogConfirmationComponent } from '../dialog-confirmation/dialog-confirmation.component';
import { MatDialog } from '@angular/material';
import { SocketClientService } from 'src/app/socket/socket-client.service';
import * as event from "../../../../../common/communication/evenementsSocket";
import { DialogVueAttenteComponent } from '../dialog-vue-attente/dialog-vue-attente.component';

@Component({
  selector: 'app-liste-partie-multiple',
  templateUrl: './liste-partie-multiple.component.html',
  styleUrls: ['./liste-partie-multiple.component.css'],
  providers: [SocketClientService]
})
export class ListePartieMultipleComponent extends ListePartiesComponent implements OnInit {

  protected listeParties: PartieMultiple[];
  protected listePartieEnAttente: string[];

  public constructor(public router: Router,
                     public listePartieService: ListePartieServiceService,
                     public socketClientService: SocketClientService,
                     private dialog: MatDialog) {
    super(router, listePartieService);
    this.listeParties = [];
  }

  public ngOnInit() {
    this.listePartieService.getListePartieMultiple().subscribe((res: PartieMultiple[]) => {
      this.listeParties = res;
    });
    this.listePartieService.getListePartieSimpleEnAttente().subscribe((res: string[]) => {
      this.listePartieEnAttente = res;
    });
    this.ajouterPartieSurSocketEvent();
  }

  protected afficherImage(id: string) {
    this.ajusterImage(id, this.listeParties, false);
  }

  protected onJouerOuReinitialiserClick(partieId: string): void {
      if (this.isListePartiesMode) {
        this.router.navigate(["/partie-multiple/" + partieId])
        .catch(() => ErrorHandler);
      } else if (this.isAdminMode) {
        this.reinitialiserTemps(partieId);
      }
    }

  protected async onCreerOuSupprimerClick(partieId: string): Promise<void> {
      if (this.isListePartiesMode) {
        await this.listePartieService.addPartieMultipleEnAttente(partieId).subscribe(() => {
          this.ouvrirDialogVueAttente(partieId);
          this.router.navigate(["/partie-multiple-solo/" + partieId])
          .catch(() => ErrorHandler);
        });

      } else if (this.isAdminMode) {
        this.ouvrirDialogConfirmation(partieId);
      }
    }

  private ouvrirDialogVueAttente(partieId: string) {
    this.dialog.open(DialogVueAttenteComponent, {
      height: "220px",
      width: "600px",
      data : { id: partieId }
    });
  }

  private ouvrirDialogConfirmation(partieId: string): void {
      this.dialog.open(DialogConfirmationComponent, {
        height: "190px",
        width: "600px",
        data: { id: partieId,
                listeParties: this.listeParties,
                isSimple: false}
      });
    }

  protected supprimerPartie(partieId: string): void {
    for (let i = 0 ; i < this.listeParties.length ; i++) {
      if (this.listeParties[i]["_id"]  === partieId) {
        this.listeParties.splice(i, 1);
      }
    }
    this.listePartieService.deletePartieMultiple(partieId)
    .catch(() => ErrorHandler);
  }

  protected reinitialiserTemps(partieId: string): void {
    this.listeParties.forEach((partie: PartieMultiple) => {
      if (partie["_id"] === partieId) {
        partie["_tempsSolo"] = this.genererTableauTempsAleatoires();
        partie["_tempsUnContreUn"] = this.genererTableauTempsAleatoires();
        this.listePartieService.reinitialiserTempsPartieMultiple(partieId, partie["_tempsSolo"], partie["_tempsUnContreUn"])
        .catch(() => ErrorHandler);
      }
    });
  }

  private ajouterPartieSurSocketEvent() {
    this.socketClientService.socket.on(event.ENVOYER_PARTIE_MULTIPLE, (data) => {
      this.listeParties.push(data);
    });
    this.socketClientService.socket.on(event.ENVOYER_PARTIE_MULTIPLE_ATTENTE, (data) => {
      this.listePartieEnAttente.push(data);
    });
    this.socketClientService.socket.on(event.DELETE_PARTIE_MULTIPLE_ATTENTE, (data) => {
      for (let i: number = 0 ; i < this.listePartieEnAttente.length ; i++) {
        if (this.listePartieEnAttente[i] === data) {
          this.listePartieEnAttente.splice(i, 1);
        }
      }
    });
  }

  private ouvrirDialog(partieId: string): void {
    this.dialog.open(DialogConfirmationComponent, {
      height: "190px",
      width: "600px",
      data: { id: partieId,
              listeParties: this.listeParties,
              isSimple: false}
    });
  }
}
