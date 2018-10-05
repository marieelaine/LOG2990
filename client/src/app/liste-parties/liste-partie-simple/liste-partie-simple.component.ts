import { Component } from '@angular/core';
import { ListePartiesComponent } from '../liste-parties.component';
import { Router } from '@angular/router';

export interface ListePartieSimpleInterface {
  title: String;
  imagePath: String;
  timesSolo: number[];
  timesOneVsOne: number[];
  isElevatedActive: boolean;
}

@Component({
  selector: 'app-liste-partie-simple',
  templateUrl: './liste-partie-simple.component.html',
  styleUrls: ['./liste-partie-simple.component.css']
})
export class ListePartieSimpleComponent extends ListePartiesComponent {

  constructor(private router: Router) {
    super(router);
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
