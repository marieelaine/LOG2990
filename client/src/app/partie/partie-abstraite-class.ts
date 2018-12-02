import {ChronoService} from "../chrono/chrono.service";
import {ElementRef, ErrorHandler, QueryList, ViewChildren, ViewChild} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {PartieService} from "./partie.service";
import {PartieSimple} from "../admin/dialog-simple/partie-simple";
import {PartieMultiple} from "../admin/dialog-multiple/partie-multiple";
import {ChatComponent} from "../chat/chat.component";
import {CookieService} from "ngx-cookie-service";
import {TempsUser} from "../admin/temps-user";
import * as constantes from "../constantes";
import {MatDialog} from "@angular/material";
import {DialogFinPartieComponent} from "./dialog-fin-partie/dialog-fin-partie.component";
import {PartieAttributsData} from "./partie-attributs-data/partie-attributs-data";
import {PartieAttributsAdmin} from "./partie-attributs-admin/partie-attributs-admin";
import {PartieAttributsMultijoueur} from "./partie-attributs-multijoueur/partie-attributs-multijoueur";

const MINUTESANDSECONDCONVERT: number = 10;
const TIMEOUT: number = 1000;
const OFFSET_ADDITIONNEL: number = 10;
const LINE_WIDTH: number = 1.5;
const PARTIE_SECOND_ELEMENT: number = 2;

const FONT: string = "600 28px Arial";
const TEXT_ALIGN: string = "center";
const ERREUR_COULEUR_INTERIEUR: string = "#ff0000";
const ERREUR_COULEUR_CONTEUR: string = "#000000";

const HAUTEUR_DIALOGUE: string = "190px";
const LARGEUR_DIALOGUE: string = "600px";

const CHARGEMENT_IMAGES: string = "Chargement des images";
const DIFF_TROUVE_PAR: string = " - Différence trouvée par ";
const DIFF_TROUVE: string = " - Différence trouvée.";
const FELECITATIONS_MULTI: string = "FÉLICITATIONS, VOUS AVEZ GAGNÉ!";
const FELECITATIONS: string = "FÉLICITATIONS!";
const PERDU_MULTI: string = "VOUS AVEZ PERDU!";
const PATH_AUDIO_APPLAUDISSEMENT: string = "../assets/applause.mp3";
const PATH_AUDIO_YES: string = "../assets/yes.wav";
const PATH_AUDIO_NO: string = "../assets/no.mp3";
const PATH_AUDIO_LOSER: string = "../assets/LoserSound.mp3";
const MESSAGE_TROUVE_PART1: string = "Vous avez trouvé";
const DIFFERENCES: string = "différences";
const ANONYME: string = "Anonyme";
const ERREUR: string = "ERREUR";
export const ERREUR_CHAT: string = " - ERREUR.";
export const ERREUR_CHAT_PAR: string = " - ERREUR par ";
const USERNAME_STR: string = "username";
export const CONTEXT_2D: string = "2d";
const CANVAS: string = "canvas";

export abstract class PartieAbstraiteClass {

    @ViewChildren(CANVAS) protected canvas: QueryList<ElementRef>;
    @ViewChild(ChatComponent) protected chat: ChatComponent;

    protected partieAttributsData: PartieAttributsData;
    protected partieAttributsAdmin: PartieAttributsAdmin;
    protected partieAttributsMultijoueur: PartieAttributsMultijoueur;

    protected abstract partie: PartieSimple | PartieMultiple;

    public constructor(protected route: ActivatedRoute,
                       protected partieService: PartieService,
                       protected cookieService: CookieService,
                       protected chrono: ChronoService,
                       protected dialog: MatDialog,
                       isSimple: boolean) {
        this.partieAttributsData = new PartieAttributsData;
        this.partieAttributsAdmin = new PartieAttributsAdmin;
        this.partieAttributsMultijoueur = new PartieAttributsMultijoueur;
        this.partieAttributsAdmin.partieCommence = false;
        this.partieAttributsAdmin.differencesTrouvees = 0;
        this.partieAttributsAdmin.messageDifferences = CHARGEMENT_IMAGES;
        this.chat = new ChatComponent();
        this.partieAttributsData.imageData = [];
        this.partieAttributsAdmin.diffTrouvee = [[], []];
        this.partieAttributsData.audio = new Audio();
        this.partieAttributsAdmin.penaliteEtat = false;

        this.chrono.reset();
        this.setImage(isSimple);
        this.setID();
        this.setIsMultijoueur();
        this.setPartie();
    }

    protected abstract setPartie(): void;

    protected abstract getImageData(): void;

