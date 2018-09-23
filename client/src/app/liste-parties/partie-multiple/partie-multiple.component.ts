import { Component } from '@angular/core';
import { ListePartiesComponent } from '../liste-parties.component';

@Component({
  selector: 'app-partie-multiple',
  templateUrl: './partie-multiple.component.html',
  styleUrls: ['./partie-multiple.component.css']
})
export class PartieMultipleComponent {

  title: String;
  imagePath: String;
  timesSolo: number[];
  timesOneVsOne: number[];
  isElevatedActive = false;
  titleWithoutFirstLetter: String;
  listeParties: PartieMultipleComponent[];

  constructor( liste: ListePartiesComponent) {
    this.listeParties = liste.listePartiesMultiples;
  }
}
