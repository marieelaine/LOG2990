import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-vue-attente',
  templateUrl: './dialog-vue-attente.component.html',
  styleUrls: ['./dialog-vue-attente.component.css']
})
export class DialogVueAttenteComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogVueAttenteComponent>,
    public router: Router,
    ) {
    dialogRef.disableClose = true;
  }

  protected onDialogClose(): void {
    this.dialogRef.close();
    this.router.navigate(["/liste-parties/"]);
  }

}
