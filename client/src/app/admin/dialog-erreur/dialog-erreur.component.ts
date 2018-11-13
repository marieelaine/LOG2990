import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-dialog-erreur',
  templateUrl: './dialog-erreur.component.html',
  styleUrls: ['./dialog-erreur.component.css']
})

export class DialogErreurComponent {

  public messageErreur: string;

  constructor(private dialogRef: MatDialogRef<DialogErreurComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
    this.messageErreur = data.message;
  }

  protected fermerDialog() {
    this.dialogRef.close();
  }
}
