import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { PartieSimpleComponent } from '../../liste-parties/partie-simple/partie-simple.component';
import { ListePartiesComponent } from '../../liste-parties/liste-parties.component';
import { DialogData } from '../admin.component';
import { PartieMultipleComponent } from '../../liste-parties/partie-multiple/partie-multiple.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dialog-simple',
  templateUrl: './dialog-simple.component.html',
  styleUrls: ['./dialog-simple.component.css']
})
export class DialogSimpleComponent {

  outOfBoundNameLengthMessage: String = "";
  wrongImageTypeMessage: String = "";
  wrongNumberOfImagesMessage: String = "";
  partieSimple: PartieSimpleComponent;
  listeParties: ListePartiesComponent;
  selectedFile: File;
  selectedFiles: File[] = [];
  correctImageExtensions: String[] = ["image/png", "image/jpeg", "image/gif"];

  constructor(
    public dialogRef: MatDialogRef<DialogSimpleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private http: HttpClient) {
    }

  onFileSelectedImage1(event) {
    this.selectedFiles[0] = this.getSelectedFileFromEvent(event);
    this.wrongImageTypeMessage = this.getWrongImageTypeMessage();
    // TODO :
    // const fd = new FormData();
    // fd.append("image", this.selectedFile, this.selectedFile.name);
  }

  onFileSelectedImage2(event) {
    this.selectedFiles[1] = this.getSelectedFileFromEvent(event);
    this.wrongImageTypeMessage = this.getWrongImageTypeMessage();
  }

  getSelectedFileFromEvent(event) {
    return this.selectedFile = event.target.files[0] as File;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onAddSimpleGameClick(): void {
    this.wrongNumberOfImagesMessage = this.getWrongNumberOfImagesMessage();
    this.outOfBoundNameLengthMessage = this.getOutOfBoundNameLengthMessage();
    this.closeDialogIfRequirements(this.outOfBoundNameLengthMessage, this.wrongImageTypeMessage, this.wrongNumberOfImagesMessage);
  }

  getWrongNumberOfImagesMessage(): String {
    if (this.selectedFiles[0] === undefined || this.selectedFiles[0] === null
      || this.selectedFiles[1] === undefined || this.selectedFiles[1] === null) {
        return "*Vous devez entrer 2 images";
      } else {
        return "";
      }
  }

  getWrongImageTypeMessage(): String {
    if (this.selectedFiles[0] !== undefined && !this.correctImageExtensions.includes(this.selectedFiles[0].type)
    || this.selectedFiles[1] !== undefined && !this.correctImageExtensions.includes(this.selectedFiles[1].type)) {
      return '*Les images doivent être de type "png", "jpg" ou "gif".';
    } else {
      return "";
    }
  }

  getOutOfBoundNameLengthMessage(): String {
    if (this.data.simpleGameName === "" || this.data.simpleGameName === undefined
    || this.data.simpleGameName.length < 3 || this.data.simpleGameName.length > 20) {
      return "*Le nom du jeu doit être entre 3 et 20 charactères.";
    } else {
      return "";
    }
  }

  closeDialogIfRequirements(outOfBoundNameLengthMessage: String, wrongImageTypeMessage: String, wrongNumberOfImagesMessage: String) {
    if (outOfBoundNameLengthMessage === "" && wrongImageTypeMessage === "" && wrongNumberOfImagesMessage === "") {
      this.dialogRef.close();
      this.createNewSimpleGameCard(this.data.simpleGameName);
    }
  }

  createNewSimpleGameCard(simpleGameName: String) {
    // TODO :
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
