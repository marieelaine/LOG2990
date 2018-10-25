import { ChronoComponent } from "../chrono/chrono.component";

export abstract class PartieAbstraiteClass {

    protected blur: boolean = true;
    protected chrono: ChronoComponent = new ChronoComponent();
    protected message = "Cliquez pour commencer";
    protected differenceRestantes = 7;
    protected partieCommence = false;

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
            this.message = `Il reste ${this.differenceRestantes} differences a trouver`;
        }
        if (this.differenceRestantes === 0) {
            this.partieCommence = false;
            this.terminerPartie();
        }
    }

    protected terminerPartie(): void {
        this.chrono.stopTimer();
    }
}
