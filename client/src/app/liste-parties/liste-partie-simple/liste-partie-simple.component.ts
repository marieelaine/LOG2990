import { Component, OnInit, ErrorHandler } from "@angular/core";
import { ListePartiesComponent } from "../liste-parties.component";
import { Router } from "@angular/router";
import { ListePartieServiceService } from "../liste-partie-service.service";
import { PartieSimple } from "../../admin/dialog-simple/partie-simple";
import { MatDialog } from "@angular/material";
import { DialogConfirmationComponent } from "../dialog-confirmation/dialog-confirmation.component";
import { SocketClientService } from "src/app/socket/socket-client.service";
import * as event from "../../../../../common/communication/evenementsSocket";
import { DialogVueAttenteComponent } from "../dialog-vue-attente/dialog-vue-attente.component";

@Component({
  selector: "app-liste-partie-simple",
  templateUrl: "./liste-partie-simple.component.html",
  styleUrls: ["./liste-partie-simple.component.css"],
  providers: [SocketClientService]
})

export class ListePartieSimpleComponent extends ListePartiesComponent implements OnInit {

  protected listeParties: PartieSimple[];

  constructor(public router: Router,
              public listePartieService: ListePartieServiceService,
              private dialog: MatDialog,
              public socketClientService: SocketClientService) {
    super(router, listePartieService);
  }

  public async ngOnInit() {
    this.listePartieService.getListePartieSimple().subscribe((res: PartieSimple[]) => {
      this.listeParties = res;
    });
    this.ajouterPartieSurSocketEvent();

  }

  protected afficherImage(id: string) {
    this.ajusterImage(id, this.listeParties, true);
  }

  protected onJouerOuReinitialiserClick(partieId: string): void {
    if (this.isListePartiesMode) {
      this.router.navigate(["/partie-simple-solo/" + partieId])
      .catch(() => ErrorHandler);
    } else if (this.isAdminMode) {
      this.reinitialiserTemps(partieId);
    }
  }

  protected onCreerOuSupprimerClick(partieId: string): void {
    if (this.isListePartiesMode) {
      this.ouvrirDialogVueAttente();
      this.router.navigate(["/partie-simple-multijoueur/" + partieId])
      .catch(() => ErrorHandler);
    } else if (this.isAdminMode) {
      this.ouvrirDialogConfirmation(partieId);
      // TODO changer le bouton creer pour join
    }
  }

  private ouvrirDialogVueAttente() {
    this.dialog.open(DialogVueAttenteComponent, {
      height: "220px",
      width: "600px"
    });
  }

  private ouvrirDialogConfirmation(partieId: string): void {
    this.dialog.open(DialogConfirmationComponent, {
      height: "190px",
      width: "600px",
      data: { id: partieId,
              listeParties: this.listeParties,
              isSimple: true}
    });
  }

  protected reinitialiserTemps(partieId: string): void {
    this.listeParties.forEach((partie: PartieSimple) => {
      if (partie["_id"] === partieId) {
       this.genererTableauTempsAleatoires(partie);
       this.listePartieService.reinitialiserTempsPartie(partieId, partie["_tempsSolo"], partie["_tempsUnContreUn"])
       .catch(() => ErrorHandler);
      }
    });
  }

  private ajouterPartieSurSocketEvent() {
    this.socketClientService.socket.on(event.ENVOYER_PARTIE_SIMPLE, (data) => {
      this.listeParties.push(data);
    });
  }
}
