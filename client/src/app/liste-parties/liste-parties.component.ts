import {Component, ElementRef, QueryList, ViewChildren} from "@angular/core";
import {Router, NavigationEnd} from "@angular/router";
import {ListePartieServiceService} from "./liste-partie-service.service";
import {Joueur} from "../admin/joueur";
import {DomSanitizer} from "@angular/platform-browser";
import * as constantes from "../constantes";
import {SocketClientService} from "../socket/socket-client.service";
import {CookieService} from "ngx-cookie-service";

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
    protected joueur: string;

    public constructor(public router: Router,
                       public sanitizer: DomSanitizer,
                       public listePartieService: ListePartieServiceService,
                       public socketClientService: SocketClientService,
                       public cookieService: CookieService) {
        this.username = USERNAME;
        this.jouerOuReinitialiser = constantes.STR_VIDE;
        this.creerOuSupprimer = constantes.STR_VIDE;
        this.joindreOuSupprimer = constantes.STR_VIDE;
        this.isListePartiesMode = false;
        this.isAdminMode = false;
        this.listePartiesEnAttente = new Array<string>();
        this.changerBoutonSelonRouter(router);
        this.joueur = this.cookieService.get(constantes.USERNAME_STR);
    }

    protected setJouerOuReinitialiserEtcreerOuSupprimer(url: string): void {
        if (url === URL_LISTE_PARTIE) {
            this.setJouerEtCreer();
        } else if (url === URL_ADMIN) {
            this.setReinitialiserEtSupprimer();
        }
    }

    protected getPremiereLettreTitre(title: string): string {

        return title.substr(0, 1);
    }

    protected getTitreSansPremiereLettre(title: string): string {

        return title.substr(1, title.length - 1);
    }

    protected getTempsDisplay(tempsUser: Joueur): string {
        const minutes: number = Math.floor(tempsUser.temps / NB_SECONDES);
        const secondes: number = tempsUser.temps - minutes * NB_SECONDES;

        return (secondes < DISPLAY) ?
            (minutes + constantes.DEUX_POINTS_TEMPS_FORMAT + constantes.ZERO_STR_FORMAT + secondes)
            : minutes + constantes.DEUX_POINTS_TEMPS_FORMAT + secondes;
    }

    protected genererTableauTempsAleatoires(): Array<Joueur> {
        const arr: Array<Joueur> = [];
        for (let i: number = 1; i < NB_ELEMENT; i++) {
            arr.push(new Joueur(JOUEUR + i, this.genererTempsAleatoire()));
        }
        this.getTempsEnOrdre(arr);

        return arr;
    }

    protected mettreBoutonsACreer(): void {
        this.joindreOuSupprimer = CREER;
        this.creerOuSupprimer = CREER;
    }

    private genererTempsAleatoire(): number {
        return Math.floor(Math.random() * BORNE_SUP) + BORNE_INF;
    }

    private getTempsEnOrdre(arr: Array<Joueur>): Array<Joueur> {
        if (arr) {
            arr.sort((t1: Joueur, t2: Joueur) => {
                const time1: number = t1.temps;
                const time2: number = t2.temps;
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

    private setJouerEtCreer(): void {
        this.isAdminMode = false;
        this.isListePartiesMode = true;
        this.jouerOuReinitialiser = JOUER;
        this.creerOuSupprimer = CREER;
        this.joindreOuSupprimer = JOINDRE;
    }

    private setReinitialiserEtSupprimer(): void {
        this.isListePartiesMode = false;
        this.isAdminMode = true;
        this.jouerOuReinitialiser = REINITIALISER;
        this.creerOuSupprimer = SUPPRIMER;
        this.joindreOuSupprimer = SUPPRIMER;
    }

    private changerBoutonSelonRouter(router: Router): void {
        router.events.subscribe((val) => {
            if (val instanceof NavigationEnd) {
                this.setJouerOuReinitialiserEtcreerOuSupprimer(val.url);
            }
        });
    }
}
