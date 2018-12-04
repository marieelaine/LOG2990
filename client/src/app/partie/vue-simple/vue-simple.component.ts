import {Component, ErrorHandler} from "@angular/core";
import { PartieAbstraiteClass } from "../partie-abstraite-class";
import {PartieSimple} from "src/app/admin/dialog-simple/partie-simple";
import {ActivatedRoute} from "@angular/router";
import {PartieService} from "../partie.service";
import {CookieService} from "ngx-cookie-service";
import * as constantes from "../../constantes";
import { MatDialog } from "@angular/material";
import * as event from "../../../../../common/communication/evenementsSocket";
import {ChronoService} from "../../chrono/chrono.service";
import { Joueur } from "src/app/admin/joueur";
import { PartieSimpleInterface } from "../../../../../common/partie-simple-interface";
import { SocketClientService } from "src/app/socket/socket-client.service";

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
                       protected cookieService: CookieService,
                       protected socketClientService: SocketClientService,
                       protected chrono: ChronoService,
                       protected dialog: MatDialog) {
        super(route, partieService, cookieService, chrono, dialog, true);
        this.partieAttributsAdmin.differenceRestantes = constantes.DIFF_PARTIE_SIMPLE;

        this.setEvenementsSockets();
    }

    protected async ajouterTemps(partieID: string, joueur: Joueur, isSolo: boolean): Promise<void> {
        await this.partieService.ajouterTempsPartieSimple(partieID, joueur, isSolo)
            .catch(() => ErrorHandler);
    }

    protected async supprimerChannelId(): Promise<void> {
        await this.partieService.supprimerChannelIdSimple(this.partieAttributsMultijoueur.channelId);
    }

    protected setPartie(): void {
        this.partieService.getPartieSimple(this.partieAttributsData.partieID).subscribe(async (res: PartieSimpleInterface) => {
            this.reconstruirePartieSimple(res);
            this.partieAttributsMultijoueur.isMultijoueur ? await this.setPartieSimpleMultijoueur() : this.afficherPartie();
        });
    }

    protected reconstruirePartieSimple(partie: PartieSimpleInterface): void {
        const tempsSolo: Joueur[] = [];
        const tempsUnContreUn: Joueur[] = [];

        for (const user of partie._tempsSolo) {
            const userSolo: Joueur = new Joueur(user._nom, user._temps);
            tempsSolo.push(userSolo);
        }

        for (const user of partie._tempsUnContreUn) {
            const userMulti: Joueur = new Joueur(user._nom, user._temps);
            tempsUnContreUn.push(userMulti);
        }

        const partieSimple: PartieSimple = new PartieSimple(partie._nomPartie, tempsSolo, tempsUnContreUn, partie._image1,
                                                            partie._image2, partie._imageDiff, partie._id);
        this.partie = partieSimple;
    }

    protected getImageData(): void {
        this.partieAttributsData.imageData.push(atob(String(this.partie.image1[0])));
        this.partieAttributsData.imageData.push(atob(String(this.partie.image2[0])));
    }

    protected async testerPourDiff(ev: MouseEvent): Promise<void> {
        if (this.partieAttributsAdmin.partieCommence && !this.partieAttributsAdmin.penaliteEtat) {
            const coords: string = ev.offsetX + constantes.VIRGULE_STR_FORMAT + ev.offsetY;
            let i: number = 0;
            for (const diff of this.partie.imageDiff) {
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
        await this.trouverDifference();
        this.restaurationPixelsSimple(i);
        this.ajouterMessageDiffTrouvee(constantes.STR_VIDE);
    }

    protected async differenceTrouverMultijoueurSimple(i: number, joueur: string): Promise<void> {
        if (this.partieAttributsMultijoueur.joueurMultijoueur === joueur) {
            await this.trouverDifference();
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

    protected async regarderPartieTerminee(): Promise<void> {
        this.partieAttributsMultijoueur.isMultijoueur ? await this.terminerPartieMultijoueurSimple() : this.terminerPartieSolo();
    }

    private setEvenementsSockets(): void {
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
                this.chat.ajouterMessageAuMessagesChat(constantes.ERREUR_CHAT_PAR + data.joueur);
            }
        });

        this.socketClientService.socket.on(event.PARTIES_SIMPLES_CHARGEES, (data) => {
            if (this.partieAttributsMultijoueur.channelId === data) {
                this.afficherPartie();
            }
        });
    }

    private async setPenalite(ev: MouseEvent): Promise<void> {
        if (this.partieAttributsMultijoueur.isMultijoueur) {
            await this.partieService.erreurMultijoueurSimple(
                this.partieAttributsMultijoueur.channelId,
                this.partieAttributsMultijoueur.joueurMultijoueur);
        }
        this.penalite(ev);
    }

    private restaurationPixelsSimple(i: number): void {
        const contextG: CanvasRenderingContext2D = this.canvas.toArray()[0].nativeElement.getContext(constantes.CONTEXT_2D);
        const imageDataG: ImageData = contextG.getImageData(0, 0, constantes.WINDOW_WIDTH, constantes.WINDOW_HEIGHT);
        const dataG: Uint8ClampedArray = imageDataG.data;

        const contextD: CanvasRenderingContext2D = this.canvas.toArray()[1].nativeElement.getContext(constantes.CONTEXT_2D);
        const imageDataD: ImageData = contextD.getImageData(0, 0, constantes.WINDOW_WIDTH, constantes.WINDOW_HEIGHT);
        const dataD: Uint8ClampedArray = imageDataD.data;

        for (const pixel of this.partie.imageDiff[i]) {
            const x: number = Number(pixel.split(constantes.VIRGULE_STR_FORMAT)[0]);
            const y: number = Number(pixel.split(constantes.VIRGULE_STR_FORMAT)[1]);
            const dim: number = (y * constantes.WINDOW_WIDTH * constantes.RGB_WIDTH) + (x * constantes.RGB_WIDTH);

            dataD[dim] = dataG[dim];
            dataD[dim + constantes.RGB_FIRST_INCREMENT] = dataG[dim + constantes.RGB_FIRST_INCREMENT];
            dataD[dim + constantes.RGB_SECOND_INCREMENT] = dataG[dim + constantes.RGB_SECOND_INCREMENT];
        }
        contextD.putImageData(imageDataD, 0, 0);
    }

    private async setPartieSimpleMultijoueur(): Promise<void> {
        await this.partieService.partieSimpleChargee(this.partieAttributsMultijoueur.channelId);
    }
}
