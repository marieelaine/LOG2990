import { Component } from '@angular/core';
import { ListePartiesComponent } from '../liste-parties.component';

@Component({
  selector: 'app-partie-simple',
  templateUrl: './partie-simple.component.html',
  styleUrls: ['./partie-simple.component.css']
})
export class PartieSimpleComponent {

  title: String;
  imagePath: String;
  timesSolo: number[];
  timesOneVsOne: number[];
  isElevatedActive = false;
  titleWithoutFirstLetter: String;
  listeParties: PartieSimpleComponent[];

  constructor( liste: ListePartiesComponent) {
    this.listeParties = liste.listePartiesSimples;
  }
}
