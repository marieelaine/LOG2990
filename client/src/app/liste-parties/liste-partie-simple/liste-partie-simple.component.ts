import { Component, OnInit, AfterContentChecked, ErrorHandler } from "@angular/core";
import { ListePartiesComponent } from "../liste-parties.component";
import { Router } from "@angular/router";
import { DomSanitizer } from "@angular/platform-browser";
import { ListePartieServiceService } from "../liste-partie-service.service";
import { PartieSimple } from "../../admin/dialog-simple/partie-simple";
import { MatDialog } from "@angular/material";
import { DialogConfirmationComponent } from "../dialog-confirmation/dialog-confirmation.component";
import { SocketClientService } from "src/app/socket/socket-client.service";
import * as event from "../../../../../common/communication/evenementsSocket";
import { DialogVueAttenteComponent } from "../dialog-vue-attente/dialog-vue-attente.component";
import { Joueur } from "src/app/admin/joueur";
import { PartieSimpleInterface } from "../../../../../common/partie-simple-interface";
import * as constantes from "../../constantes";
import {CookieService} from "ngx-cookie-service";

const LARGEUR_DIALOG_CONFIRMATION: string = "600px";
const HAUTEUR_DIALOG_CONFIRMATION: string = "190px";
const LARGEUR_DIALOG_ATTENTE: string = "280px";
const HAUTEUR_DIALOG_ATTENTE: string = "255px";
const URL_PARTIE_SIMPLE: string = "/partie-simple/";
const URL_SLASH: string = "/";

@Component({
    selector: "app-liste-partie-simple",
    templateUrl: "./liste-partie-simple.component.html",
    styleUrls: ["./liste-partie-simple.component.css"],
    providers: [SocketClientService]
})

export class ListePartieSimpleComponent extends ListePartiesComponent implements OnInit, AfterContentChecked {

    protected listeParties: PartieSimple[];
    protected listePartieEnAttente: string[];

    public constructor(public router: Router,
                       public sanitizer: DomSanitizer,
                       public listePartieService: ListePartieServiceService,
                       public socketClientService: SocketClientService,
                       private dialog: MatDialog,
                       public cookieService: CookieService) {
        super(router, sanitizer, listePartieService, socketClientService, cookieService);
        this.listeParties = [];
        this.listePartieEnAttente = [];
    }

    public ngOnInit(): void {
        this.listePartieService.getListePartieSimple().subscribe((res: PartieSimpleInterface[]) => {
            this.reconstruireListePartieSimple(res);
        });
        this.listePartieService.getListePartieSimpleEnAttente().subscribe((res: string[]) => {
            this.listePartieEnAttente = res;
        });

        this.ajouterPartieSurSocketEvent();
    }

    public ngAfterContentChecked(): void {
        for (const partie of this.listeParties) {
            this.afficherImage(partie.id);
        }
    }

    protected reconstruireListePartieSimple(res: PartieSimpleInterface[]): void {
        for (const partie of res) {
            this.reconstruirePartieSimple(partie);
        }
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
            this.listeParties.push(partieSimple);
        }

    protected afficherImage(id: string): void {
        for (const partie of this.listeParties) {
            if (partie.id === id) {
                let data: string = constantes.STR_VIDE;

                data = atob(String(partie.image1[0]));

                let hex: number = 0x00;
                const result: Uint8Array = new Uint8Array(data.length);

                for (let i: number = 0; i < data.length; i++) {
                    hex = data.charCodeAt(i);
                    result[i] = hex;
                }
                const blob: Blob = new Blob([result], {type: constantes.IMAGE_BLOB});
                partie.imageBlob = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(blob));
            }
        }
    }

    protected onJouerOuReinitialiserClick(partieId: string): void {
        if (this.isListePartiesMode) {
            this.router.navigate([URL_PARTIE_SIMPLE + partieId + URL_SLASH + 0])
                .catch(() => ErrorHandler);
        } else if (this.isAdminMode) {
            this.reinitialiserTemps(partieId);
        }
    }

    protected async onCreerOuSupprimerClick(partieId: string): Promise<void> {
        if (this.isListePartiesMode) {
            await this.checkJoindreOuSupprimer(partieId);
        } else if (this.isAdminMode) {
            this.ouvrirDialogConfirmation(partieId);
        }
    }

    protected reinitialiserTemps(partieId: string): void {
        this.listeParties.forEach((partie: PartieSimple) => {
            if (partie.id === partieId) {
                partie.tempsSolo = this.genererTableauTempsAleatoires();
                partie.tempsUnContreUn = this.genererTableauTempsAleatoires();
                this.listePartieService.reinitialiserTempsPartieSimple(partieId, partie.tempsSolo, partie.tempsUnContreUn)
                    .catch(() => ErrorHandler);
            }
        });
    }

    private async checkJoindreOuSupprimer(partieId: string): Promise<void> {
        if (this.listePartieEnAttente.includes(partieId)) {
            const channelId: string = await this.getChannelId();
            this.listePartieService.joindrePartieMultijoueurSimple(partieId, channelId).catch(() => ErrorHandler);
            this.router.navigate([URL_PARTIE_SIMPLE + partieId + URL_SLASH + channelId])
                .catch(() => ErrorHandler);
        } else {
            this.listePartieService.ajouterPartieSimpleEnAttente(partieId).subscribe(() => {
                this.ouvrirDialogVueAttente(partieId);
            });
        }
    }

    private async getChannelId(): Promise<string> {
        return this.listePartieService.getChannelIdSimple();
    }

    private ouvrirDialogVueAttente(partieId: string): void {
        this.dialog.open(DialogVueAttenteComponent, {
            height: HAUTEUR_DIALOG_ATTENTE,
            width: LARGEUR_DIALOG_ATTENTE,
            data: {
                id: partieId,
                isSimple: true
            }
        });
    }

    private ouvrirDialogConfirmation(partieId: string): void {
        this.dialog.open(DialogConfirmationComponent, {
            height: HAUTEUR_DIALOG_CONFIRMATION,
            width: LARGEUR_DIALOG_CONFIRMATION,
            data: {
                id: partieId,
                listeParties: this.listeParties,
                isSimple: true
            }
        });
    }

    private ajouterPartieSurSocketEvent(): void {
        this.socketClientService.socket.on(event.ENVOYER_PARTIE_SIMPLE, (data) => {
            this.reconstruirePartieSimple(data);
        });

        this.socketClientService.socket.on(event.ENVOYER_PARTIE_SIMPLE_ATTENTE, (data) => {
            this.listePartieEnAttente.push(data);
        });

        this.socketClientService.socket.on(event.DELETE_PARTIE_SIMPLE_ATTENTE, (data) => {
            for (let i: number = 0; i < this.listePartieEnAttente.length; i++) {
                if (this.listePartieEnAttente[i] === data) {
                    this.listePartieEnAttente.splice(i, 1);
                }
            }
        });

        this.socketClientService.socket.on(event.DIALOG_ATTENTE_MULTIPLE_FERME, () => {
            this.mettreBoutonsACreer();
        });

        this.socketClientService.socket.on(event.JOINDRE_PARTIE_MULTIJOUEUR_SIMPLE, (data) => {
            this.mettreBoutonsACreer();
        });
    }
}
