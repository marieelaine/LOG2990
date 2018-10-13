import { Component, OnInit} from '@angular/core';
import { PartieAbstraiteClass } from '../partie-abstraite-class';
import { ImageComponent } from '../image/image.component';
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

    imageComp: ImageComponent[] = [new ImageComponent("../../assets/Jerry.bmp"), new ImageComponent("../../assets/Jerry.bmp")];

    idImage: number;

    protected getImage(): void {
        // @ts-ignore
        this.idImage = +this.route.snapshot.paramMap.get('idImage');
    }

    ngOnInit() {
        this.getImage();
    }
}
