import { Component, Inject } from '@angular/core';
import { ListePartiesComponent } from '../../liste-parties/liste-parties.component';
import { PartieMultipleInterface } from '../../liste-parties/liste-partie-multiple/liste-partie-multiple.component';
import { DialogAbstrait } from '../dialog-abstrait';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DialogData } from '../admin.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dialog-multiple',
  templateUrl: './dialog-multiple.component.html',
  styleUrls: ['./dialog-multiple.component.css']
})
export class DialogMultipleComponent extends DialogAbstrait {

  errorMessage: string;
  partieMultiple: PartieMultipleInterface;
  listeParties: ListePartiesComponent;

  public constructor(
    dialogRef: MatDialogRef<DialogMultipleComponent>,
    @Inject(MAT_DIALOG_DATA) data: DialogData,
    http: HttpClient) {
      super(dialogRef, data, http);
    }

  protected onFileSelectedImage(event, i): void {
    // a faire
  }

  protected onSubmit(): void {
    // a faire
  }
}
