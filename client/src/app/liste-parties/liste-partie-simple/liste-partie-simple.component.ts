import { Component, OnInit } from "@angular/core";
import { ListePartiesComponent } from "../liste-parties.component";
import { Router } from "@angular/router";
import {ListePartieServiceService} from "../liste-partie-service.service";
import { PartieSimple } from "../../admin/dialog-simple/partie-simple";

@Component({
  selector: "app-liste-partie-simple",
  templateUrl: "./liste-partie-simple.component.html",
  styleUrls: ["./liste-partie-simple.component.css"]
})
export class ListePartieSimpleComponent extends ListePartiesComponent implements OnInit {

  protected listeParties: PartieSimple[];

  constructor(public router: Router,
              public listePartieService: ListePartieServiceService) {
    super(router, listePartieService);
  }

  public ngOnInit() {
    this.listePartieService.getListeImageSimple().subscribe((res: PartieSimple[]) => {
      this.listeParties = res;
    });
  }

  public onJouerOuReinitialiserClick(): void {
    if (this.isListePartiesMode) {
      this.router.navigate(["/partie-solo"]);
    } else if (this.isAdminMode) {
      this.reinitialiserTemps();
    }
  }

  protected onCreerOuSupprimerClick(partieId: string): void {
    if (this.isListePartiesMode) {
      // Naviguer vers partie-multijouer
    } else if (this.isAdminMode) {
      this.supprimerPartie(partieId);
    }
  }

  protected supprimerPartie(partieId: string): void {
    this.listePartieService.deletePartieSimple(partieId);
  }

  private reinitialiserTemps(): void {
    // Reinitialiser les temps de la parties
  }

}
