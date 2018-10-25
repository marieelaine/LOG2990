import { Component, OnInit } from '@angular/core';
import { ListePartiesComponent } from '../liste-parties.component';
import { Router } from '@angular/router';
import {ListePartieServiceService} from "../liste-partie-service.service";
import { PartieMultiple } from 'src/app/admin/dialog-multiple/partie-mutiple';

export interface PartieMultipleInterface {
  title: String;
  imagePath: String;
  timesSolo: number[];
  timesOneVsOne: number[];
  isElevatedActive: boolean;
  idPartie: number;
}

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

  ngOnInit() {

  }
  protected supprimerPartie(partieId: string): void {
    // for (let i = 0 ; i < this.listeParties.length ; i++) {
    //   if (this.listeParties[i]._id === partieId) {
    //     this.listeParties.splice(i, 1);
    //   }
    // }
    // this.listePartieService.deletePartieSimple(partieId);
  }

  protected reinitialiserTemps(partieId: string): void {
    // this.listeParties.forEach((partie: PartieMultiple) => {
    //   if (partie._id === partieId) {
    //     for (let i = 0 ; i < partie._tempsSolo.length ; i++) {
    //       partie._tempsSolo[i] = Math.floor(Math.random() * 400) + 100;
    //     }
    //     for (let i = 0 ; i < partie._tempsUnContreUn.length ; i++) {
    //       partie._tempsUnContreUn[i] = Math.floor(Math.random() * 400) + 100;
    //     }
    //   }
    // });
    // this.listePartieService.reinitialiserTempsPartie(partieId);
  }
}
