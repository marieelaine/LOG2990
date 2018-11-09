import { Component, ErrorHandler } from '@angular/core';
import { PartieAbstraiteClass } from '../partie-abstraite-class';
import { PartieSimple } from 'src/app/admin/dialog-simple/partie-simple';
import { ActivatedRoute } from '@angular/router';
import { PartieService } from '../partie.service';

@Component({
  selector: 'app-vue-simple',
  templateUrl: './vue-simple.component.html',
  styleUrls: ['./vue-simple.component.css']
})
export class VueSimpleComponent extends PartieAbstraiteClass {

  protected partie: PartieSimple;

  public constructor(protected route: ActivatedRoute,
                     protected partieService: PartieService) {
      super(route, partieService, true); // TODO FIX MAGIC NUMBER
      this.differenceRestantes = 7;
  }

  protected setPartie(): void {
      this.partieService.getPartieSimple(this.partieID).subscribe((res: PartieSimple) => {
          this.partie = res;
          this.getImageData();
          this.setup();
      });
  }

  protected getImageData(): void {
      this.imageData.push(atob(String(this.partie["_image1"][0])));
      this.imageData.push(atob(String(this.partie["_image2"][0])));
  }

  protected testerPourDiff(offsetX, offsetY): void {
      if (this.partieCommence) {

          const coords = offsetX + "," + offsetY;
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

          const contextG = this.canvas.toArray()[0].nativeElement.getContext("2d");
          const imageDataG = contextG.getImageData(0, 0, 640, 480);
          const dataG = imageDataG.data;

          const contextD = this.canvas.toArray()[1].nativeElement.getContext("2d");
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
