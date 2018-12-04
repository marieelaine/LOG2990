import {Component, ViewChild} from "@angular/core";
import {MatDialog, MatMenuTrigger} from "@angular/material";
import {DialogSimpleComponent} from "./dialog-simple/dialog-simple.component";
import {DialogMultipleComponent} from "./dialog-multiple/dialog-multiple.component";
import {DialogErreurComponent} from "./dialog-erreur/dialog-erreur.component";
import {SocketClientService} from "../socket/socket-client.service";
import * as event from "../../../../common/communication/evenementsSocket";
import * as constantes from "../constantes";

export interface DialogData {
    simpleGameName: string;
    multipleGameName: string;
    quantiteObjets: number;
    theme: string;
    typeModification: string;
}

export interface Checkbox {
    name: string;
    checked: boolean;
    value: string;
}

const MENU_TRIGGER: string = "menuTrigger";
const LARGEUR: string = "600px";
const HAUTEUR_SIMPLE: string = "550px";
const HAUTEUR_MULTIPLE: string = "620px";
const HAUTEUR_ERREUR: string = "190px";
const PANEL_CLASS: string = "dialog";

@Component({
    selector: "app-admin",
    templateUrl: "./admin.component.html",
    styleUrls: ["./admin.component.css"]
})

export class AdminComponent {

    protected gameName: string;
    @ViewChild(MENU_TRIGGER) protected menuTrigger: MatMenuTrigger;

    public constructor(public dialog: MatDialog, public socketClientService: SocketClientService) {
        this.initSocket();
    }

    protected openDialogSimple(): void {
        this.gameName = constantes.STR_VIDE;
        this.dialog.open(DialogSimpleComponent, {
            height: HAUTEUR_SIMPLE,
            width: LARGEUR,
            data: {name: this.gameName}
        });
    }

    protected openDialogMultiple(): void {
        this.gameName = constantes.STR_VIDE;
        this.dialog.open(DialogMultipleComponent, {
            height: HAUTEUR_MULTIPLE,
            width: LARGEUR,
            data: {name: this.gameName}
        });
    }

    private openDialogWithData(msg: string): void {
        this.dialog.open(DialogErreurComponent, {
            height: HAUTEUR_ERREUR,
            width: LARGEUR,
            panelClass: PANEL_CLASS,
            data: {message: msg}
        });
    }

    private initSocket(): void {
        this.socketClientService.socket.on(event.ENVOYER_MESSAGE_BMPDIFF, (data) => {
            this.openDialogWithData(data);
        });

        this.socketClientService.socket.on(event.ENVOYER_MESSAGE_NOM_PRIS, (data) => {
            this.openDialogWithData(data);
        });
    }
}
