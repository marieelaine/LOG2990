import { Component, Inject, ErrorHandler } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { DialogData } from "../admin.component";
import { HttpClient } from "@angular/common/http";
import { PartieSimple } from "./partie-simple";
import { PartieSimpleService } from "../partie-simple.service";
import { DialogAbstrait } from "../dialog-abstrait";
import * as Buffer from "buffer";
import { FormControl, Validators } from "@angular/forms";

export const IMAGE_URL: string = "http://localhost:3000/images/";

@Component({
  selector: "app-dialog-simple",
  templateUrl: "./dialog-simple.component.html",
  styleUrls: ["./dialog-simple.component.css"],
  providers: [PartieSimpleService]})

export class DialogSimpleComponent extends DialogAbstrait {

  protected premiereImage: string;
  protected deuxiemeImage: string;
  protected wrongNumberOfImagesMessage: string;
  protected wrongImageSizeOrTypeMessage: string;
  private currentImageNumber: number;
  private selectedFiles: File[] = [];
  private selectedFilesAsBuffers: Buffer[] = [];
  private correctImageExtension: String = "image/bmp";
  protected nameControl: FormControl;

  public constructor(
    dialogRef: MatDialogRef<DialogSimpleComponent>,
    @Inject(MAT_DIALOG_DATA) data: DialogData,
    http: HttpClient,

    private partieSimpleService: PartieSimpleService) {
      super(dialogRef, data, http);
      this.wrongImageSizeOrTypeMessage = "";
      this.wrongNumberOfImagesMessage = "";
      this.nameControl = new FormControl('', [
        Validators.minLength(3), Validators.maxLength(20), Validators.required]);
    }

  protected onClickAjouterPartie(): void {
      this.setWrongNumberOfImagesMessage();
      this.setOutOfBoundNameLengthMessage();
      this.closeDialogIfRequirements();
    }

  protected onSubmit(): void {
    let imageQty: number = 0;

    this.selectedFiles.forEach((file) => {
      const reader: FileReader = new FileReader();
      reader.readAsArrayBuffer(file);

      reader.onload = () => {
        this.arraybufferToBuffer(reader.result as ArrayBuffer, imageQty);
        if (this.selectedFilesAsBuffers.length === 2) {
          this.ajouterPartie()
          .catch(() => ErrorHandler);
        }
        imageQty++;
      };
    });
  }

  protected verifierSiMessageErreur(): Boolean {
    return (this.outOfBoundNameLengthMessage !== ""
            || this.wrongNumberOfImagesMessage !== ""
            || this.wrongImageSizeOrTypeMessage !== "");
  }

  protected onUploadImage(event, i): void {
    this.currentImageNumber = i;
    this.selectedFiles[this.currentImageNumber] = event.target.files[0] as File;
    this.convertImageToArrayToCheckSize(this.selectedFiles[this.currentImageNumber]);
    this.afficherImageSurUploadClient();
  }

  protected async ajouterPartie(): Promise<void> {
      const result: PartieSimple = new PartieSimple(this["data"].simpleGameName, this.genererTableauTempsAleatoires(),
                                                    this.genererTableauTempsAleatoires(), this.selectedFilesAsBuffers[0],
                                                    this.selectedFilesAsBuffers[1], new Array<Array<string>>());
      console.log("ajouter partie de dialog simple");
      console.log(result);
      this.partieSimpleService.register(result)
        .subscribe(
          (data) => {
          },
          (error) => {
            console.error(error);
          });
  }

  protected checkIfOutOfBoundNameLength(): Boolean {

    return (this["data"].simpleGameName === "" || this["data"].simpleGameName === undefined
    || this["data"].simpleGameName.length < 3 || this["data"].simpleGameName.length > 20);
  }

  private afficherImageSurUploadClient() {
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(this.selectedFiles[this.currentImageNumber]);
    reader.onload = () => {
      (this.currentImageNumber) ? this.deuxiemeImage = reader.result as string : this.premiereImage = reader.result as string;
    };
  }

  private arraybufferToBuffer(file: ArrayBuffer, i: number) {
    this.selectedFilesAsBuffers[i] = Buffer.Buffer.from(file);
  }

  private setWrongImageSizeOrTypeMessage(imageInfo): void {
    this.checkIfWrongImageSize(imageInfo) || this.checkIfWrongImageType() ?
    this.wrongImageSizeOrTypeMessage = "*L'image doit être de format BMP 24 bits et de taille 640 x 480 pixels" :
    this.wrongImageSizeOrTypeMessage = "";
  }

  private setWrongNumberOfImagesMessage(): void {
    this.checkIfWrongNumberOfImages() ?
    this.wrongNumberOfImagesMessage = "*Vous devez entrer deux images." :
    this.wrongNumberOfImagesMessage = "";
  }

  private convertImageToArrayToCheckSize(file: File): void {
    const self: DialogSimpleComponent = this;
    const reader: FileReader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = function() {
      const dv: DataView = new DataView(reader.result as ArrayBuffer);
      const imageInfo = {"size": dv.getUint16(28, true), "width": dv.getUint32(18, true), "height": dv.getUint32(22, true)};
      self.setWrongImageSizeOrTypeMessage(imageInfo);
    };
  }

  private checkIfWrongImageSize(imageInfo): Boolean {
    return (imageInfo["size"] !== 24 || imageInfo["width"] !== 640 || imageInfo["height"] !== 480);
  }

  private checkIfWrongImageType(): Boolean {
    var isWrongType: Boolean = false;
    this.selectedFiles.forEach((file) => {
    if (file !== undefined && file.type !== this.correctImageExtension) {
      isWrongType = true;
    }
  });

    return isWrongType;
  }

  private checkIfWrongNumberOfImages(): Boolean {
    return (this.selectedFiles[0] === undefined || this.selectedFiles[0] === null
      || this.selectedFiles[1] === undefined || this.selectedFiles[1] === null);
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
}
