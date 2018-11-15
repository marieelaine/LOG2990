import { Component } from '@angular/core';
import { VueMultipleComponent } from '../vue-multiple.component';
import { ActivatedRoute } from '@angular/router';
import { PartieService } from '../../partie.service';
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-partie-multiple-solo',
  templateUrl: '../vue-multiple.component.html',
  styleUrls: ['../vue-multiple.component.css']
})
export class PartieMultipleSoloComponent extends VueMultipleComponent {

    constructor(protected route: ActivatedRoute,
                protected partieService: PartieService,
                protected cookieService: CookieService) {
        super(route, partieService, cookieService);
    }

}
