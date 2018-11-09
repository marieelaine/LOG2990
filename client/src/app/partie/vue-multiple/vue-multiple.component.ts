import {Component, ErrorHandler, ViewChildren, ElementRef, QueryList} from '@angular/core';
import { PartieAbstraiteClass } from "../partie-abstraite-class";
import { ActivatedRoute} from "@angular/router";
import { PartieMultiple} from "../../admin/dialog-multiple/partie-multiple";
import { PartieService} from "../partie.service";
import {PartieSimple} from "../../admin/dialog-simple/partie-simple";

@Component({
  selector: 'app-vue-multiple',
  templateUrl: './vue-multiple.component.html',
  styleUrls: ['./vue-multiple.component.css']
})
export class VueMultipleComponent extends PartieAbstraiteClass {

    protected partie: PartieMultiple;

    public constructor(protected route: ActivatedRoute,
                       protected partieService: PartieService) {
        super(route, partieService, false); // TODO FIX MAGIC NUMBER
        this.differenceRestantes = 14;
    }

    protected setPartie(): void {
        this.partieService.getPartieMultiple(this.partieID).subscribe((res: PartieMultiple) => {
            this.partie = res;
            this.getImageData();
            this.setup();
        });
    }

    protected getImageData(): void {
        this.imageData.push(atob(String(this.partie["_image1PV1"][0])));
        this.imageData.push(atob(String(this.partie["_image1PV2"][0])));
        this.imageData.push(atob(String(this.partie["_image2PV1"][0])));
        this.imageData.push(atob(String(this.partie["_image2PV2"][0])));
    }

    protected testerPourDiff(event): void {
        if (this.partieCommence) {

            const coords = "[" + event.offsetX + ", " + event.offsetY + "]";

            let i: number = 0;
            for (const diff of this.partie["_imageDiff"]) {
                for (const pixel of diff) {

                    if (coords === pixel) {
                        if (event.srcElement.id === "canvasD1") {
                            this.differenceTrouver(i, true);
                        } else if (event.srcElement.id === "canvasD2") {
                            this.differenceTrouver(i, false);
                        }
                    }
                }
                i++;
            }
        }
    }

    protected differenceTrouver(i, bool): void {
        if (!this.diffTrouvee.includes(i)) {
            this.diffTrouvee.push(i);
            this.trouverDifference();

            let contextG: CanvasRenderingContext2D;
            let contextD: CanvasRenderingContext2D;

            (bool) ? contextG = this.canvas.toArray()[0].nativeElement.getContext("2d") : contextG =
                this.canvas.toArray()[2].nativeElement.getContext("2d");
            (bool) ? contextD = this.canvas.toArray()[1].nativeElement.getContext("2d") : contextD =
                this.canvas.toArray()[3].nativeElement.getContext("2d");

            const imageDataG = contextG.getImageData(0, 0, 640, 480);
            const dataG = imageDataG.data;
            const imageDataD = contextD.getImageData(0, 0, 640, 480);
            const dataD = imageDataD.data;

            for (const pixel of this.partie["_imageDiff"][i]) {
                const x: number = Number(pixel.split(",")[0]);
                const y: number = Number(pixel.split(",")[1]);
                const dim = (y * 640 * 4) + (x * 4);

                dataD[dim] = dataG[dim];
                dataD[dim + 1] = dataG[dim + 1];
                dataD[dim + 2] = dataG[dim + 2];
            }
            contextD.putImageData(imageDataD, 0, 0);
        }
    }
}
