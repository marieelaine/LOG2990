import { Component, OnInit} from '@angular/core';
import { PartieAbstraiteClass } from '../partie-abstraite-class';
import { ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-partie-solo',
    templateUrl: './partie-solo.component.html',
    styleUrls: ['./partie-solo.component.css']
})

export class PartieSoloComponent extends PartieAbstraiteClass {

    protected idPartie: number;

    public constructor(private route: ActivatedRoute) {
        super();
    }

}
