import { Component, OnInit } from '@angular/core';
import { ListePartiesComponent } from '../liste-parties.component';
import { Router } from '@angular/router';
import { ListePartieServiceService } from "../liste-partie-service.service";
import { PartieMultiple } from 'src/app/admin/dialog-multiple/partie-mutiple';

@Component({
  selector: 'app-liste-partie-multiple',
  templateUrl: './liste-partie-multiple.component.html',
  styleUrls: ['./liste-partie-multiple.component.css']
})
export class ListePartieMultipleComponent extends ListePartiesComponent implements OnInit {

  protected listeParties: PartieMultiple[];

  constructor(public router: Router,
              public listePartieService: ListePartieServiceService) {
    super(router, listePartieService);
  }

  public ngOnInit() {
    this.listePartieService.getListePartieMultiple().subscribe((res: PartieMultiple[]) => {
      this.listeParties = res;
      console.log(res);
    });
  }

  protected afficherImage(id: string) {
    this.ajusterImage(id, this.listeParties, false);
  }

  protected onJouerOuReinitialiserClick(partieId: string): void {
      if (this.isListePartiesMode) {
        this.router.navigate(["/partie-multiple/" + partieId]);
      } else if (this.isAdminMode) {
        this.reinitialiserTemps(partieId);
      }
    }

  protected onCreerOuSupprimerClick(partieId: string): void {
      if (this.isListePartiesMode) {
        // Naviguer vers partie-multiple
      } else if (this.isAdminMode) {
        this.supprimerPartie(partieId);
      }
    }

  protected supprimerPartie(partieId: string): void {
    for (let i = 0 ; i < this.listeParties.length ; i++) {
      if (this.listeParties[i]["_id"]  === partieId) {
        this.listeParties.splice(i, 1);
      }
    }
    this.listePartieService.deletePartieMultiple(partieId);
  }

  protected reinitialiserTemps(partieId: string): void {
    this.listeParties.forEach((partie: PartieMultiple) => {
      if (partie["_id"] === partieId) {
        this.genererTableauTempsAleatoires(partie);
      }
    });
    this.listePartieService.reinitialiserTempsPartie(partieId);
  }
}
