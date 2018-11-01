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
    protected partieID: string;
    protected partie: PartieSimple;
    protected diffTrouvee: number[];

    public constructor(private route: ActivatedRoute,
                       protected partieService: PartieService) {
        super();
        this.diffTrouvee = [];
        this.differenceRestantes = 7;
        this.setID();
        this.setPartie();
    }

    protected setID(): void {
        this.partieID = this.route.snapshot.params.idPartie;
    }

    protected setPartie(): void {
        this.partieService.getPartieSimple(this.partieID).subscribe((res: PartieSimple) => {
            this.partie = res;
            this.setup();
        });
    }

    protected setup(): void {
        this.addNomPartieToChat();

        const data1: string = atob(String(this.partie["_image1"][0]));
        const data2: string = atob(String(this.partie["_image2"][0]));

        this.ajusterSourceImage(data1, this.canvasG);
        this.ajusterSourceImage(data2, this.canvasD);
    }

    protected addNomPartieToChat() {
        this.nomPartie = this.partie["_nomPartie"];
        this.messagesChat.push("Bienvenue dans la partie " + this.nomPartie.charAt(0).toUpperCase() + this.partie["_nomPartie"].slice(1));
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
            const imageData = context.getImageData(0, 0, 640, 480);
        };
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
        }
    }

    protected ajouterTemps(temps: number): void {
        this.partie["_tempsSolo"].push(temps);
        this.partieService.reinitialiserTempsPartie(this.partieID, this.partie["_tempsSolo"], this.partie["_tempsUnContreUn"])
        .catch(() => ErrorHandler);
    }

    // protected updatePixelData(): void {

    // }

}
