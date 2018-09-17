import { Component, OnInit, Inject } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface DialogData {
  simpleGameName: string;
  multipleGameName: string;
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

  openDialogSimple(): void {
    this.gameName = "";
    this.dialog.open(DialogSimple, {
      height: '433px',
      width: '600px',
      data: {name: this.gameName}
    });
  }

  openDialogMultiple(): void {
    this.gameName = "";
    this.dialog.open(DialogMultiple, {
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
  templateUrl: 'dialog-simple.component.html',
  styleUrls: ["./admin.component.css"]
})
export class DialogSimple {

  errorMessage: string;

  constructor(
    public dialogRef: MatDialogRef<DialogSimple>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      this.errorMessage = "";
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onAddSimpleGameClick(): void {
    if (this.data.simpleGameName === "" || this.data.simpleGameName === undefined) {
      // Regarder s'il y a bien deux images
      this.errorMessage = "*Le jeu doit avoir un nom et deux images";
    } else {
      this.dialogRef.close();
    }
  }
}

@Component({
  selector: 'app-admin',
  templateUrl: 'dialog-multiple.component.html',
  styleUrls: ["./admin.component.css"]
})
export class DialogMultiple {

  errorMessage: string;

  constructor(
    public dialogRef: MatDialogRef<DialogMultiple>,
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
