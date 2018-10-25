import { ChronoComponent } from "../chrono/chrono.component";
import {ErrorHandler} from "@angular/core";

export abstract class PartieAbstraiteClass {

    protected blur: boolean = true;
    protected chrono: ChronoComponent = new ChronoComponent();
    protected message = "Cliquez pour commencer";
    protected differencesTrouvees = 0;
    protected partieCommence = false;
    protected audio = new Audio();
    protected differenceRestantes;

    public constructor() {

    }

    protected start(): void {
        this.partieCommence = true;
        this.message = `Vous avez trouvé ${this.differencesTrouvees} différences`;
        this.blur = false;
        const button = document.getElementById("StartButton");
        try {
            // tslint:disable-next-line:no-non-null-assertion
            button!.remove();
        } catch (e) {}
        this.chrono.startTimer();
    }

    protected trouverDifference(): void {

        if (this.partieCommence) {
            this.differencesTrouvees ++;
            this.message = `Vous avez trouvé ${this.differencesTrouvees} différences`;
            this.audio.src = "../assets/diffTrouvee.mp3";
            this.audio.load();
            this.audio.play().catch(() => ErrorHandler);
        }
        if (this.differenceRestantes === this.differencesTrouvees) {
            this.partieCommence = false;
            this.terminerPartie();
        }
    }

    protected terminerPartie(): void {
        this.chrono.stopTimer();
        this.message = "FELICITATION";
        this.audio.src = "../assets/applause.mp3";
        this.audio.load();
        this.audio.play().catch(() => ErrorHandler);
        this.ajouterTemps(this.chrono.getTime());
    }

    protected abstract ajouterTemps(temps: number);
}
