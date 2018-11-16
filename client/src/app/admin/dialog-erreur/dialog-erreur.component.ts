import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { Data } from "@angular/router";

@Component({
  selector: "app-dialog-erreur",
  templateUrl: "./dialog-erreur.component.html",
  styleUrls: ["./dialog-erreur.component.css"]
})
export class DialogErreurComponent {

  protected messageErreur: string;

  public constructor(private dialogRef: MatDialogRef<DialogErreurComponent>,
                     @Inject(MAT_DIALOG_DATA) data: Data) {
    this.messageErreur = data.message;
  }

  protected fermerDialog(): void {
    this.dialogRef.close();
  }
}
