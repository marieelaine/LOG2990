import { Component, OnInit } from '@angular/core';
import { PartieSimpleComponent } from './partie-simple/partie-simple.component';
import { PartieMultipleComponent } from './partie-multiple/partie-multiple.component';

@Component({
  selector: 'app-liste-parties',
  templateUrl: './liste-parties.component.html',
  styleUrls: ['./liste-parties.component.css']
})
export class ListePartiesComponent implements OnInit {

  partieSimpleDiv: HTMLElement;
  listePartiesSimples: PartieSimpleComponent[] = [
    { title: 'Nissan Patrol', imagePath: 'assets/NissanPatrol.jpg', isElevatedActive: false,
      timesSolo: [320, 500], timesOneVsOne: [],
      titleWithoutFirstLetter: this.getTitleWithoutFirstLetter('Nissan Patrol') },

    { title: 'Jerry', imagePath: 'assets/Jerry.png',  isElevatedActive: false,
      timesSolo: [550, 302, 419, 3141], timesOneVsOne: [41241, 412, 52, 5235, 552],
      titleWithoutFirstLetter: this.getTitleWithoutFirstLetter('Jerry') }
  ];

  listePartiesMultiples: PartieMultipleComponent[] = [
    { title: 'Mona Lisa', imagePath: 'assets/monaLisa.jpg', isElevatedActive: false,
      timesSolo: [312, 415, 6462, 1], timesOneVsOne: [312, 3],
      titleWithoutFirstLetter: this.getTitleWithoutFirstLetter('Mona Lisa') }
  ];

  getTitleWithoutFirstLetter(title: String): String {
  return title.substr(1, title.length - 1);
  }

  constructor() { }

  ngOnInit() {
  }
}
