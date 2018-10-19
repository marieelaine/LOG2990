import { Component } from '@angular/core';
import { ListePartiesComponent } from '../liste-parties.component';
import { Router } from '@angular/router';
import {ListePartieServiceService} from "../liste-partie-service.service";
import { PartieSimple } from '../../admin/dialog-simple/partie-simple';

export interface PartieSimpleInterface {
  title: string;
  image1Path: string;
  image2Path: string;
  timesSolo: number[];
  timesOneVsOne: number[];
  isElevatedActive: boolean;
  idPartie: number;
  _id: string;
}

@Component({
  selector: 'app-liste-partie-simple',
  templateUrl: './liste-partie-simple.component.html',
  styleUrls: ['./liste-partie-simple.component.css']
})
export class ListePartieSimpleComponent extends ListePartiesComponent {

  constructor(public router: Router,
              public listePartieService: ListePartieServiceService) {
    super(router, listePartieService);
    console.log(this.listePartieService);
    console.log('helloo');
    this.listePartieService.getListeImageSimple().subscribe((res: PartieSimple) => {console.log(res.username); });
  }

  public onJouerOuReinitialiserClick(): void {
    if (this.isListePartiesMode) {
      this.router.navigate(["/partie-solo"]);
    } else if (this.isAdminMode) {
      this.reinitialiserTemps();
    }
  }

  private reinitialiserTemps(): void {
    // Reinitialiser les temps de la parties
  }

  protected onCreerOuSupprimerClick(): void {
    if (this.isListePartiesMode) {
      // Naviguer vers partie-multijouer
    } else if (this.isAdminMode) {
      this.supprimerPartie();
    }
  }

  private supprimerPartie(): void {
    // Supprimer la partie
  }

}
