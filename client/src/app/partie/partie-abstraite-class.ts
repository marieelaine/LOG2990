import { ChronoComponent } from "../chrono/chrono.component";
import {ElementRef, ErrorHandler, QueryList, ViewChildren, ViewChild} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {PartieService} from "./partie.service";
import { PartieSimple } from "../admin/dialog-simple/partie-simple";
import { PartieMultiple } from "../admin/dialog-multiple/partie-multiple";
import { ChatComponent } from "../chat/chat.component";
import {CookieService} from "ngx-cookie-service";
import { TempsUser } from "../admin/temps-user";
import * as constantes from "../constantes";
import { SocketClientService } from "../socket/socket-client.service";

const MINUTESANDSECONDCONVERT: number = 10;
const TIMEOUT: number = 1000;
const OFFSET_ADDITIONNEL: number = 10;
const LINE_WIDTH: number = 1.5;
const PARTIE_SECOND_ELEMENT: number = 2;

export abstract class PartieAbstraiteClass {

    @ViewChildren("canvas") protected canvas: QueryList<ElementRef>;
    @ViewChild(ChatComponent) protected chat: ChatComponent;

    protected chrono: ChronoComponent;
    protected messageDifferences: string;
    protected differencesTrouvees: number;
    protected partieCommence: boolean;
    protected audio: HTMLAudioElement;
    protected differenceRestantes: number;
    protected nomPartie: string;
    protected partieID: string;
    protected abstract partie: PartieSimple | PartieMultiple;
    protected image: Array<HTMLImageElement>;
    protected diffTrouvee: number[][];
    protected imageData: Array<string>;
    protected penaliteEtat: boolean;
    protected isMultijoueur: boolean;
    protected channelId: string;
    protected joueurMultijoueur: string;
    private nbImages: number;

    public constructor(protected route: ActivatedRoute,
                       protected partieService: PartieService,
                       protected cookieService: CookieService,
                       protected socketClientService: SocketClientService,
                       isSimple: boolean) {
        this.partieCommence = false;
        this.differencesTrouvees = 0;
        this.chrono = new ChronoComponent();
        this.messageDifferences = "Chargement des images";
        this.chat = new ChatComponent();
        this.imageData = [];
        this.diffTrouvee = [[], []];
        this.audio = new Audio();
        this.penaliteEtat = false;

        this.setImage(isSimple);
        this.setID();
        this.setIsMultijoueur();
        this.setPartie();
    }

    protected abstract setPartie(): void;

    protected abstract getImageData(): void;

    protected abstract ajouterTemps(temps: number): void;

    protected commencerPartie(): void {
        this.partieCommence = true;
        this.messageDifferences = `Vous avez trouvé ${this.differencesTrouvees} différences`;

        this.chrono.startTimer();
    }

    protected setup(): void {
        this.addNomPartieToChat();
        for (let i: number = 0; i < this.nbImages; i++) {
            this.ajusterSourceImage(this.imageData[i], this.canvas.toArray()[i], this.image[i]);
        }
        this.commencerPartie();
    }

    protected addNomPartieToChat(): void {
        this.nomPartie = this.partie["_nomPartie"];
        const msg: string = ("Bienvenue dans la partie " + this.nomPartie.charAt(0).toUpperCase()
                                     + this.partie["_nomPartie"].slice(1));
        this.chat.addMessageToMessagesChat(msg);
    }

    protected ajusterSourceImage(data: String, canvas: ElementRef, image: HTMLImageElement): void {
        let hex: number = 0x00;
        const result: Uint8Array = new Uint8Array(data.length);

        for (let i: number  = 0; i < data.length; i++) {
            hex = data.charCodeAt(i);
            result[i] = hex;
        }
        const blob: Blob = new Blob([result], {type: "image/bmp"});

        const context: CanvasRenderingContext2D = canvas.nativeElement.getContext("2d");
        image.src = URL.createObjectURL(blob);
        image.onload = () => {
            context.drawImage(image, 0, 0);
        };
    }

    protected ajouterMessageDiffTrouvee(joueur: string): void {
        const date: Date = new Date();
        this.isMultijoueur ? this.chat.addMessageToMessagesChat(this.getCurrentTime() + " - Différence trouvée par " + joueur)
                           : this.chat.addMessageToMessagesChat(this.getCurrentTime() + " - Différence trouvée.");
    }

    protected terminerPartie(gagnant: string): void {
        console.log("terminer");
        this.isMultijoueur ? this.partieMultijoueurTerminee(gagnant) : this.partieSoloTerminee();
    }

