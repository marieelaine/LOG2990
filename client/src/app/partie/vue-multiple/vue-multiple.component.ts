import {Component, ErrorHandler, ViewChild, ElementRef} from '@angular/core';
import { PartieAbstraiteClass } from "../partie-abstraite-class";
import { ActivatedRoute} from "@angular/router";
import { PartieMultiple} from "../../admin/dialog-multiple/partie-multiple";
import { PartieService} from "../partie.service";

@Component({
  selector: 'app-vue-multiple',
  templateUrl: './vue-multiple.component.html',
  styleUrls: ['./vue-multiple.component.css']
})
export class VueMultipleComponent extends PartieAbstraiteClass {

    public constructor(private route: ActivatedRoute,
                       protected partieService: PartieService
    ) {
      super();
      this.setID();
      this.setPartie();
      this.differenceRestantes = 14;
      this.imageG1 = new Image();
      this.imageD1 = new Image();
      this.imageG2 = new Image();
      this.imageD2 = new Image();
    }

    @ViewChild('canvasG1') canvasG1: ElementRef;
    @ViewChild('canvasD1') canvasD1: ElementRef;
    @ViewChild('canvasG2') canvasG2: ElementRef;
    @ViewChild('canvasD2') canvasD2: ElementRef;
    protected imageG1: HTMLImageElement;
    protected imageD1: HTMLImageElement;
    protected imageG2: HTMLImageElement;
    protected imageD2: HTMLImageElement;
    protected nomPartie: string;
    protected partieID: string;
    protected partie: PartieMultiple;
    protected diffTrouvee: number[] = [];

    protected setID(): void {
    this.partieID = this.route.snapshot.paramMap.get('idPartie') + "";
    }

    protected setPartie(): void {
      this.partieService.getPartieMultiple(this.partieID).subscribe((res: PartieMultiple) => {
        this.partie = res;
        this.setup();
      });
    }

    protected setup(): void {
      this.addNomPartieToChat();

      const data1: string = atob(String(this.partie["_image1PV1"][0]));
      const data2: string = atob(String(this.partie["_image1PV2"][0]));
      const data3: string = atob(String(this.partie["_image2PV1"][0]));
      const data4: string = atob(String(this.partie["_image2PV2"][0]));

      this.ajusterSourceImage(data1, this.canvasG1, this.imageG1);
      this.ajusterSourceImage(data2, this.canvasD1, this.imageD1);
      this.ajusterSourceImage(data3, this.canvasG2, this.imageG2);
      this.ajusterSourceImage(data4, this.canvasD2, this.imageD2);
    }

    protected addNomPartieToChat() {
        this.nomPartie = this.partie["_nomPartie"];
        this.messagesChat.push("Bienvenue dans la partie " + this.nomPartie.charAt(0).toUpperCase() + this.partie["_nomPartie"].slice(1));
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

            const coords = "[" + event.offsetX + ", " + event.offsetY + "]";
            console.log(coords);

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

            (bool) ? contextG = this.canvasG1.nativeElement.getContext("2d") : contextG = this.canvasG2.nativeElement.getContext("2d");
            (bool) ? contextD = this.canvasD1.nativeElement.getContext("2d") : contextD = this.canvasD2.nativeElement.getContext("2d");

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

    protected ajouterTemps(temps: number): void {
        this.partie["_tempsSolo"].push(temps);
        this.partieService.reinitialiserTempsPartie(this.partieID, this.partie["_tempsSolo"], this.partie["_tempsUnContreUn"])
            .catch(() => ErrorHandler);
    }
}
