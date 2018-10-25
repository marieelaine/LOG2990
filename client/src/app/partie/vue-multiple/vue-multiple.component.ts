import {Component, ErrorHandler} from '@angular/core';
import { PartieAbstraiteClass } from "../partie-abstraite-class";
import { ActivatedRoute} from "@angular/router";
import { PartieMultiple} from "../../admin/dialog-multiple/partie-multiple";
import { PartieSimpleService} from "../partie-simple.service";

@Component({
  selector: 'app-vue-multiple',
  templateUrl: './vue-multiple.component.html',
  styleUrls: ['./vue-multiple.component.css']
})
export class VueMultipleComponent extends PartieAbstraiteClass {

    public constructor(private route: ActivatedRoute,
                       protected partieSimpleService: PartieSimpleService
    ) {
      super();
      this.setID();
      this.setPartie();
      this.differenceRestantes = 14;
    }

    protected nomPartie: string;
    protected partieID: string;
    protected partie: PartieMultiple;
    protected diffTrouvee: number[] = [];

    protected setID(): void {
    this.partieID = this.route.snapshot.paramMap.get('idPartie') + "";
  }

    protected setPartie(): void {
      this.partieSimpleService.getPartieMultiple(this.partieID).subscribe((res: PartieMultiple) => {
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

      this.ajusterSourceImage(data1, "imageG1");
      this.ajusterSourceImage(data2, "imageD1");
      this.ajusterSourceImage(data3, "imageG2");
      this.ajusterSourceImage(data4, "imageD2");
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
        this.partieSimpleService.reinitialiserTempsPartie(this.partieID, this.partie["_tempsSolo"], this.partie["_tempsUnContreUn"])
            .catch(() => ErrorHandler);
    }
  }
