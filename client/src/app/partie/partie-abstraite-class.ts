import {ChronoService} from "../chrono/chrono.service";
import {ElementRef, ErrorHandler, QueryList, ViewChildren, ViewChild} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {PartieService} from "./partie.service";
import {PartieSimple} from "../admin/dialog-simple/partie-simple";
import {PartieMultiple} from "../admin/dialog-multiple/partie-multiple";
import {ChatComponent} from "../chat/chat.component";
import {CookieService} from "ngx-cookie-service";
import {Joueur} from "../admin/joueur";
import * as constantes from "../constantes";
import {MatDialog} from "@angular/material";
import {DialogFinPartieComponent} from "./dialog-fin-partie/dialog-fin-partie.component";
import {PartieAttributsData} from "./partie-attributs-data/partie-attributs-data";
import {PartieAttributsAdmin} from "./partie-attributs-admin/partie-attributs-admin";
import {PartieAttributsMultijoueur} from "./partie-attributs-multijoueur/partie-attributs-multijoueur";

export abstract class PartieAbstraiteClass {

    @ViewChildren(constantes.CANVAS) protected canvas: QueryList<ElementRef>;
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
        this.partieAttributsData = new PartieAttributsData();
        this.partieAttributsAdmin = new PartieAttributsAdmin();
        this.partieAttributsMultijoueur = new PartieAttributsMultijoueur();
        this.chat = new ChatComponent();

