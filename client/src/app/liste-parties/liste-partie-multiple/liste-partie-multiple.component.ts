import { Component } from '@angular/core';
import { ListePartiesComponent } from '../liste-parties.component';
import { Router } from '@angular/router';
import {ListePartieServiceService} from "../liste-partie-service.service";

export interface PartieMultipleInterface {
  title: String;
  imagePath: String;
  timesSolo: number[];
  timesOneVsOne: number[];
  isElevatedActive: boolean;
  idPartie: number;
}

@Component({
  selector: 'app-liste-partie-multiple',
  templateUrl: './liste-partie-multiple.component.html',
  styleUrls: ['./liste-partie-multiple.component.css']
})
export class ListePartieMultipleComponent extends ListePartiesComponent {
  constructor(public router: Router,
              public listePartieService: ListePartieServiceService) {
    super(router, listePartieService);
    console.log(this.listePartieService);
    console.log('helloo');
    this.listePartieService.getListeImageSimple();
  }
}
