import { Component, OnInit} from '@angular/core';
import { PartieAbstraiteClass } from '../partie-abstraite-class';
import { ImageInterface } from '../image/image.component';
import { ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-partie-solo',
    templateUrl: './partie-solo.component.html',
    styleUrls: ['./partie-solo.component.css']
})

export class PartieSoloComponent extends PartieAbstraiteClass implements OnInit {
    constructor(
        private route: ActivatedRoute,
    ) {
        super(); }

    imageComp: ImageInterface[] = [
        {path: "../../assets/Jerry.bmp"},
        {path: "../../assets/Jerry.bmp"}
    ];

    idPartie: number;

    protected getImage(): void {
        // @ts-ignore
        this.idPartie = +this.route.snapshot.paramMap.get('idPartie');
    }

    ngOnInit() {
        this.getImage();
    }
}
