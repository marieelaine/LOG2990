import { ChronoComponent } from "../chrono/chrono.component";
import {ErrorHandler} from "@angular/core";

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

    public constructor() {
        this.blur = true;
        this.partieCommence = false;
        this.differencesTrouvees = 0;
        this.chrono = new ChronoComponent();
        this.messageDifferences = "Cliquez pour commencer";
        this.messagesChat = new Array<string>();
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

    protected abstract ajouterTemps(temps: number);

    protected envoyerMessage(): void {

    }
}
