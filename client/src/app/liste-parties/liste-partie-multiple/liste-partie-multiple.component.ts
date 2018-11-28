import {Component, OnInit, ErrorHandler} from "@angular/core";
import {ListePartiesComponent} from "../liste-parties.component";
import {Router} from "@angular/router";
import {ListePartieServiceService} from "../liste-partie-service.service";
import {PartieMultiple} from "src/app/admin/dialog-multiple/partie-multiple";
import {DialogConfirmationComponent} from "../dialog-confirmation/dialog-confirmation.component";
import {MatDialog} from "@angular/material";
import {SocketClientService} from "src/app/socket/socket-client.service";
import * as event from "../../../../../common/communication/evenementsSocket";
import {DialogVueAttenteComponent} from "../dialog-vue-attente/dialog-vue-attente.component";

@Component({
    selector: "app-liste-partie-multiple",
    templateUrl: "./liste-partie-multiple.component.html",
    styleUrls: ["./liste-partie-multiple.component.css"],
    providers: [SocketClientService]
})
export class ListePartieMultipleComponent extends ListePartiesComponent implements OnInit {

    protected listeParties: PartieMultiple[];
    protected listePartieEnAttente: string[];

    public constructor(public router: Router,
                       public listePartieService: ListePartieServiceService,
                       public socketClientService: SocketClientService,
                       private dialog: MatDialog) {
        super(router, listePartieService);
        this.listeParties = [];
        this.listePartieEnAttente = [];
    }

    public ngOnInit(): void {
        this.listePartieService.getListePartieMultiple().subscribe((res: PartieMultiple[]) => {
            this.listeParties = res;
        });
        this.listePartieService.getListePartieMultipleEnAttente().subscribe((res: string[]) => {
            this.listePartieEnAttente = res;
        });
        this.ajouterPartieSurSocketEvent();
    }

    protected afficherImage(id: string): void {
        this.ajusterImage(id, this.listeParties, false);
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
          this.listePartieService.addPartieMultipleEnAttente(partieId).subscribe(() => {
            this.ouvrirDialogVueAttente(partieId);
          });
        }
    }

    protected reinitialiserTemps(partieId: string): void {
        this.listeParties.forEach((partie: PartieMultiple) => {
            if (partie["_id"] === partieId) {
                partie["_tempsSolo"] = this.genererTableauTempsAleatoires();
                partie["_tempsUnContreUn"] = this.genererTableauTempsAleatoires();
                this.listePartieService.reinitialiserTempsPartieMultiple(partieId, partie["_tempsSolo"], partie["_tempsUnContreUn"])
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
