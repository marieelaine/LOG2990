import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ListePartieServiceService } from '../liste-partie-service.service';
import { PartieSimple } from 'src/app/admin/dialog-simple/partie-simple';

@Component({
  selector: 'app-dialog-confirmation',
  templateUrl: './dialog-confirmation.component.html',
  styleUrls: ['./dialog-confirmation.component.css']
})

export class DialogConfirmationComponent {

  private partieSimpleId: string;
  private listeParties: PartieSimple[];
  private isSimple: boolean;

  constructor(
    public dialogRef: MatDialogRef<DialogConfirmationComponent>,
    private listePartieService: ListePartieServiceService,
    @Inject(MAT_DIALOG_DATA) data) {
      this.partieSimpleId = data.id;
      this.listeParties = data.listeParties;
      this.isSimple = data.isSimple;
     }

  protected onConfirmationClick(): void {
    if (this.isSimple) {
      this.supprimerPartieSimple();
    } else {
      this.supprimerPartieMultiple();
    }
    this.dialogRef.close();
  }

  private supprimerPartieSimple(): void {
    this.listePartieService.deletePartieSimple(this.partieSimpleId);
    for (let i = 0 ; i < this.listeParties.length ; i++) {
      if (this.listeParties[i]["_id"]  === this.partieSimpleId) {
        this.listeParties.splice(i, 1);
      }
    }
  }

  private supprimerPartieMultiple(): void {
    this.listePartieService.deletePartieMultiple(this.partieSimpleId);
    for (let i = 0 ; i < this.listeParties.length ; i++) {
      if (this.listeParties[i]["_id"]  === this.partieSimpleId) {
        this.listeParties.splice(i, 1);
      }
    }
  }

  protected onDialogClose(): void {
    this.dialogRef.close();
  }

}
