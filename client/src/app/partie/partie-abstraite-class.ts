import { ChronoComponent } from "../chrono/chrono.component";

export abstract class PartieAbstraiteClass {

    protected blur: boolean = true;
    protected chrono: ChronoComponent = new ChronoComponent();
    protected message = "Cliquez pour commencer";
    protected differenceRestantes = 7;
    protected partieCommence = false;
    protected audio = new Audio();


    public constructor() {

    }

    protected start(): void {
        this.partieCommence = true;
        this.message = `Il reste ${this.differenceRestantes} différences à trouver`;
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
            this.differenceRestantes -= 1;
            this.message = `Il reste ${this.differenceRestantes} différences à trouver`;
            this.audio.src = "../assets/diffTrouvee.mp3";
            this.audio.load();
            this.audio.play();
        }
        if (this.differenceRestantes === 0) {
            this.partieCommence = false;
            this.terminerPartie();
        }
    }

    protected terminerPartie(): void {
        this.chrono.stopTimer();
        this.message = "FELICITATION";
        this.audio.src = "../assets/applause.mp3";
        this.audio.load();
        this.audio.play();

    }
}
