import { Component, Inject, ErrorHandler} from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { ListePartieServiceService } from "../liste-partie-service.service";
import { PartieSimple } from "src/app/admin/dialog-simple/partie-simple";
import { PartieMultiple } from "src/app/admin/dialog-multiple/partie-multiple";
import { Data } from "@angular/router";

@Component({
  selector: "app-dialog-confirmation",
  templateUrl: "./dialog-confirmation.component.html",
  styleUrls: ["./dialog-confirmation.component.css"]
})

export class DialogConfirmationComponent {

  private partieId: string;
  private listePartiesSimples: PartieSimple[];
  private listePartiesMultiples: PartieMultiple[];
  private estSimple: boolean;

  public constructor(
    private dialogRef: MatDialogRef<DialogConfirmationComponent>,
    private listePartieService: ListePartieServiceService,
    @Inject(MAT_DIALOG_DATA) data: Data) {

      this.partieId = data.id;
      this.estSimple = data.isSimple;
      this.setListeParties(data);
  }

  protected surClickConfirmation(): void {
    this.estSimple ? this.supprimerPartieSimple() : this.supprimerPartieMultiple();
    this.dialogRef.close();
  }

  protected fermerDialog(): void {
    this.dialogRef.close();
  }

  private setListeParties(data: Data): void {
    if (this.estSimple) {
      this.listePartiesSimples = data.listeParties;
      this.listePartiesMultiples = [];
    } else {
      this.listePartiesMultiples = data.listeParties;
      this.listePartiesSimples = [];
    }
  }

  private supprimerPartieSimple(): void {
    this.listePartieService.supprimerPartieSimple(this.partieId).catch(() => ErrorHandler);
    this.supprimerPartieSimpleDeLaffichage();
  }

  private supprimerPartieMultiple(): void {
    this.listePartieService.supprimerPartieMultiple(this.partieId).catch(() => ErrorHandler);
    this.supprimerPartieMultipleDeLaffichage();
  }

  private supprimerPartieSimpleDeLaffichage(): void {
    for (let i: number = 0 ; i < this.listePartiesSimples.length ; i++) {
      if (this.listePartiesSimples[i].id  === this.partieId) {
        this.listePartiesSimples.splice(i, 1);
      }
    }
  }

  private supprimerPartieMultipleDeLaffichage(): void {
    for (let i: number = 0 ; i < this.listePartiesMultiples.length ; i++) {
      if (this.listePartiesMultiples[i].id  === this.partieId) {
        this.listePartiesMultiples.splice(i, 1);
      }
    }
  }

}