    protected partieMultijoueurTerminee(gagnant: string): void {
        this.chrono.stopTimer();

        if (this.joueurMultijoueur === gagnant) {
            this.messageDifferences = "FÉLICITATIONS, VOUS AVEZ GAGNÉ!";
            this.joueurApplaudissements();
            // tslint:disable-next-line:no-suspicious-comment
            // TODO: Ajouter les temps multijoueur
        } else {
            this.messageDifferences = "PUTAIN T'AS PERDU MEC!";
            this.joueurLoserSound();
        }
    }

    protected partieSoloTerminee(): void {
        this.chrono.stopTimer();
        this.messageDifferences = "FÉLICITATIONS!";
        this.joueurApplaudissements();
        this.ajouterTemps(this.chrono.getTime());
    }

    protected updateTableauTempsSolo(temps: number): void {
      let joueur: string = this.cookieService.get("username");
      if (joueur === "") {
          joueur = "Anonyme";
      }
      if (temps < this.partie["_tempsSolo"][PARTIE_SECOND_ELEMENT]["_temps"]) {
        const tempsUser: TempsUser =  new TempsUser(joueur, temps);
        this.partie["_tempsSolo"].splice(-1, 1);
        this.partie["_tempsSolo"].push(tempsUser);
      }
    }

    protected augmenterDiffTrouvee(): void {
        this.differencesTrouvees ++;
        this.messageDifferences = `Vous avez trouvé ${this.differencesTrouvees} différences`;
    }

    protected jouerYesSound(): void {
        this.audio.src = "../assets/yes.wav";
        this.audio.load();
        this.audio.play().catch(() => ErrorHandler);
    }

    protected terminerPartieSolo(): void {
        if (this.differenceRestantes === this.differencesTrouvees) {
            this.partieCommence = false;
            this.terminerPartie("");
        }
    }

    protected penalite(event: MouseEvent): void {
        this.penaliteEtat = true;
        const canvas: HTMLCanvasElement = event.srcElement as HTMLCanvasElement;
        const ctx: CanvasRenderingContext2D = canvas.getContext("2d") as CanvasRenderingContext2D;

        const imageSaved: ImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        ctx.font = "600 28px Arial";
        ctx.textAlign = "center";
        ctx.fillStyle = "#ff0000";
        ctx.fillText("ERREUR", event.offsetX, event.offsetY + OFFSET_ADDITIONNEL);
        ctx.lineWidth = LINE_WIDTH;
        ctx.fillStyle = "black";
        ctx.strokeText("ERREUR", event.offsetX, event.offsetY + OFFSET_ADDITIONNEL);
        this.audio.src = "../assets/no.mp3";
        this.audio.load();
        this.audio.play().catch(() => ErrorHandler);

        setTimeout(() => {
            ctx.putImageData(imageSaved, 0, 0);
            this.penaliteEtat = false;
        },         TIMEOUT);
    }

    protected getCurrentTime(): string {
        const date: Date = new Date();

        return date.getHours() + ":" + this.getMinutes(date) + ":" + this.getSeconds(date);
    }

    private getMinutes(date: Date): string {
        return date.getMinutes() < MINUTESANDSECONDCONVERT ? "0" + date.getMinutes().toString() : date.getMinutes().toString();
    }

    private getSeconds(date: Date): string {
        return date.getSeconds() < MINUTESANDSECONDCONVERT ? "0" + date.getSeconds().toString() : date.getSeconds().toString();
    }

    private joueurApplaudissements(): void {
        this.audio.src = "../assets/applause.mp3";
        this.audio.load();
        this.audio.play().catch(() => ErrorHandler);
    }

    private joueurLoserSound(): void {
        this.audio.src = "../assets/LoserSound.mp3";
        this.audio.load();
        this.audio.play().catch(() => ErrorHandler);
    }

    private setImage(isSimple: boolean): void {
        this.nbImages = isSimple ? constantes.PARTIE_SIMPLE_NB_IMAGES : constantes.PARTIE_MULTIPLE_NB_IMAGES;
        this.image = [];
        for (let i: number = 0; i < this.nbImages; i++) {
            this.image.push(new Image());
        }
    }

    private setID(): void {
        this.partieID = this.route.snapshot.params.idPartie;
    }

    private setIsMultijoueur(): void {
        this.route.snapshot.params.channelId === "0" ? this.isMultijoueur = false : this.isMultijoueur = true;
        if (this.isMultijoueur) {
            this.setChannelId();
            this.setJoueurMultijoueur();
        }
    }

    private setChannelId(): void {
        this.channelId = this.route.snapshot.params.channelId;
    }

    private setJoueurMultijoueur(): void {
        this.cookieService.get("username") === "" ? this.joueurMultijoueur = "Anonyme"
                                                  : this.joueurMultijoueur = this.cookieService.get("username");
    }
}
