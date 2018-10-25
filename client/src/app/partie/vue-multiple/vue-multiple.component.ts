import { Component } from '@angular/core';
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
      this.getID();
      this.getPartie();
      this.differenceRestantes = 14;
    }

    protected partieID: string;
    protected partie: PartieMultiple;

    protected getID(): void {
    this.partieID = this.route.snapshot.paramMap.get('idPartie') + "";
  }

    protected getPartie(): void {
      this.partieSimpleService.getPartieMultiple(this.partieID).subscribe((res: PartieMultiple) => {
        this.partie = res;
        this.setup();
      });
    }

    protected setup(): void {
      const data1: string = atob(String(this.partie["_image1PV1"][0]));
      const data2: string = atob(String(this.partie["_image2PV1"][0]));
      const data3: string = atob(String(this.partie["_image1PV2"][0]));
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

    protected testerPourDiff(event): number {

      if (this.partieCommence) {

        let i: number = 0;
        for (const diff of this.partie["_imageDiff"]) {
          for (const coord of diff) {

            if (parseInt(coord.substring(1, 4), 10) === event.offsetX && parseInt(coord.substring(5, 8), 10) === event.offsetY) {
                return i + 1;
            }
          }
          i++;
        }
      }

      return 0;
    }
  }
