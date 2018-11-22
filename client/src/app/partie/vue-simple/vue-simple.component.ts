import {Component, ErrorHandler} from "@angular/core";
import {PartieAbstraiteClass} from "../partie-abstraite-class";
import {PartieSimple} from "src/app/admin/dialog-simple/partie-simple";
import {ActivatedRoute} from "@angular/router";
import {PartieService} from "../partie.service";
import {CookieService} from "ngx-cookie-service";
import * as constantes from "../../constantes";
import * as event from "../../../../../common/communication/evenementsSocket";
import { SocketClientService } from "src/app/socket/socket-client.service";
import {ChronoService} from "../../chrono/chrono.service";

const NOMBRE_DIFF_MULTIJOUEUR_SIMPLE: number = 4;

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
                       protected cookieService: CookieService,
                       protected chrono: ChronoService) {
        super(route, partieService, cookieService, chrono, socketClientService, true);
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
                            this.isMultijoueur ?
                                await this.partieService.differenceTrouveeMultijoueurSimple(this.channelId, i, this.joueurMultijoueur)
                                : await this.differenceTrouver(i);

                            return;
                        }
                    }
                }
                i++;
            }
            await this.setPenalite(ev);
        }
    }

    protected async differenceTrouver(i: number): Promise<void> {
        this.diffTrouvee[0].push(i);
        await this.trouverDifferenceSimple();
        this.restaurationPixelsSimple(i);
        this.ajouterMessageDiffTrouvee("");
    }

    private async setPenalite(ev: MouseEvent): Promise<void> {
        if (this.isMultijoueur) {
            await this.partieService.erreurMultijoueurSimple(this.channelId, this.joueurMultijoueur);
        }
        this.penalite(ev);
    }

    protected async differenceTrouverMultijoueurSimple(i: number, joueur: string): Promise<void> {
        if (this.joueurMultijoueur === joueur) {
            await this.trouverDifferenceSimple();
        }
        this.ajouterMessageDiffTrouvee(joueur);
        this.diffTrouvee[0].push(i);
        this.restaurationPixelsSimple(i);
    }

    protected async terminerPartieMultijoueurSimple(): Promise<void> {
        if (this.differencesTrouvees === NOMBRE_DIFF_MULTIJOUEUR_SIMPLE) {
            await this.partieService.partieMultijoueurSimpleTerminee(this.channelId, this.joueurMultijoueur);
        }
    }

    protected async trouverDifferenceSimple(): Promise<void> {
        if (this.partieCommence) {
            this.augmenterDiffTrouvee();
            this.jouerYesSound();
        }
        this.isMultijoueur ? await this.terminerPartieMultijoueurSimple() : this.terminerPartieSolo();
    }

    private restaurationPixelsSimple(i: number): void {
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
                this.differenceTrouverMultijoueurSimple(data.diff, data.joueur);
            }
        });

        this.socketClientService.socket.on(event.PARTIE_SIMPLE_MULTIJOUEUR_TERMINEE, (data) => {
            if (this.channelId === data.channelId) {
                this.partieCommence = false;
                this.terminerPartie(data.joueur);
            }
        });

        this.socketClientService.socket.on(event.ERREUR_PARTIE_SIMPLE, (data) => {
            if (this.channelId === data.channelId) {
                this.isMultijoueur ? this.chat.addMessageToMessagesChat(this.getCurrentTime() + " - Erreur par " + data.joueur)
                : this.chat.addMessageToMessagesChat(this.getCurrentTime() + " - Erreur.");
            }
        });
    }

}
