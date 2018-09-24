import { Component, OnInit } from '@angular/core';
import { element } from '@angular/core/src/render3/instructions';
import { ChronoComponent } from "../chrono/chrono.component"

@Component({
  selector: 'app-partie-solo',
  templateUrl: './partie-solo.component.html',
  styleUrls: ['./partie-solo.component.css']
})
export class PartieSoloComponent implements OnInit {

  blur: boolean = true;
  chrono: ChronoComponent = new ChronoComponent();
  timer: number = 0;
  

  constructor() { }

  start(){
    this.blur = false;
    let button = document.getElementById("StartButton");
    button!.remove();
    this.chrono.startTimer();
  }

  terminerPartie(){
    this.chrono.stopTimer();
  }


  ngOnInit() {
  }

}
