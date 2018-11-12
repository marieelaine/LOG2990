import { Component } from '@angular/core';
import { VueMultipleComponent } from '../vue-multiple.component';
import { ActivatedRoute } from '@angular/router';
import { PartieService } from '../../partie.service';

@Component({
  selector: 'app-partie-multiple-multijoueur',
  templateUrl: '../vue-multiple.component.html',
  styleUrls: ['../vue-multiple.component.css']
})
export class PartieMultipleMultijoueurComponent extends VueMultipleComponent {

  constructor(protected route: ActivatedRoute,
              protected partieService: PartieService) {
    super(route, partieService);
  }
}
