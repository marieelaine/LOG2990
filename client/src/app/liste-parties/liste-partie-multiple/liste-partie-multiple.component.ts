import {Component, OnInit, ErrorHandler, AfterContentChecked} from "@angular/core";
import {ListePartiesComponent} from "../liste-parties.component";
import {Router} from "@angular/router";
import {DomSanitizer} from "@angular/platform-browser";
import {ListePartieServiceService} from "../liste-partie-service.service";
import {PartieMultiple} from "src/app/admin/dialog-multiple/partie-multiple";
import {DialogConfirmationComponent} from "../dialog-confirmation/dialog-confirmation.component";
import {MatDialog} from "@angular/material";
import {SocketClientService} from "src/app/socket/socket-client.service";
import * as event from "../../../../../common/communication/evenementsSocket";
import {DialogVueAttenteComponent} from "../dialog-vue-attente/dialog-vue-attente.component";
import { TempsUser } from "src/app/admin/joueur";
import { PartieMultipleInterface } from "../../../../../common/partie-multiple-interface";

@Component({
    selector: "app-liste-partie-multiple",
    templateUrl: "./liste-partie-multiple.component.html",
    styleUrls: ["./liste-partie-multiple.component.css"],
    providers: [SocketClientService]
})
export class ListePartieMultipleComponent extends ListePartiesComponent implements OnInit, AfterContentChecked {

    protected listeParties: PartieMultiple[];
    protected listePartieEnAttente: string[];

    public constructor(public router: Router,
                       public sanitizer: DomSanitizer,
                       public listePartieService: ListePartieServiceService,
                       public socketClientService: SocketClientService,
                       private dialog: MatDialog) {
        super(router, sanitizer, listePartieService);
        this.listeParties = [];
        this.listePartieEnAttente = [];
    }

    public ngOnInit(): void {
        this.listePartieService.getListePartieMultiple().subscribe((res: PartieMultipleInterface[]) => {
            this.reconstruirePartieMultiple(res);
        });
        this.listePartieService.getListePartieMultipleEnAttente().subscribe((res: string[]) => {
            this.listePartieEnAttente = res;
        });
        this.ajouterPartieSurSocketEvent();
    }

    public ngAfterContentChecked(): void {
        for (const partie of this.listeParties) {
            this.afficherImage(partie.id);
        }
    }

    protected reconstruirePartieMultiple(res: PartieMultipleInterface[]): void {
        for (const partie of res) {
            const tempsSolo: TempsUser[] = [];
            const tempsUnContreUn: TempsUser[] = [];

            for (const user of partie._tempsSolo) {
                const userSolo: TempsUser = new TempsUser(user._user, user._temps);
                tempsSolo.push(userSolo);
            }

            for (const user of partie._tempsUnContreUn) {
                const userMulti: TempsUser = new TempsUser(user._user, user._temps);
                tempsUnContreUn.push(userMulti);
            }

            const partieMultiple: PartieMultiple = new PartieMultiple(partie._nomPartie, tempsSolo, tempsUnContreUn, partie._image1PV1,
                                                                      partie._image1PV2, partie._image2PV1, partie._image2PV2,
                                                                      partie._imageDiff1, partie._imageDiff2, partie._quantiteObjets,
                                                                      partie._theme, partie._typeModification, partie._id);
            this.listeParties.push(partieMultiple);
        }
    }

    protected afficherImage(id: string): void {
        for (const partie of this.listeParties) {
            if (partie.id === id) {
                let data: string = "";

                data = atob(String(partie.image1PV1[0]));

                let hex: number = 0x00;
                const result: Uint8Array = new Uint8Array(data.length);

                for (let i: number = 0; i < data.length; i++) {
                    hex = data.charCodeAt(i);
                    result[i] = hex;
                }
                const blob: Blob = new Blob([result], {type: "image/bmp"});
                partie.imageBlob = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(blob));
            }
        }
    }

    protected onJouerOuReinitialiserClick(partieId: string): void {
        if (this.isListePartiesMode) {
            this.router.navigate(["/partie-multiple/" + partieId + "/0"])
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

    private async getChannelId(): Promise<string> {
        return this.listePartieService.getChannelIdMultiple();
    }

    private ouvrirDialogVueAttente(partieId: string): void {
        this.dialog.open(DialogVueAttenteComponent, {
            height: "220px",
            width: "600px",
            data: {id: partieId,
                   isSimple: false}
        });
    }

    private ouvrirDialogConfirmation(partieId: string): void {
        this.dialog.open(DialogConfirmationComponent, {
            height: "190px",
            width: "600px",
            data: {
                id: partieId,
                listeParties: this.listeParties,
                isSimple: false
            }
        });
    }

    private async checkJoindreOuSupprimer(partieId: string): Promise<void> {
        if (this.listePartieEnAttente.includes(partieId)) {
            const channelId: string = await this.getChannelId();
            this.listePartieService.joindrePartieMultijoueurMultiple(partieId, channelId).catch(() => ErrorHandler);
            this.router.navigate(["/partie-multiple/" + partieId + "/" + channelId])
            .catch(() => ErrorHandler);
        } else {
          this.listePartieService.ajouterPartieMultipleEnAttente(partieId).subscribe(() => {
            this.ouvrirDialogVueAttente(partieId);
          });
        }
    }

    protected reinitialiserTemps(partieId: string): void {
        this.listeParties.forEach((partie: PartieMultiple) => {
            if (partie.id === partieId) {
                partie.tempsSolo = this.genererTableauTempsAleatoires();
                partie.tempsUnContreUn = this.genererTableauTempsAleatoires();
                this.listePartieService.reinitialiserTempsPartieMultiple(partieId, partie.tempsSolo, partie.tempsUnContreUn)
                    .catch(() => ErrorHandler);
            }
        });
    }

    private ajouterPartieSurSocketEvent(): void {
        this.socketClientService.socket.on(event.ENVOYER_PARTIE_MULTIPLE, (data) => {
            this.listeParties.push(data);
        });
        this.socketClientService.socket.on(event.ENVOYER_PARTIE_MULTIPLE_ATTENTE, (data) => {
            this.listePartieEnAttente.push(data);
        });
        this.socketClientService.socket.on(event.DELETE_PARTIE_MULTIPLE_ATTENTE, (data) => {
            for (let i: number = 0; i < this.listePartieEnAttente.length; i++) {
                if (this.listePartieEnAttente[i] === data) {
                    this.listePartieEnAttente.splice(i, 1);
                }
            }
        });
        this.socketClientService.socket.on(event.DIALOG_ATTENTE_MULTIPLE_FERME, () => {
            this.mettreBoutonsACreer();
        });

        this.socketClientService.socket.on(event.JOINDRE_PARTIE_MULTIJOUEUR_MULTIPLE, (data) => {
            this.mettreBoutonsACreer();
        });
    }
}
