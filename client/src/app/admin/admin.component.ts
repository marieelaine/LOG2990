import { Component, ViewChild } from "@angular/core";
import { MatDialog, MatMenuTrigger } from "@angular/material";
import { DialogSimpleComponent, } from "./dialog-simple/dialog-simple.component";
import { DialogMultipleComponent } from "./dialog-multiple/dialog-multiple.component";
import { DialogErreurComponent } from "./dialog-erreur/dialog-erreur.component";
import { SocketClientService } from "../socket/socket-client.service";
import * as event from "../../../../common/communication/evenementsSocket";

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

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"]
})

export class AdminComponent {

  protected gameName: string;
  @ViewChild("menuTrigger") protected menuTrigger: MatMenuTrigger;

  public constructor(public dialog: MatDialog, public socketClientService: SocketClientService) {
    this.initSocket();
  }

  protected openDialogSimple(): void {
    this.gameName = "";
    this.dialog.open(DialogSimpleComponent, {
      height: "550px",
      width: "600px",
      data: {name: this.gameName}
    });
  }

  protected openDialogMultiple(): void {
    this.gameName = "";
    this.dialog.open(DialogMultipleComponent, {
      height: "620px",
      width: "600px",
      data: {name: this.gameName}
    });
  }

  private openDialogWithData(msg: string): void {
    this.dialog.open(DialogErreurComponent, {
        height: "190px",
        width: "600px",
        panelClass: "dialog",
        data: { message : msg }
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
