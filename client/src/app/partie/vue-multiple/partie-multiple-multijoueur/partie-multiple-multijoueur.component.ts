import { Component, ErrorHandler } from '@angular/core';
import { VueMultipleComponent } from '../vue-multiple.component';
import { ActivatedRoute } from '@angular/router';
import { PartieService } from '../../partie.service';
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-partie-multiple-multijoueur',
  templateUrl: '../vue-multiple.component.html',
  styleUrls: ['../vue-multiple.component.css']
})
export class PartieMultipleMultijoueurComponent extends VueMultipleComponent {

    constructor(protected route: ActivatedRoute,
                protected partieService: PartieService,
                protected cookieService: CookieService) {
        super(route, partieService, cookieService);
    }
    // TODO : multijoueur pour le sprint 4
}
