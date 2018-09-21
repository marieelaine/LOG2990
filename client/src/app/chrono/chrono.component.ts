import { Component, OnInit } from '@angular/core';
import index from "@angular/cli/lib/cli";

@Component({
  selector: 'app-chrono',
  templateUrl: './chrono.component.html',
  styleUrls: ['./chrono.component.css']
})
export class ChronoComponent implements OnInit {
  time: number = 0  
  interval;
  running = false;

  startTimer() {
      if (!this.running) {
          this.interval = setInterval(() => {
              this.time++;
              }, 1000);
          this.running = true;
      }
  }

  getSecondsSrtring(): string {
      if (this.time % 60 < 10) { return "0" + this.time % 60; }
      else { return this.time % 60 + ""; }
  }

  getMinutesString(): string {  
      if (this.time / 60 < 10) { return "0" + Math.floor(this.time / 60);}
      else {return Math.floor(this.time / 60) + ""}
  }

  stopTimer() {
      this.running = false;
      clearInterval(this.interval);
  }

  getTime(): number {
      return this.time ;
  }

  reset(){
      this.time = 0;
      this.running = false;
      clearInterval(this.interval);
  }

  constructor() { }

  ngOnInit() {
  }

}
