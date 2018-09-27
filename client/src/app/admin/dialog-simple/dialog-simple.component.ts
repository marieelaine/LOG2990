import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { PartieSimpleInterface } from '../../liste-parties/partie-simple/partie-simple.component';
import { ListePartiesComponent } from '../../liste-parties/liste-parties.component';
import { DialogData } from '../admin.component';
import { HttpClient } from '@angular/common/http';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-dialog-simple',
  templateUrl: './dialog-simple.component.html',
  styleUrls: ['./dialog-simple.component.css']
})
export class DialogSimpleComponent {

  outOfBoundNameLengthMessage: String = "";
  wrongNumberOfImagesMessage: String = "";
  wrongImageSizeOrTypeMessage: String = "";
  partieSimple: PartieSimpleInterface;
  listeParties: ListePartiesComponent = new ListePartiesComponent();
  selectedFile: File;
  selectedFiles: File[] = [];
  correctImageExtension: String = "image/bmp";
  titrePartie = new FormControl('', [Validators.required]);

  constructor(
    public dialogRef: MatDialogRef<DialogSimpleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private http: HttpClient) {
    }

  public onFileSelectedImage(event, i) {
    this.selectedFiles[i] = this.getSelectedFileFromEvent(event);
    this.convertImageToArrayToCheckSize(this.selectedFiles[i]);

    // TODO : envoyer l'image upload vers le serveur
    // const fd = new FormData();
    // fd.append("image", this.selectedFile, this.selectedFile.name);
  }

  private convertImageToArrayToCheckSize(file): void {
    const self: DialogSimpleComponent = this;
    const reader: FileReader = new FileReader();
    reader.readAsArrayBuffer(file);
    // tslint:disable-next-line:only-arrow-functions
    reader.onload = function() {
      const dv: DataView = new DataView(reader.result as ArrayBuffer);
      const imageInfo = {"size": dv.getUint16(28, true), "width": dv.getUint32(18, true), "height": dv.getUint32(22, true)};
      self.setWrongImageSizeOrTypeMessage(imageInfo);
    };
  }

  private setWrongImageSizeOrTypeMessage(imageInfo): void {
    this.checkIfWrongImageSize(imageInfo) || this.checkIfWrongImageType() ?
      this.wrongImageSizeOrTypeMessage = "*L'image doit être de format BMP 24 bits et de taille 640 x 480 pixels" :
      this.wrongImageSizeOrTypeMessage = "";
  }

  private checkIfWrongImageSize(imageInfo): Boolean {
    if (imageInfo["size"] !== 24 || imageInfo["width"] !== 640 || imageInfo["height"] !== 480) {
      return true;
    }

    return false;
  }

  private getSelectedFileFromEvent(event): File {
    return this.selectedFile = event.target.files[0] as File;
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public onAddSimpleGameClick(): void {
    this.setWrongNumberOfImagesMessage();
    this.setOutOfBoundNameLengthMessage();
    this.closeDialogIfRequirements();
  }

  private checkIfWrongNumberOfImages(): Boolean {
    if (this.selectedFiles[0] === undefined || this.selectedFiles[0] === null
      || this.selectedFiles[1] === undefined || this.selectedFiles[1] === null) {
        return true;
      }

    return false;
  }

  private checkIfWrongImageType(): Boolean {
    if (this.selectedFiles[0] !== undefined && this.selectedFiles[0].type !== this.correctImageExtension
      || this.selectedFiles[1] !== undefined && this.selectedFiles[1].type !== this.correctImageExtension) {
        return true;
      }

    return false;
  }

  // Testé
  public setWrongNumberOfImagesMessage(): void {
    this.checkIfWrongNumberOfImages() ?
    this.wrongNumberOfImagesMessage = '*Vous devez entrer deux images.' :
    this.wrongNumberOfImagesMessage = "";
  }

  private checkIfOutOfBoundNameLength(): Boolean {
    if (this.data.simpleGameName === "" || this.data.simpleGameName === undefined
    || this.data.simpleGameName.length < 3 || this.data.simpleGameName.length > 20) {
      return true;
    }

    return false;
  }

  // TODO : implementer le mat-error dans le html
  // public checkIfOutOfBoundName(bla: String): boolean {
  //   if (bla === "" || bla === undefined
  //   || bla.length < 3 || bla.length > 20) {
  //     this.outOfBoundNameLengthMessage = "*Le nom du jeu doit être entre 3 et 20 charactères.";

  //     return true;
  //   }
  //   this.outOfBoundNameLengthMessage = "" ;

  //   return false;
  // }

  // Testé
  public setOutOfBoundNameLengthMessage(): void {
    this.checkIfOutOfBoundNameLength() ?
      this.outOfBoundNameLengthMessage = "*Le nom du jeu doit être entre 3 et 20 charactères." :
      this.outOfBoundNameLengthMessage = "" ;
  }

  // Testé
  public checkIfNoErrorMessage(): Boolean {
    if (this.outOfBoundNameLengthMessage === ""
    && this.wrongNumberOfImagesMessage === ""
    && this.wrongImageSizeOrTypeMessage === "") {
      return true;
    }

    return false;
  }

  private closeDialogIfRequirements(): void {
   if (this.checkIfNoErrorMessage()) {
      this.dialogRef.close();
      this.createNewSimpleGameCard();
    }
  }

  private createNewSimpleGameCard(): void {
    const partieSimple: PartieSimpleInterface = {
        title: this.data.simpleGameName, imagePath: 'assets/NissanPatrol.jpg', isElevatedActive: false,
        timesSolo: [], timesOneVsOne: [],
      };
    this.addNewSimpleGameCardToList(partieSimple);
  }

  private addNewSimpleGameCardToList(partieSimple: PartieSimpleInterface): void {
    this.listeParties.listePartiesSimples.push(partieSimple);
  }
}
