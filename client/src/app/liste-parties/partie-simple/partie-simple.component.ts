import { Component } from '@angular/core';
import { ListePartiesComponent } from '../liste-parties.component';
import { PartieAbstraiteClass } from '../partie-abstraite';

export interface PartieSimpleInterface {
  title: String;
  imagePath: String;
  timesSolo: number[];
  timesOneVsOne: number[];
  isElevatedActive: boolean;
}

@Component({
  selector: 'app-partie-simple',
  templateUrl: './partie-simple.component.html',
  styleUrls: ['./partie-simple.component.css']
})
export class PartieSimpleComponent extends PartieAbstraiteClass {

  listeParties = new ListePartiesComponent().listePartiesSimples;

}
