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

  gameName: string;
  selectedFile: File;
  // MongoClient = require('mongodb').MongoClient;

  constructor(public dialog: MatDialog) {
  }

  openDialog(): void {
    this.gameName = "";
    this.dialog.open(AdminDialog, {
      height: '433px',
      width: '600px',
      data: {name: this.gameName}
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

  errorMessage: string;

  constructor(
    public dialogRef: MatDialogRef<AdminDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      this.errorMessage = "";
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onAddClick(): void {
    if (this.data.gameName === "" || this.data.gameName === undefined) {
      // Regarder s'il y a bien deux images
      this.errorMessage = "*Le jeu doit avoir un nom et deux images";
    } else {
      this.dialogRef.close();
    }
  }
}
