import { ChronoComponent } from "../chrono/chrono.component";
import {ElementRef, ErrorHandler, QueryList, ViewChildren, ViewChild} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {PartieService} from "./partie.service";
import { PartieSimple } from "../admin/dialog-simple/partie-simple";
import { PartieMultiple } from "../admin/dialog-multiple/partie-multiple";
import { ChatComponent } from "../chat/chat.component";
import {TempsUser} from "../admin/dialog-abstrait";
import {CookieService} from "ngx-cookie-service";

export abstract class PartieAbstraiteClass {

    @ViewChildren('canvas') canvas: QueryList<ElementRef>;
    @ViewChild(ChatComponent) chat: ChatComponent;

    protected blur: boolean;
    protected chrono: ChronoComponent;
    protected messageDifferences: string;
    protected differencesTrouvees: number;
    protected partieCommence: boolean;
    protected audio: HTMLAudioElement;
    protected differenceRestantes;
    protected nomPartie: string;
    protected partieID: string;
    protected abstract partie: PartieSimple | PartieMultiple;
    protected image: Array<HTMLImageElement>;
    protected diffTrouvee: number[][];
    protected imageData: Array<string>;
    protected penaliteEtat: boolean = false;
    private nbImages: number;

    public constructor(protected route: ActivatedRoute,
                       protected partieService: PartieService,
                       protected cookieService: CookieService,
                       isSimple: boolean) {
        this.blur = true;
        this.partieCommence = false;
        this.differencesTrouvees = 0;
        this.chrono = new ChronoComponent();
        this.messageDifferences = "Cliquez pour commencer";
        this.chat = new ChatComponent();
        this.imageData = [];
        this.diffTrouvee = [[], []];
        this.audio = new Audio();

        this.setImage(isSimple);
        this.setID();
        this.setPartie();
    }

    protected abstract setPartie(): void;

    protected abstract getImageData(): void;

    protected commencerPartie(): void {
        this.partieCommence = true;
        this.messageDifferences = `Vous avez trouvé ${this.differencesTrouvees} différences`;
        this.blur = false;
        const button: HTMLElement = document.getElementById("StartButton") as HTMLElement;
        try {
            button.remove();
        } catch (e) {}
        this.chrono.startTimer();
    }

    protected setID(): void {
        this.partieID = this.route.snapshot.params.idPartie;
    }

    protected setup(): void {
        this.addNomPartieToChat();
        for (let i = 0; i < this.nbImages; i++) {
            this.ajusterSourceImage(this.imageData[i], this.canvas.toArray()[i], this.image[i]);
        }
        this.commencerPartie();
    }

    protected addNomPartieToChat() {
        this.nomPartie = this.partie["_nomPartie"];
        const msg = ("Bienvenue dans la partie " + this.nomPartie.charAt(0).toUpperCase()
                                     + this.partie["_nomPartie"].slice(1));
        this.chat.addMessageToMessagesChat(msg);
    }

    protected ajusterSourceImage(data: String, canvas: ElementRef, image: HTMLImageElement): void {
        let hex = 0x00;
        const result: Uint8Array = new Uint8Array(data.length);

        for (let i  = 0; i < data.length; i++) {
            hex = data.charCodeAt(i);
            result[i] = hex;
        }
        const blob = new Blob([result], {type: 'image/bmp'});

        const context: CanvasRenderingContext2D = canvas.nativeElement.getContext("2d");
        image.src = URL.createObjectURL(blob);
        image.onload = () => {
            context.drawImage(image, 0, 0);
        };
    }

    protected trouverDifference(): void {
        if (this.partieCommence) {
            this.differencesTrouvees ++;
            this.messageDifferences = `Vous avez trouvé ${this.differencesTrouvees} différences`;
            this.audio.src = "../assets/yes.wav";
            this.audio.load();
            this.audio.play().catch(() => ErrorHandler);
            this.ajouterMessageDiffTrouvee();
        }
        if (this.differenceRestantes === this.differencesTrouvees) {
            this.partieCommence = false;
            this.terminerPartie();
        }
    }

    protected ajouterMessageDiffTrouvee() {
        this.chat.messagesChat.push("Vous avez trouvé une différence!");
    }

    protected terminerPartie(): void {
        this.chrono.stopTimer();
        this.messageDifferences = "FÉLICITATIONS!";
        this.audio.src = "../assets/applause.mp3";
        this.audio.load();
        this.audio.play().catch(() => ErrorHandler);
        this.ajouterTemps(this.chrono.getTime());
    }

    protected ajouterTemps(temps: number): void {
        this.updateTableauTemps(temps);
        this.partieService.reinitialiserTempsPartie(this.partieID, this.partie["_tempsSolo"], this.partie["_tempsUnContreUn"])
        .catch(() => ErrorHandler);
    }

    private updateTableauTemps(temps: number) {
      let joueur: string = this.cookieService.get("username");
      if (joueur === "") {
          joueur = "Anonyme";
      }
      const tempsUser: TempsUser =  new TempsUser(joueur, temps);
      this.partie["_tempsSolo"].splice(-1, 1);
      this.partie["_tempsSolo"].push(tempsUser);
    }

    protected penalite(event): void {
        this.penaliteEtat = true;
        const canvas = event.srcElement;
        const ctx = canvas.getContext("2d");
        const imageSaved: ImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        ctx.font = "600 28px Arial";
        ctx.textAlign = "center";
        ctx.fillStyle = "#ff0000";
        ctx.fillText('ERREUR', event.offsetX, event.offsetY + 10);
        ctx.lineWidth = 1.5;
        ctx.fillStyle = "black";
        ctx.strokeText("ERREUR", event.offsetX, event.offsetY + 10);
        this.audio.src = "../assets/no.mp3";
        this.audio.load();
        this.audio.play().catch(() => ErrorHandler);

        setTimeout(() => {
            ctx.putImageData(imageSaved, 0, 0);
            this.penaliteEtat = false;
        },         1000);
    }

    private setImage(isSimple: boolean): void {
        this.nbImages = isSimple ? 2 : 4;
        this.image = [];
        for (let i = 0; i < this.nbImages; i++) {
            this.image.push(new Image());
        }
    }
}
