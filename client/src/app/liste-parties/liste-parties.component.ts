import { Component } from '@angular/core';
import { ListePartieMultipleInterface } from 'src/app/liste-parties/liste-partie-multiple/liste-partie-multiple.component';
import { ListePartieSimpleInterface } from './liste-partie-simple/liste-partie-simple.component';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-liste-parties',
  templateUrl: './liste-parties.component.html',
  styleUrls: ['./liste-parties.component.css']
})

export class ListePartiesComponent {

  partieSimpleDiv: HTMLElement;

  listePartiesSimples: ListePartieSimpleInterface[] = [
    { title: 'Nissan Patrol', imagePath: 'assets/NissanPatrol.bmp', isElevatedActive: false,
      timesSolo: [320, 500], timesOneVsOne: [],
      },
    { title: 'Jerry', imagePath: 'assets/Jerry.bmp',  isElevatedActive: false,
      timesSolo: [550, 302, 419, 3141], timesOneVsOne: [41241, 412, 52, 5235, 552],
      }  ];

  listePartiesMultiples: ListePartieMultipleInterface[] = [
    { title: 'Mona Lisa', imagePath: 'assets/monaLisa.bmp', isElevatedActive: false,
      timesSolo: [312, 415, 6462, 1], timesOneVsOne: [312, 3],
    }  ];

  public jouerOuReinitialiser: string;
  public creerOuSupprimer: string;
  public isListePartiesMode: boolean;
  public isAdminMode: boolean;

  public constructor(router: Router) {
    this.jouerOuReinitialiser = '';
    this.creerOuSupprimer = '';
    this.isListePartiesMode = false;
    this.isAdminMode = false;
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.setjouerOuReinitialiserAndcreerOuSupprimer(val.url);
      }
    });
  }

  protected setjouerOuReinitialiserAndcreerOuSupprimer(url: string): void {
    if (url === '/liste-parties') {
      this.setToJouerAndCreer();
    } else if (url === '/admin') {
      this.setToReinitialiserAndSupprimer();
    }
  }

  private setToJouerAndCreer(): void {
    this.isListePartiesMode = true;
    this.jouerOuReinitialiser = 'Jouer';
    this.creerOuSupprimer = 'Créer';
  }

  private setToReinitialiserAndSupprimer(): void {
    this.isAdminMode = true;
    this.jouerOuReinitialiser = 'Réinitialiser';
    this.creerOuSupprimer = 'Supprimer';
  }

  protected getSortedTimes(times: number[]): number[] {
      return times.sort(function (a, b) {  return a - b;  });
  }

  protected getBestTime(times: number[]): String {
    const sortedTimes = this.getSortedTimes(times);
    if (sortedTimes[0] == null) {
      return "-";
    }

    return this.convertSecondsToMinutes(sortedTimes[0]);
  }

  protected getSecondBestTime(times: number[]): String {
    const sortedTimes = this.getSortedTimes(times);
    if (sortedTimes[1] == null) {
      return "-";
  }

    return this.convertSecondsToMinutes(sortedTimes[1]);
  }

  protected getThirdBestTime(times: number[]): String {
    const sortedTimes = this.getSortedTimes(times);
    if (sortedTimes[2] == null) {
      return "-";
  }

    return this.convertSecondsToMinutes(sortedTimes[2]);
  }

  protected getDisplayTime(minutes: number, secondes: number): String {
    if (secondes < 10) {
      return minutes + ":0" + secondes;

    } else {

    return minutes + ":" + secondes;
    }
  }

  protected getTitleWithoutFirstLetter(title: String): String {
    return title.substr(1, title.length - 1);
  }

  protected convertSecondsToMinutes(time: number): String {
    const minutes = Math.floor(time / 60);
    const secondes = time - minutes * 60;

    return this.getDisplayTime(minutes, secondes);
  }
}
