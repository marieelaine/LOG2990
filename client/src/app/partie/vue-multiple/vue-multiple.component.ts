import {Component, ErrorHandler} from "@angular/core";
import { PartieAbstraiteClass } from "../partie-abstraite-class";
import {ActivatedRoute} from "@angular/router";
import {PartieMultiple} from "../../admin/dialog-multiple/partie-multiple";
import {PartieService} from "../partie.service";
import {CookieService} from "ngx-cookie-service";
import * as constantes from "../../constantes";
import {MatDialog} from "@angular/material";
import * as event from "../../../../../common/communication/evenementsSocket";
import { SocketClientService } from "src/app/socket/socket-client.service";
import { ChronoService} from "../../chrono/chrono.service";
import { Joueur } from "src/app/admin/joueur";
import { PartieMultipleInterface } from "../../../../../common/partie-multiple-interface";

const NOMBRE_DIFF_MULTIJOUEUR_MULTIPLE: number = 7;
const CANVASG1: string = "canvasG1";
const CANVASD1: string = "canvasD1";
const IMAGE_DIFF_1: string = "_imageDiff1";
const IMAGE_DIFF_2: string = "_imageDiff2";

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
                       protected cookieService: CookieService,
                       protected chrono: ChronoService,
                       protected dialog: MatDialog) {
        super(route, partieService, cookieService, chrono, dialog, false);
        this.partieAttributsAdmin.differenceRestantes = constantes.DIFF_PARTIE_MULTIPLE;

        this.setEvenementsSockets();
    }

    protected async ajouterTemps(partieID: string, joueur: Joueur, isSolo: boolean): Promise<void> {
        await this.partieService.ajouterTempsPartieMultiple(partieID, joueur, isSolo)
                                .catch(() => ErrorHandler);
    }

    protected async supprimerChannelId(): Promise<void> {
        this.partieService.supprimerChannelIdMultiple(this.partieAttributsData.partieID).catch(() => ErrorHandler);
    }

    protected setPartie(): void {
        this.partieService.getPartieMultiple(this.partieAttributsData.partieID).subscribe(async (res: PartieMultipleInterface) => {
            this.reconstruirePartieMultiple(res);
            this.partieAttributsMultijoueur.isMultijoueur ? await this.setPartieMultipleMultijoueur() : this.afficherPartie();
        });
    }

    protected reconstruirePartieMultiple(partie: PartieMultipleInterface): void {
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

            const partieMultiple: PartieMultiple = new PartieMultiple(partie._nomPartie, tempsSolo, tempsUnContreUn, partie._image1PV1,
                                                                      partie._image1PV2, partie._image2PV1, partie._image2PV2,
                                                                      partie._imageDiff1, partie._imageDiff2, partie._quantiteObjets,
                                                                      partie._theme, partie._typeModification, partie._id);
            this.partie = partieMultiple;
    }

    protected getImageData(): void {
        this.partieAttributsData.imageData.push(atob(String(this.partie.image1PV1[0])));
        this.partieAttributsData.imageData.push(atob(String(this.partie.image1PV2[0])));
        this.partieAttributsData.imageData.push(atob(String(this.partie.image2PV1[0])));
        this.partieAttributsData.imageData.push(atob(String(this.partie.image2PV2[0])));
    }

    protected async testerPourDiff(ev: MouseEvent): Promise<void> {
        if (this.partieAttributsAdmin.partieCommence && !this.partieAttributsAdmin.penaliteEtat) {

            const coords: string = ev.offsetX + "," + ev.offsetY;
            const srcElem: Element = ev.srcElement as Element;
            const source: string = srcElem.id === CANVASG1 || srcElem.id === CANVASD1
                ? IMAGE_DIFF_1
                : IMAGE_DIFF_2;

            let i: number = 0;
            for (const diff of this.partie[source]) {
                for (const pixel of diff) {
                    if (coords === pixel) {
                        if (!this.partieAttributsAdmin.diffTrouvee[0].includes(i) && source === IMAGE_DIFF_1
                            || !this.partieAttributsAdmin.diffTrouvee[1].includes(i) && source === IMAGE_DIFF_2) {
                            this.partieAttributsMultijoueur.isMultijoueur ?
                                await this.partieService.differenceTrouveeMultijoueurMultiple
                                (this.partieAttributsMultijoueur.channelId, i, source, this.partieAttributsMultijoueur.joueurMultijoueur)
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
        src === IMAGE_DIFF_1 ? this.partieAttributsAdmin.diffTrouvee[0].push(i) : this.partieAttributsAdmin.diffTrouvee[1].push(i);
        this.trouverDifference().catch(() => ErrorHandler);
        this.restaurationPixelsMultiple(i, src);
        this.ajouterMessageDiffTrouvee(constantes.STR_VIDE);
    }

    protected async terminerPartieMultijoueurMultiple(): Promise<void> {
        if (this.partieAttributsAdmin.differencesTrouvees === NOMBRE_DIFF_MULTIJOUEUR_MULTIPLE) {
            await this.partieService.partieMultijoueurMultipleTerminee(
                this.partieAttributsMultijoueur.channelId,
                this.partieAttributsMultijoueur.joueurMultijoueur);
        }
    }

    protected async regarderPartieTerminee(): Promise<void> {
        this.partieAttributsMultijoueur.isMultijoueur ? await this.terminerPartieMultijoueurMultiple() : this.terminerPartieSolo();
    }

    protected async differenceTrouverMultijoueurMultiple(i: number, source: string, joueur: string): Promise<void> {
        if (this.partieAttributsMultijoueur.joueurMultijoueur === joueur) {
            await this.trouverDifference();
        }
        this.ajouterMessageDiffTrouvee(joueur);
        this.partieAttributsAdmin.diffTrouvee[0].push(i);
        this.restaurationPixelsMultiple(i, source);
    }

    private restaurationPixelsMultiple(i: number, src: string): void {
        let contextG: CanvasRenderingContext2D;
        let contextD: CanvasRenderingContext2D;
        if (src === IMAGE_DIFF_1) {
            contextG = this.canvas.toArray()[constantes.CONTEXT_GAUCHE_POV1_POSITION].nativeElement.getContext(constantes.CONTEXT_2D);
            contextD = this.canvas.toArray()[constantes.CONTEXT_DROITE_POV1_POSITION].nativeElement.getContext(constantes.CONTEXT_2D);
        } else {
            contextG = this.canvas.toArray()[constantes.CONTEXT_GAUCHE_POV2_POSITION].nativeElement.getContext(constantes.CONTEXT_2D);
            contextD = this.canvas.toArray()[constantes.CONTEXT_DROITE_POV2_POSITION].nativeElement.getContext(constantes.CONTEXT_2D);
        }
        const imageDataG: ImageData = contextG.getImageData(0, 0, constantes.WINDOW_WIDTH, constantes.WINDOW_HEIGHT);
        const dataG: Uint8ClampedArray = imageDataG.data;
        const imageDataD: ImageData = contextD.getImageData(0, 0, constantes.WINDOW_WIDTH, constantes.WINDOW_HEIGHT);
        const dataD: Uint8ClampedArray = imageDataD.data;

        for (const pixel of this.partie[src][i]) {
            const x: number = Number(pixel.split(constantes.VIRGULE_STR_FORMAT)[0]);
            const y: number = Number(pixel.split(constantes.VIRGULE_STR_FORMAT)[1]);
            const dim: number = (y * constantes.WINDOW_WIDTH * constantes.RGB_WIDTH) + (x * constantes.RGB_WIDTH);
            dataD[dim] = dataG[dim];
            dataD[dim + constantes.RGB_FIRST_INCREMENT] = dataG[dim + constantes.RGB_FIRST_INCREMENT];
            dataD[dim + constantes.RGB_SECOND_INCREMENT] = dataG[dim + constantes.RGB_SECOND_INCREMENT];
        }
        contextD.putImageData(imageDataD, 0, 0);
    }

    private setEvenementsSockets(): void {
        this.socketClientService.socket.on(event.DIFFERENCE_TROUVEE_MULTIJOUEUR_MULTIPLE, (data) => {
            if (this.partieAttributsMultijoueur.channelId === data.channelId) {
                this.differenceTrouverMultijoueurMultiple(data.diff, data.source, data.joueur).catch(() => ErrorHandler);
            }
        });

        this.socketClientService.socket.on(event.PARTIE_MULTIPLE_MULTIJOUEUR_TERMINEE, async (data) => {
            if (this.partieAttributsMultijoueur.channelId === data.channelId) {
                this.partieAttributsAdmin.partieCommence = false;
                await this.terminerPartie(data.joueur);
            }
        });

        this.socketClientService.socket.on(event.ERREUR_PARTIE_MULTIPLE, (data) => {
            if (this.partieAttributsMultijoueur.channelId === data.channelId) {
                this.chat.ajouterMessageAuMessagesChat(constantes.ERREUR_CHAT_PAR + data.joueur);
            }
        });

        this.socketClientService.socket.on(event.PARTIES_MULTIPLES_CHARGEES, (data) => {
            if (this.partieAttributsMultijoueur.channelId === data) {
                this.afficherPartie();
            }
        });
    }

    private async setPenalite(ev: MouseEvent): Promise<void> {
        if (this.partieAttributsMultijoueur.isMultijoueur) {
            await this.partieService.erreurMultijoueurMultiple(
                this.partieAttributsMultijoueur.channelId,
                this.partieAttributsMultijoueur.joueurMultijoueur);
        }
        this.penalite(ev);
    }

    private async setPartieMultipleMultijoueur(): Promise<void> {
        await this.partieService.partieMultipleChargee(this.partieAttributsMultijoueur.channelId);
    }
}
