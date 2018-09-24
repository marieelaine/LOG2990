import { Component } from '@angular/core';
import { ListePartiesComponent } from '../liste-parties.component';

export interface PartieMultipleComponent {
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
export class PartieMultipleFonctions {

  listeParties = new ListePartiesComponent().listePartiesMultiples;

  getSortedTimes(times: number[]): number[] {
    // tslint:disable-next-line:only-arrow-functions
    return times.sort(function (a, b) {  return a - b;  });
  }

  getBestTime(times: number[]): String {
      const sortedTimes = this.getSortedTimes(times);
      if (sortedTimes[0] == null) {
        return "-";
      }

      return this.convertSecondsToMinutes(sortedTimes[0]);
  }

  getSecondBestTime(times: number[]): String {
      const sortedTimes = this.getSortedTimes(times);
      if (sortedTimes[1] == null) {
        return "-";
      }

      return this.convertSecondsToMinutes(sortedTimes[1]);
  }

  getThirdBestTime(times: number[]): String {
      const sortedTimes = this.getSortedTimes(times);
      if (sortedTimes[2] == null) {
        return "-";
      }

      return this.convertSecondsToMinutes(sortedTimes[2]);
  }

  convertSecondsToMinutes(time: number): String {
      const minutes = Math.floor(time / 60);
      const secondes = time - minutes * 60;

      return this.getDisplayTime(minutes, secondes);
  }

  getDisplayTime(minutes: number, secondes: number): String {
      if (secondes < 10) {
        return minutes + ":0" + secondes;

      } else {

      return minutes + ":" + secondes;
      }
  }

  getTitleWithoutFirstLetter(title: String): String {
    return title.substr(1, title.length - 1);
  }
}
