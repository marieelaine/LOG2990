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
    }

    @ViewChild('canvasG1') canvasG1: ElementRef;
    @ViewChild('canvasD1') canvasD1: ElementRef;
    @ViewChild('canvasG2') canvasG2: ElementRef;
    @ViewChild('canvasD2') canvasD2: ElementRef;
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
      this.nomPartie = this.partie["_nomPartie"].charAt(0).toUpperCase() + this.partie["_nomPartie"].slice(1);

      const data1: string = atob(String(this.partie["_image1PV1"][0]));
      const data2: string = atob(String(this.partie["_image1PV2"][0]));
      const data3: string = atob(String(this.partie["_image2PV1"][0]));
      const data4: string = atob(String(this.partie["_image2PV2"][0]));

      this.ajusterSourceImage(data1, this.canvasG1);
      this.ajusterSourceImage(data2, this.canvasD1);
      this.ajusterSourceImage(data3, this.canvasG2);
      this.ajusterSourceImage(data4, this.canvasD2);
    }

    protected ajusterSourceImage(data: String, canvas: ElementRef): void {
        let hex = 0x00;
        const result: Uint8Array = new Uint8Array(data.length);

        for (let i  = 0; i < data.length; i++) {
            hex = data.charCodeAt(i);
            result[i] = hex;
        }
        const blob = new Blob([result], {type: 'image/bmp'});

        const context = canvas.nativeElement.getContext("2d");
        const image = new Image();
        image.src = URL.createObjectURL(blob);
        image.onload = () => {
            context.drawImage(image, 0, 0);
            const imageData = context.getImageData(0, 0, 300, 311);
            console.log(imageData);
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
                        this.differenceTrouver(i);
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
        }
    }

    protected ajouterTemps(temps: number): void {
        this.partie["_tempsSolo"].push(temps);
        this.partieService.reinitialiserTempsPartie(this.partieID, this.partie["_tempsSolo"], this.partie["_tempsUnContreUn"])
            .catch(() => ErrorHandler);
    }
}
