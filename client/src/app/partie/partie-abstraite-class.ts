import { ChronoComponent } from "../chrono/chrono.component";
import {ElementRef, ErrorHandler, QueryList, ViewChildren} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {PartieService} from "./partie.service";

export abstract class PartieAbstraiteClass {

    protected blur: boolean;
    protected chrono: ChronoComponent;
    protected messageDifferences: string;
    protected differencesTrouvees: number;
    protected partieCommence: boolean;
    protected audio = new Audio();
    protected differenceRestantes;
    protected nomPartie: string;
    protected messagesChat: string[];

    protected partieID: string;
    protected abstract partie;
    @ViewChildren('canvas') canvas: QueryList<ElementRef>;
    protected image: Array<HTMLImageElement>;
    protected diffTrouvee: number[];
    protected imageData: Array<string>;

    protected constructor(protected route: ActivatedRoute, protected partieService: PartieService, protected nbImage: number) {
        this.blur = true;
        this.partieCommence = false;
        this.differencesTrouvees = 0;
        this.chrono = new ChronoComponent();
        this.messageDifferences = "Cliquez pour commencer";
        this.messagesChat = [];
        this.imageData = [];
        this.diffTrouvee = [];

        this.image = [];
        for (let i = 0; i < nbImage; i++) {
            this.image.push(new Image());
        }

        this.setID();
        this.setPartie();
    }

    protected start(): void {
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

    protected abstract setPartie(): void;

    protected abstract getImageData(): void;

    protected setup(): void {
        this.addNomPartieToChat();
        for (let i = 0; i < this.nbImage; i++) {
            this.ajusterSourceImage(this.imageData[i], this.canvas.toArray()[i], this.image[i]);
        }
    }

    protected addNomPartieToChat() {
        this.nomPartie = this.partie["_nomPartie"];
        this.messagesChat.push("Bienvenue dans la partie " + this.nomPartie.charAt(0).toUpperCase() + this.partie["_nomPartie"].slice(1));
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
            this.audio.src = "../assets/diffTrouvee.mp3";
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
        this.messagesChat.push("Vous avez trouvé une différence!");
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
        this.partie["_tempsSolo"].push(temps);
        this.partieService.reinitialiserTempsPartie(this.partieID, this.partie["_tempsSolo"], this.partie["_tempsUnContreUn"])
            .catch(() => ErrorHandler);
    }
}
