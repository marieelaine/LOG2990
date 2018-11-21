import { Component, ErrorHandler, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Router, Data } from "@angular/router";

@Component({
  selector: "app-dialog-fin-partie",
  templateUrl: "./dialog-fin-partie.component.html",
  styleUrls: ["./dialog-fin-partie.component.css"]
})
export class DialogFinPartieComponent {

  protected message: string;
  protected content: string;

  public constructor(
    private dialogRef: MatDialogRef<DialogFinPartieComponent>,
    public router: Router,
    @Inject(MAT_DIALOG_DATA) data: Data
  ) {
    this.message = data.message;
    dialogRef.disableClose = true;
    if (this.message === "PUTAIN T'AS PERDU MEC!") {
      this.content = "Veux-tu rejouer pour regagner ton honneur?";
    }
   }

  protected onDialogClose(): void {
    this.dialogRef.close();
    this.router.navigate(["/liste-parties/"]).catch(() => ErrorHandler);

  }
}
