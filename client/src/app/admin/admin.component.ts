import { Component, OnInit, Inject } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface DialogData {
  gameName: string;
}

@Component({
  selector: 'app-admin',
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"]
})

export class AdminComponent implements OnInit {

  selectedFile: File;
  // MongoClient = require('mongodb').MongoClient;

  constructor(public dialog: MatDialog) {
  }

  openDialog(): void {
    this.dialog.open(AdminDialog, {
      height: '431px',
      width: '600px'
    });
  }

  onFileSelected(event) {
    this.selectedFile = this.selectedFile = event.target.files[0] as File;
  }

  public ngOnInit() {
  }

}

@Component({
  selector: 'app-admin',
  templateUrl: 'admin-dialog.component.html',
  styleUrls: ["./admin.component.css"]
})
export class AdminDialog {

  constructor(
    public dialogRef: MatDialogRef<AdminDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
