import { Component } from '@angular/core';
import { ListePartiesComponent } from '../liste-parties.component';
import { PartieAbstraiteComponent } from '../partie-abstraite/partie-abstraite.component';

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
export class PartieSimpleComponent extends PartieAbstraiteComponent {

  listeParties = new ListePartiesComponent().listePartiesSimples;

  protected getSortedTimes(times: number[]): number[];

  protected getBestTime(times: number[]): String;

  protected getSecondBestTime(times: number[]): String;

  protected getThirdBestTime(times: number[]): String;

  protected getDisplayTime(minutes: number, secondes: number): String;

  protected getTitleWithoutFirstLetter(title: String): String;
}