        this.chrono.reset();
        this.setImage(isSimple);
        this.setID();
        this.setEstMultijoueur();
        this.setPartie();
    }

    protected abstract setPartie(): void;

    protected abstract getImageData(): void;

    protected abstract ajouterTemps(partieID: string, tempsUser: Joueur, isSolo: boolean): void;

    protected async abstract supprimerChannelId(): Promise<void>;

    protected async abstract regarderPartieTerminee(): Promise<void>;

    protected ouvrirDialogFinPartie(): void {
        this.dialog.open(DialogFinPartieComponent, {
            height: constantes.HAUTEUR_DIALOGUE,
            width: constantes.LARGEUR_DIALOGUE,
            data: {message: this.partieAttributsAdmin.messageDifferences}
        });
    }

    protected commencerPartie(): void {
        this.partieAttributsAdmin.partieCommence = true;
        this.partieAttributsAdmin.messageDifferences = constantes.MESSAGE_TROUVE_PART1
            + this.partieAttributsAdmin.differencesTrouvees + constantes.DIFFERENCES;

        this.chrono.commencerChrono();
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

        const context: CanvasRenderingContext2D = canvas.nativeElement.getContext(constantes.CONTEXT_2D);
        image.src = URL.createObjectURL(blob);
        image.onload = () => {
            context.drawImage(image, 0, 0);
        };
    }

    protected ajouterMessageDiffTrouvee(joueur: string): void {
        this.partieAttributsMultijoueur.isMultijoueur ?
            this.chat.ajouterMessageAuMessagesChat(constantes.DIFF_TROUVE_PAR + joueur)
            : this.chat.ajouterMessageAuMessagesChat(constantes.DIFF_TROUVE);
    }

    protected async terminerPartie(gagnant: string): Promise<void> {
        this.partieAttributsMultijoueur.isMultijoueur ? await this.partieMultijoueurTerminee(gagnant) : this.partieSoloTerminee();
    }

    protected async partieMultijoueurTerminee(gagnant: string): Promise<void> {
        this.chrono.arreterChrono();

        if (this.partieAttributsMultijoueur.joueurMultijoueur === gagnant) {
            this.partieAttributsAdmin.messageDifferences = constantes.FELICITATIONS_MULTI;
            const tempsUser: Joueur =  new Joueur(gagnant, this.chrono.getTemps());
            this.jouerApplaudissements();
            this.ajouterTemps(this.partieAttributsData.partieID, tempsUser, false);
            await this.supprimerChannelId();
        } else {
            this.partieAttributsAdmin.messageDifferences = constantes.PERDU_MULTI;
            this.jouerSonPerdant();
        }
        this.ouvrirDialogFinPartie();
    }

    protected async trouverDifference(): Promise<void> {
        if (this.partieAttributsAdmin.partieCommence) {
            this.augmenterDiffTrouvee();
            this.jouerSonYes();
        }
        await this.regarderPartieTerminee();
    }

    protected partieSoloTerminee(): void {
        this.chrono.arreterChrono();
        const tempsUser: Joueur =  new Joueur(this.cookieService.get(constantes.USERNAME_STR), this.chrono.getTemps());
        this.partieAttributsAdmin.messageDifferences = constantes.FELICITATIONS;
        this.ouvrirDialogFinPartie();
        this.jouerApplaudissements();
        this.ajouterTemps(this.partieAttributsData.partieID, tempsUser, true);
    }

    protected updateTableauTempsSolo(temps: number): void {
        let joueur: string = this.cookieService.get(constantes.USERNAME_STR);
        if (joueur === constantes.STR_VIDE) {
            joueur = constantes.ANONYME;
        }
        if (temps < this.partie.tempsSolo[constantes.PARTIE_SECOND_ELEMENT].temps) {
            const tempsUser: Joueur = new Joueur(joueur, temps);
            this.partie.tempsSolo.splice(-1, 1);
            this.partie.tempsSolo.push(tempsUser);
        }
    }

    protected augmenterDiffTrouvee(): void {
        this.partieAttributsAdmin.differencesTrouvees++;
        this.partieAttributsAdmin.messageDifferences = constantes.MESSAGE_TROUVE_PART1
            + this.partieAttributsAdmin.differencesTrouvees + constantes.DIFFERENCES;
    }

    protected jouerSonYes(): void {
        this.partieAttributsData.audio.src = constantes.AUDIO_REUSSI;
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
        const ctx: CanvasRenderingContext2D = canvas.getContext(constantes.CONTEXT_2D) as CanvasRenderingContext2D;
        const imageSaved: ImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        ctx.font = constantes.FONT;
        ctx.textAlign = constantes.TEXT_ALIGN;
        ctx.fillStyle = constantes.ERREUR_COULEUR_INTERIEUR;
        ctx.fillText(constantes.ERREUR, event.offsetX, event.offsetY + constantes.OFFSET_ADDITIONNEL);
        ctx.lineWidth = constantes.LINE_WIDTH;
        ctx.fillStyle = constantes.ERREUR_COULEUR_CONTEUR;
        ctx.strokeText(constantes.ERREUR, event.offsetX, event.offsetY + constantes.OFFSET_ADDITIONNEL);
        this.partieAttributsData.audio.src = constantes.AUDIO_ERREUR;
        this.partieAttributsData.audio.load();
        this.partieAttributsData.audio.play().catch(() => ErrorHandler);

        if (!this.partieAttributsMultijoueur.isMultijoueur) {
            this.chat.ajouterMessageAuMessagesChat(constantes.ERREUR_CHAT);
        }

        setTimeout(() => {
            ctx.putImageData(imageSaved, 0, 0);
            this.partieAttributsAdmin.penaliteEtat = false;
        },         constantes.TIMEOUT);
    }

    protected afficherPartie(): void {
        this.getImageData();
        this.setup();
    }

    private jouerApplaudissements(): void {
        this.partieAttributsData.audio.src = constantes.AUDIO_APPLAUDISSEMENT;
        this.partieAttributsData.audio.load();
        this.partieAttributsData.audio.play().catch(() => ErrorHandler);
    }

    private jouerSonPerdant(): void {
        this.partieAttributsData.audio.src = constantes.AUDIO_PERDANT;
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

    private setEstMultijoueur(): void {
        this.route.snapshot.params.channelId === constantes.ZERO_STR_FORMAT ?
            this.partieAttributsMultijoueur.isMultijoueur = false
            : this.partieAttributsMultijoueur.isMultijoueur = true;
        if (this.partieAttributsMultijoueur.isMultijoueur) {
            this.setChannelId();
            this.setJouerMultijoueur();
        }
    }

    private setChannelId(): void {
        this.partieAttributsMultijoueur.channelId = this.route.snapshot.params.channelId;
    }

    private setJouerMultijoueur(): void {
        this.cookieService.get(constantes.USERNAME_STR) === constantes.STR_VIDE
            ? this.partieAttributsMultijoueur.joueurMultijoueur = constantes.ANONYME
            : this.partieAttributsMultijoueur.joueurMultijoueur = this.cookieService.get(constantes.USERNAME_STR);
    }
}
