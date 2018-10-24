import { Component } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";
import { ListePartieServiceService } from "./liste-partie-service.service";
import T from "../admin/dialog-abstrait";

@Component({
  selector: "app-liste-parties",
  templateUrl: "./liste-parties.component.html",
  styleUrls: ["./liste-parties.component.css"],
  providers: [ListePartieServiceService]
})

export abstract class ListePartiesComponent {

  protected jouerOuReinitialiser: string;
  protected creerOuSupprimer: string;
  protected isListePartiesMode: boolean;
  protected isAdminMode: boolean;

  public constructor(public router: Router,
                     public listePartieService: ListePartieServiceService) {
    this.jouerOuReinitialiser = "";
    this.creerOuSupprimer = "";
    this.isListePartiesMode = false;
    this.isAdminMode = false;
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.setjouerOuReinitialiserAndcreerOuSupprimer(val.url);
      }
    });
  }

  protected abstract supprimerPartie(partieId: string): void;

  protected setjouerOuReinitialiserAndcreerOuSupprimer(url: string): void {
    if (url === "/liste-parties") {
      this.setToJouerAndCreer();
    } else if (url === "/admin") {
      this.setToReinitialiserAndSupprimer();
    }
  }

  private setToJouerAndCreer(): void {
    this.isAdminMode = false;
    this.isListePartiesMode = true;
    this.jouerOuReinitialiser = "Jouer";
    this.creerOuSupprimer = "Créer";
  }

  private setToReinitialiserAndSupprimer(): void {
    this.isListePartiesMode = false;
    this.isAdminMode = true;
    this.jouerOuReinitialiser = "Réinitialiser";
    this.creerOuSupprimer = "Supprimer";
  }

  protected getSortedTimes(times: number[]): number[] {
      if (times) {
        return times.sort(function (a, b) {  return a - b;  });
      }

      return [];
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

  protected getTitleFirstLetter(title: String): String {

    return title.substr(0, 1);
  }

  protected getTitleWithoutFirstLetter(title: String): String {

    return title.substr(1, title.length - 1);
  }

  protected convertSecondsToMinutes(time: number): String {
      const minutes = Math.floor(time / 60);
      const secondes = time - minutes * 60;

      return this.getDisplayTime(minutes, secondes);
  }

  protected genererTableauTempsAleatoires(partie: T): void {
    for (let i = 0 ; i < partie["_tempsSolo"].length ; i++) {
      partie["_tempsSolo"][i] = Math.floor(Math.random() * 400) + 100;
    }
    for (let i = 0 ; i < partie["_tempsUnContreUn"].length ; i++) {
      partie["_tempsUnContreUn"][i] = Math.floor(Math.random() * 400) + 100;
    }
  }
}
