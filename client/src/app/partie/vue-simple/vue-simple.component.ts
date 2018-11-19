import {Component, ErrorHandler} from "@angular/core";
import {PartieAbstraiteClass} from "../partie-abstraite-class";
import {PartieSimple} from "src/app/admin/dialog-simple/partie-simple";
import {ActivatedRoute} from "@angular/router";
import {PartieService} from "../partie.service";
import {CookieService} from "ngx-cookie-service";
import * as constantes from "../../constantes";
import * as event from "../../../../../common/communication/evenementsSocket";
import { SocketClientService } from "src/app/socket/socket-client.service";

@Component({
    selector: "app-vue-simple",
    templateUrl: "./vue-simple.component.html",
    styleUrls: ["./vue-simple.component.css"]
})
export class VueSimpleComponent extends PartieAbstraiteClass {
    protected partie: PartieSimple;

    public constructor(protected route: ActivatedRoute,
                       protected partieService: PartieService,
                       protected socketClientService: SocketClientService,
                       protected cookieService: CookieService) {
        super(route, partieService, cookieService, socketClientService, true);
        this.differenceRestantes = constantes.DIFF_PARTIE_SIMPLE;
        this.setSocketEvents();
    }

    protected ajouterTemps(temps: number): void {
        this.updateTableauTempsSolo(temps);
        this.partieService.reinitialiserTempsPartieSimple(this.partieID, this.partie["_tempsSolo"], this.partie["_tempsUnContreUn"])
            .catch(() => ErrorHandler);
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

    protected async testerPourDiff(ev: MouseEvent): Promise<void> {
        if (this.partieCommence && !this.penaliteEtat) {
            const coords: string = ev.offsetX + "," + ev.offsetY;
            let i: number = 0;
            for (const diff of this.partie["_imageDiff"]) {
                for (const pixel of diff) {
                    if (coords === pixel) {
                        if (!this.diffTrouvee[0].includes(i)) {
                            this.isMultijoueur ? await this.partieService.differenceTrouveeMultijoueurSimple(this.channelId, i)
                                               : this.differenceTrouver(i);

                            return;
                        }
                    }
                }
                i++;
            }
            this.penalite(ev);
        }
    }

    protected differenceTrouver(i: number): void {
        this.diffTrouvee[0].push(i);
        this.trouverDifference();

        const contextG: CanvasRenderingContext2D = this.canvas.toArray()[0].nativeElement.getContext("2d");
        const imageDataG: ImageData = contextG.getImageData(0, 0, constantes.WINDOW_WIDTH, constantes.WINDOW_HEIGHT);
        const dataG: Uint8ClampedArray = imageDataG.data;

        const contextD: CanvasRenderingContext2D = this.canvas.toArray()[1].nativeElement.getContext("2d");
        const imageDataD: ImageData = contextD.getImageData(0, 0, constantes.WINDOW_WIDTH, constantes.WINDOW_HEIGHT);
        const dataD: Uint8ClampedArray = imageDataD.data;

        for (const pixel of this.partie["_imageDiff"][i]) {
            const x: number = Number(pixel.split(",")[0]);
            const y: number = Number(pixel.split(",")[1]);
            const dim: number = (y * constantes.WINDOW_WIDTH * constantes.RGB_WIDTH) + (x * constantes.RGB_WIDTH);

            dataD[dim] = dataG[dim];
            dataD[dim + constantes.RGB_FIRST_INCREMENT] = dataG[dim + constantes.RGB_FIRST_INCREMENT];
            dataD[dim + constantes.RGB_SECOND_INCREMENT] = dataG[dim + constantes.RGB_SECOND_INCREMENT];
        }
        contextD.putImageData(imageDataD, 0, 0);
    }

    private setSocketEvents(): void {
        this.socketClientService.socket.on(event.DIFFERENCE_TROUVEE_MULTIJOUEUR_SIMPLE, (data) => {
            if (this.channelId === data.channelId) {
                this.differenceTrouver(data.diff);
            }
        });
    }

}
