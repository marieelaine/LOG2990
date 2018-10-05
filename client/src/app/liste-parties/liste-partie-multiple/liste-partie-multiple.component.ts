import { Component } from '@angular/core';
import { ListePartiesComponent } from '../liste-parties.component';
import { ListePartieAbstraiteClass } from '../liste-partie-abstraite';
import { Router } from '@angular/router';

export interface ListePartieMultipleInterface {
  title: String;
  imagePath: String;
  timesSolo: number[];
  timesOneVsOne: number[];
  isElevatedActive: boolean;
}

@Component({
  selector: 'app-liste-partie-multiple',
  templateUrl: './liste-partie-multiple.component.html',
  styleUrls: ['./liste-partie-multiple.component.css']
})
export class ListePartieMultipleComponent extends ListePartieAbstraiteClass {

  listeParties = new ListePartiesComponent().listePartiesMultiples;

  constructor(router: Router) {
    super(router);
  }
}
