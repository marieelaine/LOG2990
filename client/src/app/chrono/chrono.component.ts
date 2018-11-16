import { Component } from '@angular/core';

@Component({
  selector: 'app-chrono',
  templateUrl: './chrono.component.html',
  styleUrls: ['./chrono.component.css']
})
export class ChronoComponent {
    protected time: number;
    protected interval: NodeJS.Timer;
    protected running: boolean;

    public constructor() {
        this.time = 0;
        this.running = false;
    }

    protected getSecondsSrtring(): string {
        return (this.time % 60 < 10) ? "0" + this.time % 60 : this.time % 60 + "";
    }

    protected getMinutesString(): string {
        return (this.time / 60 < 10) ? "0" + Math.floor(this.time / 60) : Math.floor(this.time / 60) + "";
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
            this.interval = setInterval(() => { this.time++; }, 1000);
            this.running = true;
        }
    }
}
