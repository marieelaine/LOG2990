import {Component, ErrorHandler} from "@angular/core";
import { PartieAbstraiteClass } from "../partie-abstraite-class";
import { ActivatedRoute} from "@angular/router";
import { PartieMultiple} from "../../admin/dialog-multiple/partie-multiple";
import { PartieService} from "../partie.service";
import {CookieService} from "ngx-cookie-service";
import * as constantes from "../../constantes";
import * as event from "../../../../../common/communication/evenementsSocket";
import { SocketClientService } from "src/app/socket/socket-client.service";

const NOMBRE_DIFF_MULTIJOUEUR_MULTIPLE: number = 7;

@Component({
  selector: "app-vue-multiple",
  templateUrl: "./vue-multiple.component.html",
  styleUrls: ["./vue-multiple.component.css"]
})

export class VueMultipleComponent extends PartieAbstraiteClass {

    protected partie: PartieMultiple;

    public constructor(protected route: ActivatedRoute,
                       protected partieService: PartieService,
                       protected socketClientService: SocketClientService,
                       protected cookieService: CookieService) {
        super(route, partieService, cookieService, socketClientService, false);
        this.differenceRestantes = constantes.DIFF_PARTIE_MULTIPLE;
        this.setSocketEvents();
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

    protected async testerPourDiff(ev: MouseEvent): Promise<void> {
        if (this.partieCommence && !this.penaliteEtat) {

            const coords: string = ev.offsetX + "," + ev.offsetY;
            const srcElem: Element = ev.srcElement as Element;
            const source: string = srcElem.id === "canvasG1" || srcElem.id === "canvasD1"
                ? "_imageDiff1"
                : "_imageDiff2";

            let i: number = 0;
            for (const diff of this.partie[source]) {
                for (const pixel of diff) {
                    if (coords === pixel) {
                        if (!this.diffTrouvee[0].includes(i) && source === "_imageDiff1"
                            || !this.diffTrouvee[1].includes(i) && source === "_imageDiff2") {
                            this.isMultijoueur ?
                                await this.partieService.differenceTrouveeMultijoueurMultiple
                                (this.channelId, i, source, this.joueurMultijoueur)
                                : this.differenceTrouver(i, source);

                            return;
                        }
                    }
                }
                i++;
            }
            await this.setPenalite(ev);
        }
    }

    protected differenceTrouver(i: number, src: string): void {
        src === "_imageDiff1" ? this.diffTrouvee[0].push(i) : this.diffTrouvee[1].push(i);
        this.trouverDifferenceMultiple();
        this.restaurationPixelsMultiple(i, src);
    }

    private restaurationPixelsMultiple(i: number, src: string): void {
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

    protected async terminerPartieMultijoueurMultiple(): Promise<void> {
        if (this.differencesTrouvees === NOMBRE_DIFF_MULTIJOUEUR_MULTIPLE) {
            await this.partieService.partieMultijoueurMultipleTerminee(this.channelId, this.joueurMultijoueur);
        }
    }

    protected async trouverDifferenceMultiple(): Promise<void> {
        if (this.partieCommence) {
            this.augmenterDiffTrouvee();
            this.jouerYesSound();
        }
        this.isMultijoueur ? await this.terminerPartieMultijoueurMultiple() : this.terminerPartieSolo();
    }

    protected async differenceTrouverMultijoueurMultiple(i: number, source: string, joueur: string): Promise<void> {
        if (this.joueurMultijoueur === joueur) {
            await this.trouverDifferenceMultiple();
        }
        this.ajouterMessageDiffTrouvee(joueur);
        this.diffTrouvee[0].push(i);
        this.restaurationPixelsMultiple(i, source);
    }

    private async setPenalite(ev: MouseEvent): Promise<void> {
        if (this.isMultijoueur) {
            await this.partieService.erreurMultijoueurMultiple(this.channelId, this.joueurMultijoueur);
        }
        this.penalite(ev);
    }

    private setSocketEvents(): void {
        this.socketClientService.socket.on(event.DIFFERENCE_TROUVEE_MULTIJOUEUR_MULTIPLE, (data) => {
            if (this.channelId === data.channelId) {
                this.differenceTrouverMultijoueurMultiple(data.diff, data.source, data.joueur);
            }
        });

        this.socketClientService.socket.on(event.PARTIE_MULTIPLE_MULTIJOUEUR_TERMINEE, (data) => {
            if (this.channelId === data.channelId) {
                this.partieCommence = false;
                this.terminerPartie(data.joueur);
            }
        });

        this.socketClientService.socket.on(event.ERREUR_PARTIE_MULTIPLE, (data) => {
            if (this.channelId === data.channelId) {
                this.isMultijoueur ? this.chat.addMessageToMessagesChat(this.getCurrentTime() + " - Erreur par " + data.joueur)
                : this.chat.addMessageToMessagesChat(this.getCurrentTime() + " - Erreur.");
            }
        });
    }
}
