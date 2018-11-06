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
  private listePartieSimples: PartieSimple[];

  constructor(
    public dialogRef: MatDialogRef<DialogConfirmationComponent>,
    private listePartieService: ListePartieServiceService,
    @Inject(MAT_DIALOG_DATA) data) {
      this.partieSimpleId = data.id;
      this.listePartieSimples = data.listeParties;
      console.log(data.listeParties);
     }

  protected onConfirmationClick(): void {
    this.listePartieService.deletePartieSimple(this.partieSimpleId);
    for (let i = 0 ; i < this.listePartieSimples.length ; i++) {
      if (this.listePartieSimples[i]["_id"]  === this.partieSimpleId) {
        this.listePartieSimples.splice(i, 1);
      }
    }
    this.dialogRef.close();
  }

  protected onDialogClose(): void {
    this.dialogRef.close();
  }

}
