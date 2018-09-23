import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { PartieSimpleComponent } from '../../liste-parties/partie-simple/partie-simple.component';
import { ListePartiesComponent } from '../../liste-parties/liste-parties.component';
import { DialogData } from '../admin.component';
import { PartieMultipleComponent } from '../../liste-parties/partie-multiple/partie-multiple.component';

@Component({
  selector: 'app-dialog-simple',
  templateUrl: './dialog-simple.component.html',
  styleUrls: ['./dialog-simple.component.css']
})
export class DialogSimpleComponent {

  outOfBoundNameLengthMessage: String;
  partieSimple: PartieSimpleComponent;
  listeParties: ListePartiesComponent;
  show: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<DialogSimpleComponent>,
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
    // const partieSimple: PartieSimpleComponent = {
    //     title: simpleGameName, imagePath: 'assets/NissanPatrol.jpg', isElevatedActive: false,
    //     timesSolo: [], timesOneVsOne: [],
    //     titleWithoutFirstLetter: this.listeParties.getTitleWithoutFirstLetter(simpleGameName)
    //   };
    // this.addNewSimpleGameCardToList(partieSimple);
  }

  addNewSimpleGameCardToList(partieSimple: PartieMultipleComponent) {
    this.listeParties.listePartiesSimples.push(partieSimple);
  }
}
