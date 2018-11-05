import { Component } from '@angular/core';
import { DialogMultipleComponent } from '../dialog-multiple/dialog-multiple.component';
import { MatDialogRef, MatDialog } from '@angular/material';

@Component({
  selector: 'app-dialog-confirmation',
  templateUrl: './dialog-confirmation.component.html',
  styleUrls: ['./dialog-confirmation.component.css']
})
export class DialogConfirmationComponent {

  constructor(public dialog: MatDialog) {  }

}
