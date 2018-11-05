import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ListePartieServiceService } from '../liste-partie-service.service';

@Component({
  selector: 'app-dialog-confirmation',
  templateUrl: './dialog-confirmation.component.html',
  styleUrls: ['./dialog-confirmation.component.css']
})

export class DialogConfirmationComponent {

  private partieSimpleId: string;

  constructor(
    public dialogRef: MatDialogRef<DialogConfirmationComponent>,
    private listePartieService: ListePartieServiceService,
    @Inject(MAT_DIALOG_DATA) data) {
      this.partieSimpleId = data.id;
     }

  protected onConfirmationClick(): void {
    console.log("allo");
    // this.listePartieService.deletePartieSimple(this.partieSimpleId);
  }

}
