import { Component, ViewChild, OnInit } from "@angular/core";
import { MatDialog, MatMenuTrigger } from "@angular/material";
import { DialogSimpleComponent, } from "./dialog-simple/dialog-simple.component";
import { DialogMultipleComponent } from "./dialog-multiple/dialog-multiple.component";
import * as event from "../../../../common/communication/evenementsSocket";
import * as io from "socket.io-client";

export interface DialogData {
  simpleGameName: string;
  multipleGameName: string;
  quantiteObjets: number;
  theme: string;
  typeModification: string;
}

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"]
})

export class AdminComponent implements OnInit {

  gameName: string;
  @ViewChild("menuTrigger") menuTrigger: MatMenuTrigger;

  private socket: SocketIOClient.Socket;

  public constructor(public dialog: MatDialog) {
    this.socket = io("localhost:3000");
  }

  ngOnInit(): void {
    this.socket.on(event.ENVOYER_MESSAGE_BMPDIFF, (data) => {
      console.log(data);
  });
}

  protected openDialogSimple(): void {
    this.gameName = "";
    this.dialog.open(DialogSimpleComponent, {
      height: "470px",
      width: "600px",
      data: {name: this.gameName}
    });
  }

  protected openDialogMultiple(): void {
    this.gameName = "";
    this.dialog.open(DialogMultipleComponent, {
      height: "520px",
      width: "600px",
      data: {name: this.gameName}
    });
  }
}
