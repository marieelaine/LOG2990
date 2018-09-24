import { Component, OnInit } from '@angular/core';
import { PartieSimpleInterface } from './partie-simple/partie-simple.component';
import { PartieMultipleComponent, PartieMultipleInterface } from './partie-multiple/partie-multiple.component';

@Component({
  selector: 'app-liste-parties',
  templateUrl: './liste-parties.component.html',
  styleUrls: ['./liste-parties.component.css']
})
export class ListePartiesComponent implements OnInit {

  partieSimpleDiv: HTMLElement;
  listePartiesSimples: PartieSimpleComponent[] = [
    { title: 'Nissan Patrol', imagePath: 'assets/NissanPatrol.bmp', isElevatedActive: false,
      timesSolo: [320, 500], timesOneVsOne: [],
      },
    { title: 'Jerry', imagePath: 'assets/Jerry.bmp',  isElevatedActive: false,
      timesSolo: [550, 302, 419, 3141], timesOneVsOne: [41241, 412, 52, 5235, 552],
      }  ];

  listePartiesMultiples: PartieMultipleComponent[] = [
    { title: 'Mona Lisa', imagePath: 'assets/monaLisa.bmp', isElevatedActive: false,
      timesSolo: [312, 415, 6462, 1], timesOneVsOne: [312, 3],
    }  ];

  constructor() { }

  ngOnInit() {
  }
}
