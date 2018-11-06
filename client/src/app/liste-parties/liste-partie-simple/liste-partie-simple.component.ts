import { Component, OnInit, ErrorHandler } from "@angular/core";
import { ListePartiesComponent } from "../liste-parties.component";
import { Router } from "@angular/router";
import { ListePartieServiceService } from "../liste-partie-service.service";
import { PartieSimple } from "../../admin/dialog-simple/partie-simple";
import { MatDialog } from "@angular/material";
import { DialogConfirmationComponent } from "../dialog-confirmation/dialog-confirmation.component";

@Component({
  selector: "app-liste-partie-simple",
  templateUrl: "./liste-partie-simple.component.html",
  styleUrls: ["./liste-partie-simple.component.css"]
})
export class ListePartieSimpleComponent extends ListePartiesComponent implements OnInit {

  protected listeParties: PartieSimple[];

  constructor(public router: Router,
              public listePartieService: ListePartieServiceService,
              private dialog: MatDialog) {
    super(router, listePartieService);
  }

  public async ngOnInit() {
    this.listePartieService.getListePartieSimple().subscribe((res: PartieSimple[]) => {
      this.listeParties = res;
    });
  }

  protected afficherImage(id: string) {
    this.ajusterImage(id, this.listeParties, true);
  }

  protected onJouerOuReinitialiserClick(partieId: string): void {
    if (this.isListePartiesMode) {
      this.router.navigate(["/partie-solo/" + partieId])
      .catch(() => ErrorHandler);
    } else if (this.isAdminMode) {
      this.reinitialiserTemps(partieId);
    }
  }

  protected onCreerOuSupprimerClick(partieId: string): void {
    if (this.isListePartiesMode) {
        this.router.navigate(["/partie-multi/" + partieId])
        .catch(() => ErrorHandler);
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
              isSimple: true}
    });
  }

  // protected supprimerPartieDeLaffichage(partieId: string): void {
  //   for (let i = 0 ; i < this.listeParties.length ; i++) {
  //     if (this.listeParties[i]["_id"] === partieId) {
  //       this.listeParties.splice(i, 1);
  //     }
  //   }
  // }

  protected reinitialiserTemps(partieId: string): void {
    this.listeParties.forEach((partie: PartieSimple) => {
      if (partie["_id"] === partieId) {
       this.genererTableauTempsAleatoires(partie);
       this.listePartieService.reinitialiserTempsPartie(partieId, partie["_tempsSolo"], partie["_tempsUnContreUn"])
       .catch(() => ErrorHandler);
      }
    });
  }
}
