import { Component, OnInit } from '@angular/core';
import index from "@angular/cli/lib/cli";

@Component({
  selector: 'app-chrono',
  templateUrl: './chrono.component.html',
  styleUrls: ['./chrono.component.css']
})
export class ChronoComponent implements OnInit {
  secondes: number = 0;
  minutes: number = 0;
  interval;
  running = false;
  secondsString = "00";
  minutesString = "00";

  startTimer() {
      if (!this.running) {
          this.interval = setInterval(() => {
              this.secondes++;
              if (this.secondes > 59){
                  this.secondes = 0;
                  this.minutes++;
              }
              if (this.secondes < 10) {this.secondsString = "0" + this.secondes; }
              else {this.secondsString = this.secondes + ""; }

              if (this.minutes < 10) { this.minutesString = "0" + this.minutes; }
              else {this.minutesString = this.minutes + ""; }

              }, 1000);
          this.running = true;
      }
  }

  stopTimer() {
      this.running = false;
      clearInterval(this.interval);
  }

  constructor() { }

  ngOnInit() {
  }

}
