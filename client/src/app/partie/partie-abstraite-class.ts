import { ChronoComponent } from "../chrono/chrono.component";

export abstract class PartieAbstraiteClass {

    protected blur: boolean = true;
    protected chrono: ChronoComponent = new ChronoComponent();
    protected timer: number = 0;
    message = 'Cliquez pour commencer';
    differenceRestentes = 7;
    partieCommence = false;

    constructor() { }

    protected start() {
        this.partieCommence = true;
        this.message = `Il reste ${this.differenceRestentes} differences a trouver`;
        this.blur = false;
        const button = document.getElementById("StartButton");
        // tslint:disable-next-line:no-non-null-assertion
        button!.remove();
        this.chrono.startTimer();
    }

    trouverDifference() {
        if (this.partieCommence) {
            this.differenceRestentes -= 1;
            this.message = `Il reste ${this.differenceRestentes} differences a trouver`;
        }
        if (this.differenceRestentes === 0) {
            this.partieCommence = false;
            this.terminerPartie();
        }
    }

    protected terminerPartie(): void {
        this.chrono.stopTimer();
    }
}