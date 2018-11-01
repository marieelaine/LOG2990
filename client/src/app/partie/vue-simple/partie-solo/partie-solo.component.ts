import { Component, ErrorHandler, ViewChild, ElementRef } from '@angular/core';
import { PartieAbstraiteClass } from '../../partie-abstraite-class';
import { ActivatedRoute} from "@angular/router";
import { PartieSimple} from "../../../admin/dialog-simple/partie-simple";
import { PartieService} from "../../partie.service";

@Component({
    selector: 'app-partie-solo',
    templateUrl: './partie-solo.component.html',
    styleUrls: ['./partie-solo.component.css'],
    providers: [PartieService]
})

export class PartieSoloComponent extends PartieAbstraiteClass {

    @ViewChild('canvasG') canvasG: ElementRef;
    @ViewChild('canvasD') canvasD: ElementRef;
    protected imageG: HTMLImageElement;
    protected imageD: HTMLImageElement;
    protected partieID: string;
    protected nomPartie: string;
    protected partie: PartieSimple;

    public constructor(private route: ActivatedRoute,
                       protected partieService: PartieService) {
        super();
        this.differenceRestantes = 7;
        this.imageG = new Image();
        this.imageD = new Image();
        this.setID();
        this.setPartie();
    }

    protected diffTrouvee: number[] = [];
    protected setID(): void {
        this.partieID = this.route.snapshot.paramMap.get('idPartie') + "";
    }

    protected setPartie(): void {
        this.partieService.getPartieSimple(this.partieID).subscribe((res: PartieSimple) => {
            this.partie = res;
            this.setup();
        });
    }

    protected setup(): void {
        this.nomPartie = this.partie["_nomPartie"].charAt(0).toUpperCase() + this.partie["_nomPartie"].slice(1);

        const data1: string = atob(String(this.partie["_image1"][0]));
        const data2: string = atob(String(this.partie["_image2"][0]));

        this.ajusterSourceImage(data1, this.canvasG, this.imageG);
        this.ajusterSourceImage(data2, this.canvasD, this.imageD);

    }

    protected ajusterSourceImage(data: String, canvas: ElementRef, image: HTMLImageElement): void {
        let hex = 0x00;
        const result: Uint8Array = new Uint8Array(data.length);

        for (let i  = 0; i < data.length; i++) {
            hex = data.charCodeAt(i);
            result[i] = hex;
        }
        const blob = new Blob([result], {type: 'image/bmp'});

        const context: CanvasRenderingContext2D = canvas.nativeElement.getContext("2d");
        image.src = URL.createObjectURL(blob);
        image.onload = () => {
            context.drawImage(image, 0, 0);
        };
    }

    protected testerPourDiff(event): void {

        if (this.partieCommence) {

            const coords = event.offsetX + "," + event.offsetY;

            let i: number = 0;
            for (const diff of this.partie["_imageDiff"]) {
                for (const pixel of diff) {

                    if (coords === pixel) {

                        this.differenceTrouver(i);
                        console.log(coords);
                    }
                }
                i++;
            }
        }
    }

    protected differenceTrouver(i): void {
        if (!this.diffTrouvee.includes(i)) {
            this.diffTrouvee.push(i);
            this.trouverDifference();

            const contextG = this.canvasG.nativeElement.getContext("2d");
            const imageDataG = contextG.getImageData(0, 0, 640, 480);
            const dataG = imageDataG.data;

            const contextD = this.canvasD.nativeElement.getContext("2d");
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

    protected ajouterTemps(temps: number): void {
        this.partie["_tempsSolo"].push(temps);
        this.partieService.reinitialiserTempsPartie(this.partieID, this.partie["_tempsSolo"], this.partie["_tempsUnContreUn"])
        .catch(() => ErrorHandler);
    }

}