    protected abstract ajouterTemps(partieID: string, tempsUser: TempsUser, isSolo: boolean): void;

    protected async abstract supprimerChannelId(): Promise<void>;

    protected ouvrirDialogFinPartie(): void {
        this.dialog.open(DialogFinPartieComponent, {
            height: HAUTEUR_DIALOGUE,
            width: LARGEUR_DIALOGUE,
            data: {message: this.partieAttributsAdmin.messageDifferences}
        });
    }

    protected commencerPartie(): void {
        this.partieAttributsAdmin.partieCommence = true;
        this.partieAttributsAdmin.messageDifferences = MESSAGE_TROUVE_PART1
            + this.partieAttributsAdmin.differencesTrouvees + DIFFERENCES;

        this.chrono.startTimer();
    }

    protected setup(): void {
        for (let i: number = 0; i < this.partieAttributsData.nbImages; i++) {
            this.ajusterSourceImage(this.partieAttributsData.imageData[i], this.canvas.toArray()[i], this.partieAttributsData.image[i]);
        }
        this.commencerPartie();
    }

    protected ajusterSourceImage(data: string, canvas: ElementRef, image: HTMLImageElement): void {
        let hex: number = 0x00;
        const result: Uint8Array = new Uint8Array(data.length);

        for (let i: number = 0; i < data.length; i++) {
            hex = data.charCodeAt(i);
            result[i] = hex;
        }
        const blob: Blob = new Blob([result], {type: constantes.IMAGE_BLOB});

        const context: CanvasRenderingContext2D = canvas.nativeElement.getContext(CONTEXT_2D);
        image.src = URL.createObjectURL(blob);
        image.onload = () => {
            context.drawImage(image, 0, 0);
        };
    }

    protected ajouterMessageDiffTrouvee(joueur: string): void {
        this.partieAttributsMultijoueur.isMultijoueur ?
            this.chat.addMessageToMessagesChat(this.getCurrentTime() + DIFF_TROUVE_PAR + joueur)
            : this.chat.addMessageToMessagesChat(this.getCurrentTime() + DIFF_TROUVE);
    }

    protected async terminerPartie(gagnant: string): Promise<void> {
        this.partieAttributsMultijoueur.isMultijoueur ? await this.partieMultijoueurTerminee(gagnant) : this.partieSoloTerminee();
    }

    protected async partieMultijoueurTerminee(gagnant: string): Promise<void> {
        this.chrono.stopTimer();

        if (this.partieAttributsMultijoueur.joueurMultijoueur === gagnant) {
            this.partieAttributsAdmin.messageDifferences = FELECITATIONS_MULTI;
            const tempsUser: TempsUser = new TempsUser(gagnant, this.chrono.getTime());
            this.joueurApplaudissements();
            this.ajouterTemps(this.partieAttributsData.partieID, tempsUser, false);
            await this.supprimerChannelId();
        } else {
            this.partieAttributsAdmin.messageDifferences = PERDU_MULTI;
            this.joueurLoserSound();
        }
        this.ouvrirDialogFinPartie();
    }

    protected partieSoloTerminee(): void {
        this.chrono.stopTimer();
        const tempsUser: TempsUser = new TempsUser(this.cookieService.get(USERNAME_STR), this.chrono.getTime());
        this.partieAttributsAdmin.messageDifferences = FELECITATIONS;
        this.ouvrirDialogFinPartie();
        this.joueurApplaudissements();
        this.ajouterTemps(this.partieAttributsData.partieID, tempsUser, true);
    }

    protected updateTableauTempsSolo(temps: number): void {
        let joueur: string = this.cookieService.get(USERNAME_STR);
        if (joueur === constantes.STR_VIDE) {
            joueur = ANONYME;
        }
        if (temps < this.partie["_tempsSolo"][PARTIE_SECOND_ELEMENT]["_temps"]) {
            const tempsUser: TempsUser = new TempsUser(joueur, temps);
            this.partie["_tempsSolo"].splice(-1, 1);
            this.partie["_tempsSolo"].push(tempsUser);
        }
    }

    protected augmenterDiffTrouvee(): void {
        this.partieAttributsAdmin.differencesTrouvees++;
        this.partieAttributsAdmin.messageDifferences = MESSAGE_TROUVE_PART1
            + this.partieAttributsAdmin.differencesTrouvees + DIFFERENCES;
    }

    protected jouerYesSound(): void {
        this.partieAttributsData.audio.src = PATH_AUDIO_YES;
        this.partieAttributsData.audio.load();
        this.partieAttributsData.audio.play().catch(() => ErrorHandler);
    }

