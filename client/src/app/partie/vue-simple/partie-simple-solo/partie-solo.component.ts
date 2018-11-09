import { Component } from '@angular/core';
import { PartieService} from "../../partie.service";
import { VueSimpleComponent } from '../vue-simple.component';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-partie-solo',
    templateUrl: '../vue-simple.component.html',
    styleUrls: ['../vue-simple.component.css'],
    providers: [PartieService]
})

export class PartieSimpleSoloComponent extends VueSimpleComponent {

    constructor(protected route: ActivatedRoute,
                protected partieService: PartieService) {

        super(route, partieService);
    }
}