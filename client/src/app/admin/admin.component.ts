import { Component, OnInit, Inject } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PartieSimpleComponent } from "../liste-parties/partie-simple/partie-simple.component";
import { PartieMultipleComponent } from "../liste-parties/partie-multiple/partie-multiple.component";
import { ListePartiesComponent } from "../liste-parties/liste-parties.component";

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

  outOfBoundNameLengthMessage: String;
  partieSimple: PartieSimpleComponent;
  listeParties: ListePartiesComponent;

  constructor(
    public dialogRef: MatDialogRef<DialogSimple>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      this.outOfBoundNameLengthMessage = "";
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onAddSimpleGameClick(): void {
    this.outOfBoundNameLengthMessage = this.getOutOfBoundNameLengthMessage();
    this.closeDialogIfRequirements(this.outOfBoundNameLengthMessage);

  }

  getOutOfBoundNameLengthMessage(): String {
    if (this.data.simpleGameName === "" || this.data.simpleGameName === undefined
    || this.data.simpleGameName.length < 3 || this.data.simpleGameName.length > 20) {
      return "*Le nom du jeu doit être entre 3 et 20 charactères";
    } else {
      return "";
    }
  }

  closeDialogIfRequirements(outOfBoundNameLengthMessage: String) {
    if (outOfBoundNameLengthMessage === "") {
      this.dialogRef.close();
      this.createNewSimpleGameCard(this.data.simpleGameName);
    }
  }

  createNewSimpleGameCard(simpleGameName: String) {
    const partieSimple: PartieSimpleComponent = {
        title: simpleGameName, imagePath: 'assets/NissanPatrol.jpg', isElevatedActive: false,
        timesSolo: [], timesOneVsOne: [],
        titleWithoutFirstLetter: this.listeParties.getTitleWithoutFirstLetter(simpleGameName)
      };
    this.addNewSimpleGameCardToList(partieSimple);
  }

  addNewSimpleGameCardToList(partieSimple: PartieMultipleComponent) {
    this.listeParties.listePartiesSimples.push(partieSimple);
  }
}

@Component({
  selector: 'app-admin',
  templateUrl: 'dialog-multiple.component.html',
  styleUrls: ["./admin.component.css"]
})
export class DialogMultiple {

  errorMessage: string;
  partieMultiple: PartieMultipleComponent;
  listeParties: ListePartiesComponent;

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
