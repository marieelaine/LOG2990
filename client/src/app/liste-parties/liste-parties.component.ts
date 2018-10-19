import {Component, OnInit} from '@angular/core';
import { PartieMultipleInterface } from 'src/app/liste-parties/liste-partie-multiple/liste-partie-multiple.component';
import { PartieSimpleInterface } from './liste-partie-simple/liste-partie-simple.component';
import { Router, NavigationEnd } from '@angular/router';
import { PartieSimple } from '../admin/dialog-simple/partie-simple';
import { ListePartieServiceService } from './liste-partie-service.service';

@Component({
  selector: 'app-liste-parties',
  templateUrl: './liste-parties.component.html',
  styleUrls: ['./liste-parties.component.css'],
  providers: [ListePartieServiceService]
})

export class ListePartiesComponent implements OnInit{

  partieSimpleDiv: HTMLElement;

  listePartiesSimples: PartieSimple[] = [];

  listePartiesMultiples: PartieMultipleInterface[] = [
        { title: 'Mona Lisa', imagePath: 'assets/monaLisa.bmp', isElevatedActive: false,
          timesSolo: [312, 415, 6462, 1], timesOneVsOne: [312, 3], idPartie: 3
        }
    ];

  public jouerOuReinitialiser: string;
  public creerOuSupprimer: string;
  public isListePartiesMode: boolean;
  public isAdminMode: boolean;
  public listePartieService: ListePartieServiceService;

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

  ngOnInit() {
    this.listePartieService.getListeImageSimple();
  }
}
