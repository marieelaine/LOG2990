import {Component, ElementRef, QueryList, ViewChildren} from "@angular/core";
import {Router, NavigationEnd} from "@angular/router";
import {ListePartieServiceService} from "./liste-partie-service.service";
import {PartieMultiple} from "../admin/dialog-multiple/partie-multiple";
import {PartieSimple} from "../admin/dialog-simple/partie-simple";
import { TempsUser } from "../admin/temps-user";
import { DomSanitizer } from "@angular/platform-browser";
import * as constantes from "../constantes";

const NB_SECONDES: number = 60;
const DISPLAY: number = 10;
const BORNE_INF: number = 100;
const BORNE_SUP: number = 400;
const NB_ELEMENT: number = 4;

const IMAGE: string = "image";
const JOUER: string = "Jouer";
const CREER: string = "Créer";
const JOINDRE: string = "Joindre";
const JOUEUR: string = "Joueur ";
const REINITIALISER: string = "Réinitialiser";
const SUPPRIMER: string = "Supprimer";
const USERNAME: string = "username";
const URL_LISTE_PARTIE: string = "/liste-parties";
const URL_ADMIN: string = "/admin";

@Component({
    selector: "app-liste-parties",
    templateUrl: "./liste-parties.component.html",
    styleUrls: ["./liste-parties.component.css"],
    providers: [ListePartieServiceService]
})

export class ListePartiesComponent {

    @ViewChildren(IMAGE) public image: QueryList<ElementRef>;

    protected jouerOuReinitialiser: string;
    protected creerOuSupprimer: string;
    protected joindreOuSupprimer: string;
    protected isListePartiesMode: boolean;
    protected isAdminMode: boolean;
    protected isElevatedActive: boolean;
    protected listePartiesEnAttente: Array<string>;
    protected username: string;

    public constructor(public router: Router,
                       public sanitizer: DomSanitizer,
                       public listePartieService: ListePartieServiceService) {
        this.username = USERNAME;
        this.jouerOuReinitialiser = constantes.STR_VIDE;
        this.creerOuSupprimer = constantes.STR_VIDE;
        this.joindreOuSupprimer = constantes.STR_VIDE;
        this.isListePartiesMode = false;
        this.isAdminMode = false;
        this.listePartiesEnAttente = new Array<string>();
        this.changerBoutonSelonRouter(router);
    }

    protected ajusterImage(id: string, listeParties: Array<PartieSimple | PartieMultiple>, isPartieSimple: Boolean): void {
        for (const partie of listeParties) {
            if (partie["_id"] === id) {
                let data: string = constantes.STR_VIDE;

                isPartieSimple ? data = atob(String(partie["_image1"][0])) : data = atob(String(partie["_image1PV1"][0]));

                let hex: number = 0x00;
                const result: Uint8Array = new Uint8Array(data.length);

                for (let i: number = 0; i < data.length; i++) {
                    hex = data.charCodeAt(i);
                    result[i] = hex;
                }
                const blob: Blob = new Blob([result], {type: constantes.IMAGE_BLOB});
                partie["_imageBlob"] = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(blob));
            }
        }
    }

    protected setjouerOuReinitialiserAndcreerOuSupprimer(url: string): void {
        if (url === URL_LISTE_PARTIE) {
            this.setToJouerAndCreer();
        } else if (url === URL_ADMIN) {
            this.setToReinitialiserAndSupprimer();
        }
    }

    protected getTitleFirstLetter(title: string): string {

        return title.substr(0, 1);
    }

    protected getTitleWithoutFirstLetter(title: string): string {

        return title.substr(1, title.length - 1);
    }

    protected getDisplayTime(temps: TempsUser): string {
        const minutes: number = Math.floor(temps["_temps"] / NB_SECONDES);
        const secondes: number = temps["_temps"] - minutes * NB_SECONDES;

        return (secondes < DISPLAY) ?
            (minutes + constantes.DEUX_POINTS_TEMPS_FORMAT + constantes.ZERO_STR_FORMAT + secondes)
            : minutes + constantes.DEUX_POINTS_TEMPS_FORMAT + secondes;
    }

    protected genererTableauTempsAleatoires(): Array<TempsUser> {
        const arr: Array<TempsUser> = [];
        for (let i: number = 1; i < NB_ELEMENT; i++) {
            arr.push(new TempsUser(JOUEUR + i, this.genererTempsAleatoire()));
        }
        this.getSortedTimes(arr);

        return arr;
    }

    protected mettreBoutonsACreer(): void {
        this.joindreOuSupprimer = CREER;
        this.creerOuSupprimer = CREER;
    }

    private genererTempsAleatoire(): number {
        return Math.floor(Math.random() * BORNE_SUP) + BORNE_INF;
    }

    private getSortedTimes(arr: Array<TempsUser>): Array<TempsUser> {
        if (arr) {
            arr.sort((t1: TempsUser, t2: TempsUser) => {
                const time1: number = t1["_temps"];
                const time2: number = t2["_temps"];
                if (time1 > time2) {
                    return 1;
                }
                if (time1 < time2) {
                    return -1;
                }

                return 0;
            });
        }

        return arr;
    }

    private setToJouerAndCreer(): void {
        this.isAdminMode = false;
        this.isListePartiesMode = true;
        this.jouerOuReinitialiser = JOUER;
        this.creerOuSupprimer = CREER;
        this.joindreOuSupprimer = JOINDRE;
    }

    private setToReinitialiserAndSupprimer(): void {
        this.isListePartiesMode = false;
        this.isAdminMode = true;
        this.jouerOuReinitialiser = REINITIALISER;
        this.creerOuSupprimer = SUPPRIMER;
        this.joindreOuSupprimer = SUPPRIMER;
    }

    private changerBoutonSelonRouter(router: Router): void {
        router.events.subscribe((val) => {
            if (val instanceof NavigationEnd) {
                this.setjouerOuReinitialiserAndcreerOuSupprimer(val.url);
            }
        });
    }

}
