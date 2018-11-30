import {Component, ErrorHandler} from "@angular/core";
import {PartieAbstraiteClass} from "../partie-abstraite-class";
import {PartieSimple} from "src/app/admin/dialog-simple/partie-simple";
import {ActivatedRoute} from "@angular/router";
import {PartieService} from "../partie.service";
import {CookieService} from "ngx-cookie-service";
import * as constantes from "../../constantes";
import { MatDialog } from "@angular/material";
import * as event from "../../../../../common/communication/evenementsSocket";
import { SocketClientService } from "src/app/socket/socket-client.service";
import {ChronoService} from "../../chrono/chrono.service";
import { TempsUser } from "src/app/admin/temps-user";

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
                       protected chrono: ChronoService,
                       protected dialog: MatDialog) {
        super(route, partieService, cookieService, chrono, socketClientService, dialog, true);
        this.partieAttributsAdmin.differenceRestantes = constantes.DIFF_PARTIE_SIMPLE;
        this.setSocketEvents();
    }

    protected async ajouterTemps(partieID: string, joueur: TempsUser, isSolo: boolean): Promise<void> {
        await this.partieService.addTempsPartieSimple(partieID, joueur, isSolo)
            .catch(() => ErrorHandler);
    }

    protected async supprimerChannelId(): Promise<void> {
        await this.partieService.supprimerChannelIdSimple(this.partieAttributsMultijoueur.channelId);
    }

    protected setPartie(): void {
        this.partieService.getPartieSimple(this.partieAttributsData.partieID).subscribe((res: PartieSimple) => {
            this.partie = res;
            this.getImageData();
            this.setup();
        });
    }

    protected getImageData(): void {
        this.partieAttributsData.imageData.push(atob(String(this.partie["_image1"][0])));
        this.partieAttributsData.imageData.push(atob(String(this.partie["_image2"][0])));
    }

    protected async testerPourDiff(ev: MouseEvent): Promise<void> {
        if (this.partieAttributsAdmin.partieCommence && !this.partieAttributsAdmin.penaliteEtat) {
            const coords: string = ev.offsetX + "," + ev.offsetY;
            let i: number = 0;
            for (const diff of this.partie["_imageDiff"]) {
                for (const pixel of diff) {
                    if (coords === pixel) {
                        if (!this.partieAttributsAdmin.diffTrouvee[0].includes(i)) {
                            this.partieAttributsMultijoueur.isMultijoueur ?
                                await this.partieService.differenceTrouveeMultijoueurSimple(
                                    this.partieAttributsMultijoueur.channelId,
                                    i,
                                    this.partieAttributsMultijoueur.joueurMultijoueur)
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
        this.partieAttributsAdmin.diffTrouvee[0].push(i);
        await this.trouverDifferenceSimple();
        this.restaurationPixelsSimple(i);
        this.ajouterMessageDiffTrouvee("");
    }

    private async setPenalite(ev: MouseEvent): Promise<void> {
        if (this.partieAttributsMultijoueur.isMultijoueur) {
            await this.partieService.erreurMultijoueurSimple(
                this.partieAttributsMultijoueur.channelId,
                this.partieAttributsMultijoueur.joueurMultijoueur);
        }
        this.penalite(ev);
    }

    protected async differenceTrouverMultijoueurSimple(i: number, joueur: string): Promise<void> {
        if (this.partieAttributsMultijoueur.joueurMultijoueur === joueur) {
            await this.trouverDifferenceSimple();
        }
        this.ajouterMessageDiffTrouvee(joueur);
        this.partieAttributsAdmin.diffTrouvee[0].push(i);
        this.restaurationPixelsSimple(i);
    }

    protected async terminerPartieMultijoueurSimple(): Promise<void> {
        if (this.partieAttributsAdmin.differencesTrouvees === NOMBRE_DIFF_MULTIJOUEUR_SIMPLE) {
            await this.partieService.partieMultijoueurSimpleTerminee(this.partieAttributsMultijoueur.channelId,
                                                                     this.partieAttributsMultijoueur.joueurMultijoueur);
        }
    }

    protected async trouverDifferenceSimple(): Promise<void> {
        if (this.partieAttributsAdmin.partieCommence) {
            this.augmenterDiffTrouvee();
            this.jouerYesSound();
        }
        this.partieAttributsMultijoueur.isMultijoueur ? await this.terminerPartieMultijoueurSimple() : this.terminerPartieSolo();
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
            if (this.partieAttributsMultijoueur.channelId === data.channelId) {
                this.differenceTrouverMultijoueurSimple(data.diff, data.joueur).catch(() => ErrorHandler);
            }
        });

        this.socketClientService.socket.on(event.PARTIE_SIMPLE_MULTIJOUEUR_TERMINEE, async (data) => {
            if (this.partieAttributsMultijoueur.channelId === data.channelId) {
                this.partieAttributsAdmin.partieCommence = false;
                await this.terminerPartie(data.joueur);
            }
        });

        this.socketClientService.socket.on(event.ERREUR_PARTIE_SIMPLE, (data) => {
            if (this.partieAttributsMultijoueur.channelId === data.channelId) {
                this.partieAttributsMultijoueur.isMultijoueur ?
                    this.chat.addMessageToMessagesChat(this.getCurrentTime() + " - Erreur par " + data.joueur)
                    : this.chat.addMessageToMessagesChat(this.getCurrentTime() + " - Erreur.");
            }
        });
    }

}