    protected async terminerPartieSolo(): Promise<void> {
        if (this.partieAttributsAdmin.differenceRestantes === this.partieAttributsAdmin.differencesTrouvees) {
            this.partieAttributsAdmin.partieCommence = false;
            await this.terminerPartie(constantes.STR_VIDE);
        }
    }

    protected penalite(event: MouseEvent): void {
        this.partieAttributsAdmin.penaliteEtat = true;
        const canvas: HTMLCanvasElement = event.srcElement as HTMLCanvasElement;
        const ctx: CanvasRenderingContext2D = canvas.getContext(CONTEXT_2D) as CanvasRenderingContext2D;
        const imageSaved: ImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        ctx.font = FONT;
        ctx.textAlign = TEXT_ALIGN;
        ctx.fillStyle = ERREUR_COULEUR_INTERIEUR;
        ctx.fillText(ERREUR, event.offsetX, event.offsetY + OFFSET_ADDITIONNEL);
        ctx.lineWidth = LINE_WIDTH;
        ctx.fillStyle = ERREUR_COULEUR_CONTEUR;
        ctx.strokeText(ERREUR, event.offsetX, event.offsetY + OFFSET_ADDITIONNEL);
        this.partieAttributsData.audio.src = PATH_AUDIO_NO;
        this.partieAttributsData.audio.load();
        this.partieAttributsData.audio.play().catch(() => ErrorHandler);

        if (!this.partieAttributsMultijoueur.isMultijoueur) {
            this.chat.addMessageToMessagesChat(this.getCurrentTime() + ERREUR_CHAT);
        }

        setTimeout(() => {
            ctx.putImageData(imageSaved, 0, 0);
            this.partieAttributsAdmin.penaliteEtat = false;
        },         TIMEOUT);
    }

    protected getCurrentTime(): string {
        const date: Date = new Date();

        return date.getHours() + constantes.DEUX_POINTS_TEMPS_FORMAT
            + this.getMinutes(date)
            + constantes.DEUX_POINTS_TEMPS_FORMAT
            + this.getSeconds(date);
    }

    protected afficherPartie(): void {
        this.getImageData();
        this.setup();
    }

    private getMinutes(date: Date): string {
        return date.getMinutes() < MINUTESANDSECONDCONVERT ?
            constantes.ZERO_STR_FORMAT + date.getMinutes().toString()
            : date.getMinutes().toString();
    }

    private getSeconds(date: Date): string {
        return date.getSeconds() < MINUTESANDSECONDCONVERT ?
            constantes.ZERO_STR_FORMAT + date.getSeconds().toString()
            : date.getSeconds().toString();
    }

    private joueurApplaudissements(): void {
        this.partieAttributsData.audio.src = PATH_AUDIO_APPLAUDISSEMENT;
        this.partieAttributsData.audio.load();
        this.partieAttributsData.audio.play().catch(() => ErrorHandler);
    }

    private joueurLoserSound(): void {
        this.partieAttributsData.audio.src = PATH_AUDIO_LOSER;
        this.partieAttributsData.audio.load();
        this.partieAttributsData.audio.play().catch(() => ErrorHandler);
    }

    private setImage(isSimple: boolean): void {
        this.partieAttributsData.nbImages = isSimple ? constantes.PARTIE_SIMPLE_NB_IMAGES : constantes.PARTIE_MULTIPLE_NB_IMAGES;
        this.partieAttributsData.image = [];
        for (let i: number = 0; i < this.partieAttributsData.nbImages; i++) {
            this.partieAttributsData.image.push(new Image());
        }
    }

    private setID(): void {
        this.partieAttributsData.partieID = this.route.snapshot.params.idPartie;
    }

    private setIsMultijoueur(): void {
        this.route.snapshot.params.channelId === constantes.ZERO_STR_FORMAT ?
            this.partieAttributsMultijoueur.isMultijoueur = false
            : this.partieAttributsMultijoueur.isMultijoueur = true;
        if (this.partieAttributsMultijoueur.isMultijoueur) {
            this.setChannelId();
            this.setJoueurMultijoueur();
        }
    }

    private setChannelId(): void {
        this.partieAttributsMultijoueur.channelId = this.route.snapshot.params.channelId;
    }

    private setJoueurMultijoueur(): void {
        this.cookieService.get(USERNAME_STR) === constantes.STR_VIDE
            ? this.partieAttributsMultijoueur.joueurMultijoueur = ANONYME
            : this.partieAttributsMultijoueur.joueurMultijoueur = this.cookieService.get(USERNAME_STR);
    }
}
