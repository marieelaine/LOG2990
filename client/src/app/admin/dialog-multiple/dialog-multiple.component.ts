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

  protected onSubmit(): void {
    // a faire
    // quand tu click sur le bouton ajouter
  }

  protected onThemeClickButton(): void {
    console.log("bonjour du bouton geometrique");
  }

  // sur le click ajouter, call close dialog if requ and on submit
  protected onClickAjouterPartie(): void {

  }

  protected verifierSiMessageErreur(): Boolean {

    return (this.outOfBoundNameLengthMessage !== "");
  }
}
