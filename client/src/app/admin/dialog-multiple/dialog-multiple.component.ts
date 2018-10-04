import { Component, Inject } from '@angular/core';
import { ListePartiesComponent } from '../../liste-parties/liste-parties.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from '../admin.component';
import { ListePartieMultipleInterface } from '../../liste-parties/liste-partie-multiple/liste-partie-multiple.component';

@Component({
  selector: 'app-dialog-multiple',
  templateUrl: './dialog-multiple.component.html',
  styleUrls: ['./dialog-multiple.component.css']
})
export class DialogMultipleComponent {

  errorMessage: string;
  partieMultiple: ListePartieMultipleInterface;
  listeParties: ListePartiesComponent;

  constructor(
    public dialogRef: MatDialogRef<DialogMultipleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      this.errorMessage = "";
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onAddMultipleGameClick(): void {
    if (this.data.multipleGameName === "" || this.data.multipleGameName === undefined) {
      // Regarder s'il y a bien deux images
      this.errorMessage = "*Message d'erreur...";
    } else {
      this.dialogRef.close();
    }
  }
}
