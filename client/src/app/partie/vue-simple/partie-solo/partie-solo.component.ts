import { Component, OnInit} from '@angular/core';
import { PartieAbstraiteClass } from '../../partie-abstraite-class';
import { ActivatedRoute} from "@angular/router";
import { PartieSimple} from "../../../admin/dialog-simple/partie-simple";
import { PartieSimpleService} from "../../partie-simple.service";
import {createElement} from "@angular/core/src/view/element";

@Component({
    selector: 'app-partie-solo',
    templateUrl: './partie-solo.component.html',
    styleUrls: ['./partie-solo.component.css'],
    providers: [PartieSimpleService]
})

export class PartieSoloComponent extends PartieAbstraiteClass {

    public constructor(private route: ActivatedRoute,
                       protected partieSimpleService: PartieSimpleService
    ) {
        super();
        this.getID();
        this.getPartie();
    }

    protected partieID: string;
    protected partie: PartieSimple;
    protected image1: Blob;
    protected image2: Blob;
    image = new Image();

    protected getID(): void {
        // this.partieID = this.route.snapshot.paramMap.get('idPartie');
        this.partieID = "5bcfeab96b82573740791a99" +
            "";
    }

    protected getPartie(): void {
        this.partieSimpleService.getPartieSimple(this.partieID).subscribe((res: PartieSimple) => {
            this.partie = res;
            this.setup();
        });
    }

    protected setup(): void {
        const Buffer = require("buffer/").Buffer;
        const bufferA = Buffer.from(this.partie._image1);
        const bufferB = Buffer.from(this.partie._image2);

        const image1Uint8Array = new Array();
        for (const data of bufferA) {
            image1Uint8Array.push(data);
        }

        const image2Uint8Array = new Array();
        for (const data of bufferB) {
            image1Uint8Array.push(data);
        }

        this.image1 = new Blob(image1Uint8Array, {type : "image/bmp"});
        this.image2 = new Blob(image2Uint8Array, {type : "image/bmp"});

        this.image.src = URL.createObjectURL(this.image1);
        document.body.appendChild(this.image);

    }
}
