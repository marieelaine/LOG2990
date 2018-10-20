import { Component, OnInit } from '@angular/core';
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
export class ListePartieMultipleComponent extends ListePartiesComponent implements OnInit {
  constructor(public router: Router,
              public listePartieService: ListePartieServiceService) {
    super(router, listePartieService);
  }

  ngOnInit() {

  }
}
