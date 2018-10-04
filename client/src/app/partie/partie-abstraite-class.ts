import { ChronoComponent } from "../chrono/chrono.component";

export abstract class PartieAbstraiteClass {

    protected blur: boolean = true;
    protected chrono: ChronoComponent = new ChronoComponent();
    protected timer: number = 0;

    constructor() { }

    // protected start(): void {
    //     this.blur = false;
    //     const button = document.getElementById("StartButton");
    //     button!.remove();
    //     this.chrono.startTimer();
    //   }

    protected terminerPartie(): void {
        this.chrono.stopTimer();
      }
}
