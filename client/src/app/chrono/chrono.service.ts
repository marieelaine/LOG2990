import { Injectable } from "@angular/core";

const NB_SECONDES: number = 60;
const UNE_SECONDE: number = 1000;
const DISPLAY: number = 10;

@Injectable({
  providedIn: "root"
})
export class ChronoService {
    protected time: number;
    protected interval: NodeJS.Timer;
    protected running: boolean;

    public constructor() {
        this.time = 0;
        this.running = false;
    }

    protected getSecondsSrtring(): string {
        return (this.time % NB_SECONDES < DISPLAY) ? "0" + this.time % NB_SECONDES : this.time % NB_SECONDES + "";
    }

    protected getMinutesString(): string {
        return (this.time / NB_SECONDES < DISPLAY) ? "0" + Math.floor(this.time / NB_SECONDES) : Math.floor(this.time / NB_SECONDES) + "";
    }

    protected reset(): void {
        this.time = 0;
        this.running = false;
        clearInterval(this.interval);
    }

    public stopTimer(): void {
        this.running = false;
        clearInterval(this.interval);
    }

    public getTime(): number {
        return this.time ;
    }

    public startTimer(): void {
        if (!this.running) {
            this.interval = setInterval(() => { this.time++; }, UNE_SECONDE);
            this.running = true;
        }
    }
}
