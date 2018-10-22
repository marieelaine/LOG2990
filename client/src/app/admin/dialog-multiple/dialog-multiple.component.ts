import { Component, Inject } from '@angular/core';
import { ListePartiesComponent } from '../../liste-parties/liste-parties.component';
import { PartieMultipleInterface } from '../../liste-parties/liste-partie-multiple/liste-partie-multiple.component';
import { DialogAbstrait } from '../dialog-abstrait';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DialogData } from '../admin.component';
import { HttpClient } from '@angular/common/http';
import { PartieSimpleService } from '../partie-simple.service';

@Component({
  selector: 'app-dialog-multiple',
  templateUrl: './dialog-multiple.component.html',
  styleUrls: ['./dialog-multiple.component.css']
})
export class DialogMultipleComponent {

  errorMessage: string;
  partieMultiple: PartieMultipleInterface;
  listeParties: ListePartiesComponent;

  public constructor(
    public dialogRef: MatDialogRef<DialogMultipleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private http: HttpClient,
    private partieSimpleService: PartieSimpleService) {
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
