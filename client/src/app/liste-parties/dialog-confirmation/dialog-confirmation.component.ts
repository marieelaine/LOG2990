import { Component, Inject, ErrorHandler} from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { ListePartieServiceService } from "../liste-partie-service.service";
import { PartieSimple } from "src/app/admin/dialog-simple/partie-simple";
import { PartieMultiple } from "src/app/admin/dialog-multiple/partie-multiple";

@Component({
  selector: "app-dialog-confirmation",
  templateUrl: "./dialog-confirmation.component.html",
  styleUrls: ["./dialog-confirmation.component.css"]
})

export class DialogConfirmationComponent {

  private partieId: string;
  private listePartiesSimples: PartieSimple[];
  private listePartiesMultiples: PartieMultiple[];
  private isSimple: boolean;

  public constructor(
    private dialogRef: MatDialogRef<DialogConfirmationComponent>,
    private listePartieService: ListePartieServiceService,
    @Inject(MAT_DIALOG_DATA) data) {

      this.partieId = data.id;
      this.isSimple = data.isSimple;
      this.setListeParties(data);
  }

  protected onConfirmationClick(): void {
    this.isSimple ? this.supprimerPartieSimple() : this.supprimerPartieMultiple();
    this.dialogRef.close();
  }

  protected onDialogClose(): void {
    this.dialogRef.close();
  }

  private setListeParties(data): void {
    if (this.isSimple) {
      this.listePartiesSimples = data.listeParties;
      this.listePartiesMultiples = [];
    } else {
      this.listePartiesMultiples = data.listeParties;
      this.listePartiesSimples = [];
    }
  }

  private supprimerPartieSimple(): void {
    this.listePartieService.deletePartieSimple(this.partieId).catch(() => ErrorHandler);
    this.supprimerPartieSimpleDeLaffichage();
  }

  private supprimerPartieMultiple(): void {
    this.listePartieService.deletePartieMultiple(this.partieId).catch(() => ErrorHandler);
    this.supprimerPartieMultipleDeLaffichage();
  }

  private supprimerPartieSimpleDeLaffichage(): void {
    for (let i = 0 ; i < this.listePartiesSimples.length ; i++) {
      if (this.listePartiesSimples[i]["_id"]  === this.partieId) {
        this.listePartiesSimples.splice(i, 1);
      }
    }
  }

  private supprimerPartieMultipleDeLaffichage(): void {
    for (let i = 0 ; i < this.listePartiesMultiples.length ; i++) {
      if (this.listePartiesMultiples[i]["_id"]  === this.partieId) {
        this.listePartiesMultiples.splice(i, 1);
      }
    }
  }

}
