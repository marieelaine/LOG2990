import {Component} from "@angular/core";
import {PartieService} from "../../partie.service";
import {VueSimpleComponent} from "../vue-simple.component";
import {ActivatedRoute} from "@angular/router";
import {CookieService} from "ngx-cookie-service";

@Component({
    selector: "app-partie-multijoueur",
    templateUrl: "../vue-simple.component.html",
    styleUrls: ["../vue-simple.component.css"],
    providers: [PartieService]
})

export class PartieSimpleMultijoueurComponent extends VueSimpleComponent {

    protected constructor(protected route: ActivatedRoute,
                          protected partieService: PartieService,
                          protected cookieService: CookieService) {
        super(route, partieService, cookieService);
    }

    // TODO partie multijoueur pour le sprint 4
}
