import { Component, ViewChild } from "@angular/core";
import { MatDialog, MatMenuTrigger } from "@angular/material";
import { DialogSimpleComponent, } from "./dialog-simple/dialog-simple.component";
import { DialogMultipleComponent } from "./dialog-multiple/dialog-multiple.component";

export interface DialogData {
  simpleGameName: string;
  multipleGameName: string;
}

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"]
})

export class AdminComponent {

  gameName: string;
  @ViewChild("menuTrigger") menuTrigger: MatMenuTrigger;

  public constructor(public dialog: MatDialog) {
  }

  protected openDialogSimple(): void {
    this.gameName = "";
    this.dialog.open(DialogSimpleComponent, {
      height: "433px",
      width: "600px",
      data: {name: this.gameName}
    });
  }

  protected openDialogMultiple(): void {
    this.gameName = "";
    this.dialog.open(DialogMultipleComponent, {
      height: "433px",
      width: "600px",
      data: {name: this.gameName}
    });
  }
}
