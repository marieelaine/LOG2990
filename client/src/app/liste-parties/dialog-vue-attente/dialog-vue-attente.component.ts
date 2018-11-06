import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-dialog-vue-attente',
  templateUrl: './dialog-vue-attente.component.html',
  styleUrls: ['./dialog-vue-attente.component.css']
})
export class DialogVueAttenteComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogVueAttenteComponent>
  ) { }

  protected onDialogClose(): void {
    this.dialogRef.close();
  }

}
