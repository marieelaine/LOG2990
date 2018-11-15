import {Component, ErrorHandler} from "@angular/core";
import { PartieAbstraiteClass } from "../partie-abstraite-class";
import { ActivatedRoute} from "@angular/router";
import { PartieMultiple} from "../../admin/dialog-multiple/partie-multiple";
import { PartieService} from "../partie.service";
import {CookieService} from "ngx-cookie-service";
import * as constantes from "../../constantes";

@Component({
  selector: "app-vue-multiple",
  templateUrl: "./vue-multiple.component.html",
  styleUrls: ["./vue-multiple.component.css"]
})
export class VueMultipleComponent extends PartieAbstraiteClass {

    protected partie: PartieMultiple;

    public constructor(protected route: ActivatedRoute,
                       protected partieService: PartieService,
                       protected cookieService: CookieService) {
        super(route, partieService, cookieService, false);
        this.differenceRestantes = constantes.DIFF_PARTIE_MULTIPLE;
    }

    protected ajouterTemps(temps: number): void {
        this.updateTableauTempsSolo(temps);
        this.partieService.reinitialiserTempsPartieMultiple(this.partieID, this.partie["_tempsSolo"], this.partie["_tempsUnContreUn"])
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

    protected testerPourDiff(event: MouseEvent): void {
        if (this.partieCommence && !this.penaliteEtat) {

            const coords: string = event.offsetX + "," + event.offsetY;
            const srcElem: Element = event.srcElement as Element;
            const source: string = srcElem.id === "canvasG1" || srcElem.id === "canvasD1"
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
            contextG = this.canvas.toArray()[constantes.CONTEXT_GAUCHE_POV1_POSITION].nativeElement.getContext("2d");
            contextD = this.canvas.toArray()[constantes.CONTEXT_DROITE_POV1_POSITION].nativeElement.getContext("2d");
        } else {
            contextG = this.canvas.toArray()[constantes.CONTEXT_GAUCHE_POV2_POSITION].nativeElement.getContext("2d");
            contextD = this.canvas.toArray()[constantes.CONTEXT_DROITE_POV2_POSITION].nativeElement.getContext("2d");
        }
        const imageDataG: ImageData = contextG.getImageData(0, 0, constantes.WINDOW_WIDTH, constantes.WINDOW_HEIGHT);
        const dataG: Uint8ClampedArray = imageDataG.data;
        const imageDataD: ImageData = contextD.getImageData(0, 0, constantes.WINDOW_WIDTH, constantes.WINDOW_HEIGHT);
        const dataD: Uint8ClampedArray = imageDataD.data;

        for (const pixel of this.partie[src][i]) {
            const x: number = Number(pixel.split(",")[0]);
            const y: number = Number(pixel.split(",")[1]);
            const dim: number = (y * constantes.WINDOW_WIDTH * constantes.RGB_WIDTH) + (x * constantes.RGB_WIDTH);
            dataD[dim] = dataG[dim];
            dataD[dim + constantes.RGB_FIRST_INCREMENT] = dataG[dim + constantes.RGB_FIRST_INCREMENT];
            dataD[dim + constantes.RGB_SECOND_INCREMENT] = dataG[dim + constantes.RGB_SECOND_INCREMENT];
        }
        contextD.putImageData(imageDataD, 0, 0);
    }
}
