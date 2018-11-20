import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material";

@Component({
  selector: "app-dialog-fin-partie",
  templateUrl: "./dialog-fin-partie.component.html",
  styleUrls: ["./dialog-fin-partie.component.css"]
})
export class DialogFinPartieComponent {

  public constructor(
    public dialogRef: MatDialogRef<DialogFinPartieComponent>
  ) { }

}
