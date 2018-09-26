import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { PartieSimpleInterface } from '../../liste-parties/partie-simple/partie-simple.component';
import { ListePartiesComponent } from '../../liste-parties/liste-parties.component';
import { DialogData } from '../admin.component';
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
  wrongImageSizeMessage: String = "";
  partieSimple: PartieSimpleInterface;
  listeParties: ListePartiesComponent = new ListePartiesComponent();
  selectedFile: File;
  selectedFiles: File[] = [];
  correctImageExtension: String = "image/bmp";

  constructor(
    public dialogRef: MatDialogRef<DialogSimpleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private http: HttpClient) {
    }

  onFileSelectedImage(event, i) {
    this.selectedFiles[i] = this.getSelectedFileFromEvent(event);
    this.wrongImageTypeMessage = this.getWrongImageTypeMessage();
    this.setWrongImageSizeMessage(this.selectedFiles[i]);

    // TODO : envoyer l'image upload vers le serveur
    // const fd = new FormData();
    // fd.append("image", this.selectedFile, this.selectedFile.name);
  }

  public setWrongImageSizeMessage(file): void {
    const self = this;
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    // tslint:disable-next-line:only-arrow-functions
    reader.onload = function() {
      const dv = new DataView(reader.result as ArrayBuffer);
      const imageInfo = {"size": dv.getUint16(28, true), "width": dv.getUint32(18, true), "height": dv.getUint32(22, true)};
      self.wrongImageSizeMessage = self.getWrongImageSizeMessage(imageInfo);
    };
  }

  public getWrongImageSizeMessage(imageInfo): String {
    if (imageInfo["size"] !== 24 && imageInfo["width"] !== 640 && imageInfo["height"] !== 480) {
      return "L'image doit etr...";
    } else {
      return "";
    }
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
    this.closeDialogIfRequirements();
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
    if (this.selectedFiles[0] !== undefined && this.selectedFiles[0].type !== this.correctImageExtension
    || this.selectedFiles[1] !== undefined && this.correctImageExtension !== this.selectedFiles[1].type) {
      return '*Les images doivent être de type "bmp".';
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

  closeDialogIfRequirements() {
    if (this.outOfBoundNameLengthMessage === ""
    && this.wrongImageTypeMessage === ""
    && this.wrongNumberOfImagesMessage === ""
    && this.wrongImageSizeMessage === "") {
      this.dialogRef.close();
      this.createNewSimpleGameCard();
    }
  }

  createNewSimpleGameCard() {
    const partieSimple: PartieSimpleInterface = {
        title: this.data.simpleGameName, imagePath: 'assets/NissanPatrol.jpg', isElevatedActive: false,
        timesSolo: [], timesOneVsOne: [],
      };
    this.addNewSimpleGameCardToList(partieSimple);
  }

  addNewSimpleGameCardToList(partieSimple: PartieSimpleInterface) {
    this.listeParties.listePartiesSimples.push(partieSimple);
  }
}
