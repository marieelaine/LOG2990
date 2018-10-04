import { Component } from '@angular/core';
import { ListePartiesComponent } from '../liste-parties.component';
import { PartieAbstraiteComponent } from '../partie-abstraite/partie-abstraite.component';

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
export class PartieMultipleComponent extends PartieAbstraiteComponent {

  listeParties = new ListePartiesComponent().listePartiesMultiples;
}
