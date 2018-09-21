import { Component, OnInit } from '@angular/core';
import { PartieSimple } from './partie-simple/partie-simple.component';

@Component({
  selector: 'app-liste-parties',
  templateUrl: './liste-parties.component.html',
  styleUrls: ['./liste-parties.component.css']
})
export class ListePartiesComponent implements OnInit {

  partieSimpleDiv: HTMLElement;
  listeParties: PartieSimple[] = [
    { title: 'Nissan Patrol', imagePath: 'assets/NissanPatrol.jpg' },
    { title: 'Jeep Patrol', imagePath: 'assets/NissanPatrol.jpg' }
];

  constructor() { }

  ngOnInit() {
  }

  // addGameListToHtml() {
  //   this.listeParties.forEach( (partieSimple) => {
  //     this.partieSimpleDiv = document.getElementById('listePartiesSimples') as HTMLElement;
  //     this.partieSimpleDiv.appendChild(document.createTextNode(this.getHtmlComponentByGameTitle(partieSimple.title)));
  //   });
  // }

  // getHtmlComponentByGameTitle(gameTitle: string) {
  //   const gameTitleWithDashes = gameTitle.replace(" ", "-").toLowerCase();
  //   console.log(gameTitleWithDashes);

  //   return "<app-" + gameTitleWithDashes + "></app-" + gameTitleWithDashes + ">";
  // }
}
