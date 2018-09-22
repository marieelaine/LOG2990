import { Component, OnInit } from '@angular/core';
import { PartieSimpleComponent } from './partie-simple/partie-simple.component';

@Component({
  selector: 'app-liste-parties',
  templateUrl: './liste-parties.component.html',
  styleUrls: ['./liste-parties.component.css']
})
export class ListePartiesComponent implements OnInit {

  partieSimpleDiv: HTMLElement;
  listeParties: PartieSimpleComponent[] = [
    { title: 'Nissan Patrol', imagePath: 'assets/NissanPatrol.jpg', times: [], isElevatedActive: false,
      titleWithoutFirstLetter: this.getTitleWithoutFirstLetter('Nissan Patrol') },
    { title: 'Jerry', imagePath: 'assets/Jerry.png', times: [], isElevatedActive: false,
      titleWithoutFirstLetter: this.getTitleWithoutFirstLetter('Jerry') }
];

  getTitleWithoutFirstLetter(title: string): String {
  return title.substr(1, title.length - 1);
}

  constructor() { }

  ngOnInit() {
  }
}
