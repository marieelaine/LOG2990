import { Component } from '@angular/core';
import { ListePartiesComponent } from '../liste-parties.component';
import { ListePartieAbstraiteClass } from '../liste-partie-abstraite';
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
export class ListePartieSimpleComponent extends ListePartieAbstraiteClass {

  listeParties = new ListePartiesComponent().listePartiesSimples;

  constructor(router: Router) {
    super(router);
  }

}
