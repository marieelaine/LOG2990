import {Component, ErrorHandler} from '@angular/core';
import { PartieAbstraiteClass } from '../../partie-abstraite-class';
import { ActivatedRoute} from "@angular/router";
import { PartieSimple} from "../../../admin/dialog-simple/partie-simple";
import { PartieSimpleService} from "../../partie-simple.service";

@Component({
    selector: 'app-partie-multijoueur',
    templateUrl: './partie-multijoueur.component.html',
    styleUrls: ['./partie-multijoueur.component.css'],
    providers: [PartieSimpleService]
})

export class PartieMultijoueurComponent extends PartieAbstraiteClass {

    protected partieID: string;
    protected nomPartie: string;
    protected partie: PartieSimple;

    public constructor(private route: ActivatedRoute,
                       protected partieSimpleService: PartieSimpleService) {
        super();
        this.differenceRestantes = 7;
        this.setID();
        this.setPartie();
    }

    protected diffTrouvee: number[] = [];
    protected setID(): void {
        this.partieID = this.route.snapshot.paramMap.get('idPartie') + "";
    }

    protected setPartie(): void {
        this.partieSimpleService.getPartieSimple(this.partieID).subscribe((res: PartieSimple) => {
            this.partie = res;
            this.setup();
        });
    }

    protected setup(): void {
        this.nomPartie = this.partie["_nomPartie"].charAt(0).toUpperCase() + this.partie["_nomPartie"].slice(1);

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
