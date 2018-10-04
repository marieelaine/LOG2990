import { Component } from '@angular/core';
import { ListePartiesComponent } from '../liste-parties.component';
import { PartieAbstraiteClass } from '../partie-abstraite';

export interface PartieMultipleInterface {
  title: String;
  imagePath: String;
  timesSolo: number[];
  timesOneVsOne: number[];
  isElevatedActive: boolean;
}

@Component({
  selector: 'app-partie-multiple',
  templateUrl: './partie-multiple.component.html',
  styleUrls: ['./partie-multiple.component.css']
})
export class PartieMultipleComponent extends PartieAbstraiteClass {

  listeParties = new ListePartiesComponent().listePartiesMultiples;
}
