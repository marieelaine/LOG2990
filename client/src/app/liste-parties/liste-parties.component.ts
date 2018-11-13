import { Component } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";
import { ListePartieServiceService } from "./liste-partie-service.service";
import T, { TempsUser } from "../admin/dialog-abstrait";

@Component({
  selector: "app-liste-parties",
  templateUrl: "./liste-parties.component.html",
  styleUrls: ["./liste-parties.component.css"],
  providers: [ListePartieServiceService]
})

export class ListePartiesComponent {

  protected jouerOuReinitialiser: string;
  protected creerOuSupprimer: string;
  protected joindreOuSupprimer: string;
  protected isListePartiesMode: boolean;
  protected isAdminMode: boolean;
  protected isElevatedActive: boolean;
  protected listePartiesEnAttente: Array<string>;

  public constructor(public router: Router,
                     public listePartieService: ListePartieServiceService) {
    this.jouerOuReinitialiser = "";
    this.creerOuSupprimer = "";
    this.isListePartiesMode = false;
    this.isAdminMode = false;
    this.listePartiesEnAttente = new Array<string>();
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.setjouerOuReinitialiserAndcreerOuSupprimer(val.url);
      }
    });
  }

  protected ajusterImage(id: String, listeParties: T[], isPartieSimple: Boolean): void {
    for (const partie of listeParties) {
      if (partie["_id"] === id) {
        let data: string = "";

        isPartieSimple ? data = atob(String(partie["_image1"][0])) : data = atob(String(partie["_image1PV1"][0]));

        let hex = 0x00;
        const result: Uint8Array = new Uint8Array(data.length);

        for (let i = 0; i < data.length; i++) {
            hex = data.charCodeAt(i);
            result[i] = hex;
        }
        const blob = new Blob([result], {type: 'image/bmp'});
        // TODO changer le get element by id
        // @ts-ignore
        document.getElementById(id).src = URL.createObjectURL(blob);
      }
    }
  }

  protected setjouerOuReinitialiserAndcreerOuSupprimer(url: string): void {
    if (url === "/liste-parties") {
      this.setToJouerAndCreer();
    } else if (url === "/admin") {
      this.setToReinitialiserAndSupprimer();
    }
  }

  protected getTitleFirstLetter(title: String): String {

    return title.substr(0, 1);
  }

  protected getTitleWithoutFirstLetter(title: String): String {

    return title.substr(1, title.length - 1);
  }

  protected getDisplayTime(temps: TempsUser): string {
    const minutes = Math.floor(temps["_temps"] / 60);
    const secondes = temps["_temps"] - minutes * 60;

    return (secondes < 10) ? (minutes + ":0" + secondes) : minutes + ":" + secondes;
  }

  protected genererTableauTempsAleatoires(partie: T): void {
    for (let i: number = 1; i < partie["_tempsSolo"].length + 1 ; i++) {
      partie["_tempsSolo"].push(new TempsUser("Joueur" + i, this.genererTempsAleatoire()));
      partie["_tempsUnContreUn"].push(new TempsUser("Joueur" + i, this.genererTempsAleatoire()));
    }
}

  private genererTempsAleatoire(): number {
    return Math.floor(Math.random() * 400) + 100;
}

  private setToJouerAndCreer(): void {
    this.isAdminMode = false;
    this.isListePartiesMode = true;
    this.jouerOuReinitialiser = "Jouer";
    this.creerOuSupprimer = "Créer";
    this.joindreOuSupprimer = "Joindre";
  }

  private setToReinitialiserAndSupprimer(): void {
    this.isListePartiesMode = false;
    this.isAdminMode = true;
    this.jouerOuReinitialiser = "Réinitialiser";
    this.creerOuSupprimer = "Supprimer";
    this.joindreOuSupprimer = "Supprimer";
  }

}
