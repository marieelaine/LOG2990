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

  protected getSortedTimes(times: number[]): number[];

  protected getBestTime(times: number[]): String;

  protected getSecondBestTime(times: number[]): String;

  protected getThirdBestTime(times: number[]): String;

  protected getDisplayTime(minutes: number, secondes: number): String;

  protected getTitleWithoutFirstLetter(title: String): String;
}
