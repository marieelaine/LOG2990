import { Component, OnInit, ErrorHandler } from '@angular/core';
import { ListePartiesComponent } from '../liste-parties.component';
import { Router } from '@angular/router';
import { ListePartieServiceService } from "../liste-partie-service.service";
import { PartieMultiple } from 'src/app/admin/dialog-multiple/partie-multiple';
import { DialogConfirmationComponent } from '../dialog-confirmation/dialog-confirmation.component';
import { MatDialog } from '@angular/material';
import { SocketClientService } from 'src/app/socket/socket-client.service';
import * as event from "../../../../../common/communication/evenementsSocket";

@Component({
  selector: 'app-liste-partie-multiple',
  templateUrl: './liste-partie-multiple.component.html',
  styleUrls: ['./liste-partie-multiple.component.css'],
  providers: [SocketClientService]
})
export class ListePartieMultipleComponent extends ListePartiesComponent implements OnInit {

  protected listeParties: PartieMultiple[];

  public constructor(public router: Router,
                     public listePartieService: ListePartieServiceService,
                     public socketClientService: SocketClientService,
                     private dialog: MatDialog) {
    super(router, listePartieService);
  }

  public ngOnInit() {
    this.listePartieService.getListePartieMultiple().subscribe((res: PartieMultiple[]) => {
      this.listeParties = res;
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

  protected onCreerOuSupprimerClick(partieId: string): void {
      if (this.isListePartiesMode) {
        // Naviguer vers partie-multijoueur
      } else if (this.isAdminMode) {
        this.ouvrirDialog(partieId);
      }
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
        this.genererTableauTempsAleatoires(partie);
        this.listePartieService.reinitialiserTempsPartieMultiple(partieId, partie["_tempsSolo"], partie["_tempsUnContreUn"])
        .catch(() => ErrorHandler);
      }
    });
  }

  private ajouterPartieSurSocketEvent() {
    this.socketClientService.socket.on(event.ENVOYER_PARTIE_MULTIPLE, (data) => {
      this.listeParties.push(data);
    });
  }
}
