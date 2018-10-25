import { Component, OnInit} from '@angular/core';
import { PartieAbstraiteClass } from '../../partie-abstraite-class';
import { ActivatedRoute} from "@angular/router";
import { PartieSimple} from "../../../admin/dialog-simple/partie-simple";
import { PartieSimpleService} from "../../partie-simple.service";
import {createElement} from "@angular/core/src/view/element";
import {toBase64String} from "@angular/compiler/src/output/source_map";

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
        this.differenceRestantes = 7;
    }

    protected partieID: string;
    protected partie: PartieSimple;
    protected diffTrouvee: number[] = [];

    protected getID(): void {
        this.partieID = this.route.snapshot.paramMap.get('idPartie') + "";
    }

    protected getPartie(): void {
        this.partieSimpleService.getPartieSimple(this.partieID).subscribe((res: PartieSimple) => {
            this.partie = res;
            this.setup();
        });
    }

    protected setup(): void {
        const data1: string = atob(String(this.partie["_image1"][0]));
        const data2: string = atob(String(this.partie["_image2"][0]));

        this.ajusterSourceImage(data1, "imageG");
        this.ajusterSourceImage(data2, "imageD");

    }

    protected ajusterSourceImage(data: String, id: String): void {
        let hex = 0x00;
        const result: Uint8Array = new Uint8Array(data.length);

        for (let i  = 0; i < data.length; i++) {
            hex = data.charCodeAt(i);
            result[i] = hex;
        }
        const blob = new Blob([result], {type: 'image/bmp'});
        // @ts-ignore
        document.getElementById(id).src = URL.createObjectURL(blob);
    }

    protected testerPourDiff(event): number {

        if (this.partieCommence) {

            const coords = "[" + event.offsetX + ", " + event.offsetY + "]";
            console.log(coords)

            let i: number = 0;
            for (const diff of this.partie["_imageDiff"]) {
                for (const pixel of diff) {

                    if (coords === pixel) {
                        this.differenceTrouver(i);
                    }
                }
                i++;
            }
        }

        return 0;
    }

    protected differenceTrouver(i) {
        if (!this.diffTrouvee.includes(i)) {
            this.diffTrouvee.push(i);
            this.trouverDifference();
        }
    }

}
