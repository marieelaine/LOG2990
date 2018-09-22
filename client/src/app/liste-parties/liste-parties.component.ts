import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-liste-parties',
  templateUrl: './liste-parties.component.html',
  styleUrls: ['./liste-parties.component.css']
})
export class ListePartiesComponent implements OnInit {

  partieSimpleDiv: HTMLElement;
  listePartiesSimples: PartieSimple[] = [
    { title: 'Nissan Patrol', imagePath: 'assets/NissanPatrol.jpg', times: [], isElevatedActive: false,
      titleWithoutFirstLetter: this.getTitleWithoutFirstLetter('Nissan Patrol') },
    { title: 'Jerry', imagePath: 'assets/Jerry.png', times: [], isElevatedActive: false,
      titleWithoutFirstLetter: this.getTitleWithoutFirstLetter('Jerry') }
  ];

  listePartiesMultiples: PartieMultiple[] = [
    { title: 'Mona Lisa', imagePath: 'assets/monaLisa.jpg', times: [], isElevatedActive: false,
      titleWithoutFirstLetter: this.getTitleWithoutFirstLetter('Mona Lisa') },
  ];

  getTitleWithoutFirstLetter(title: string): String {
  return title.substr(1, title.length - 1);
}

  constructor() { }

  ngOnInit() {
  }
}

export class PartieSimple {

  title: String;
  imagePath: String;
  times: number[];
  isElevatedActive = false;
  titleWithoutFirstLetter: String;

  constructor() {
  }
}

export class PartieMultiple {

  title: String;
  imagePath: String;
  times: number[];
  isElevatedActive = false;
  titleWithoutFirstLetter: String;

  constructor() {
  }
}
