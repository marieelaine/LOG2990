import {Component, ErrorHandler} from '@angular/core';
import { PartieAbstraiteClass } from "../partie-abstraite-class";
import { ActivatedRoute} from "@angular/router";
import { PartieMultiple} from "../../admin/dialog-multiple/partie-multiple";
import { PartieService} from "../partie.service";
import {TempsUser} from "../../admin/dialog-abstrait";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-vue-multiple',
  templateUrl: './vue-multiple.component.html',
  styleUrls: ['./vue-multiple.component.css']
})
export class VueMultipleComponent extends PartieAbstraiteClass {

    protected partie: PartieMultiple;

    public constructor(protected route: ActivatedRoute,
                       protected partieService: PartieService,
                       protected cookieService: CookieService) {
        super(route, partieService, cookieService, false);
        this.differenceRestantes = 14;
    }

    // TODO
    protected ajouterTemps(temps: number): void {
        this.updateTableauTemps(temps);
        this.partieService.reinitialiserTempsPartieSimple(this.partieID, this.partie["_tempsSolo"], this.partie["_tempsUnContreUn"])
        .catch(() => ErrorHandler);
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
        if (this.partieCommence && !this.penaliteEtat) {

            const coords = event.offsetX + "," + event.offsetY;
            const source: string = event.srcElement.id === "canvasG1" || event.srcElement.id === "canvasD1"
                ? "_imageDiff1"
                : "_imageDiff2";

            let i: number = 0;
            for (const diff of this.partie[source]) {
                for (const pixel of diff) {
                    if (coords === pixel) {
                        if (!this.diffTrouvee[0].includes(i) && source === "_imageDiff1"
                            || !this.diffTrouvee[1].includes(i) && source === "_imageDiff2") {
                            this.differenceTrouver(i, source);

                            return;
                        }
                    }
                }
                i++;
            }
            this.penalite(event);
        }
    }

    protected differenceTrouver(i: number, src: string): void {
        src === "_imageDiff1" ? this.diffTrouvee[0].push(i) : this.diffTrouvee[1].push(i);
        this.trouverDifference();

        let contextG: CanvasRenderingContext2D;
        let contextD: CanvasRenderingContext2D;
        if (src === "_imageDiff1") {
            contextG = this.canvas.toArray()[0].nativeElement.getContext("2d");
            contextD = this.canvas.toArray()[1].nativeElement.getContext("2d");
        } else {
            contextG = this.canvas.toArray()[2].nativeElement.getContext("2d");
            contextD = this.canvas.toArray()[3].nativeElement.getContext("2d");
        }
        const imageDataG = contextG.getImageData(0, 0, 640, 480);
        const dataG = imageDataG.data;
        const imageDataD = contextD.getImageData(0, 0, 640, 480);
        const dataD = imageDataD.data;

        for (const pixel of this.partie[src][i]) {
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
