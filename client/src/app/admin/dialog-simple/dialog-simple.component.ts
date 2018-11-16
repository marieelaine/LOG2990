import { Component, Inject, ErrorHandler } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { DialogData } from "../admin.component";
import { HttpClient } from "@angular/common/http";
import { PartieSimple } from "./partie-simple";
import { PartieSimpleService } from "../partie-simple.service";
import { DialogAbstrait } from "../dialog-abstrait";
import * as Buffer from "buffer";
import { FormControl, Validators } from "@angular/forms";
import * as constante from "src/app/constantes";

export const IMAGE_URL: string = "http://localhost:3000/images/";

export interface ImageInfo {
  size: number;
  width: number;
  height: number;
}

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
  protected nameControl: FormControl;

  private currentImageNumber: number;
  private selectedFiles: File[];
  private selectedFilesAsBuffers: Buffer[];
  private correctImageExtension: String;
  private readonly maxNbImage: number = 2;

  public constructor(
    dialogRef: MatDialogRef<DialogSimpleComponent>,
    @Inject(MAT_DIALOG_DATA) data: DialogData,
    http: HttpClient,

    private partieSimpleService: PartieSimpleService) {
      super(dialogRef, data, http);
      this.selectedFiles = [];
      this.selectedFilesAsBuffers = [];
      this.correctImageExtension = "image/bmp";
      this.wrongImageSizeOrTypeMessage = "";
      this.wrongNumberOfImagesMessage = "";
      this.nameControl = new FormControl("", [
        Validators.minLength(constante.LONGUEUR_NOM_MIN), Validators.maxLength(constante.LONGUEUR_NOM_MAX), Validators.required]);
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
        if (this.selectedFilesAsBuffers.length === this.maxNbImage) {
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

  protected onUploadImage(file: File, i: number): void {
    this.selectedFiles[this.currentImageNumber] = file;
    // console.log(event);
    this.currentImageNumber = i;
    // const target: EventTarget = event.target as EventTarget;
    // this.selectedFiles[this.currentImageNumber] = event.target.files[0] as File;
    this.convertImageToArrayToCheckSize(this.selectedFiles[this.currentImageNumber]);
    this.afficherImageSurUploadClient();
  }

  protected async ajouterPartie(): Promise<void> {
      const result: PartieSimple = new PartieSimple(this["data"].simpleGameName, this.genererTableauTempsAleatoires(),
                                                    this.genererTableauTempsAleatoires(), this.selectedFilesAsBuffers[0],
                                                    this.selectedFilesAsBuffers[1], new Array<Array<string>>());
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
    || this["data"].simpleGameName.length < constante.LONGUEUR_NOM_MIN || this["data"].simpleGameName.length > constante.LONGUEUR_NOM_MAX);
  }

  private afficherImageSurUploadClient(): void {
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(this.selectedFiles[this.currentImageNumber]);
    reader.onload = () => {
      (this.currentImageNumber) ? this.deuxiemeImage = reader.result as string : this.premiereImage = reader.result as string;
    };
  }

  private arraybufferToBuffer(file: ArrayBuffer, i: number): void {
    this.selectedFilesAsBuffers[i] = Buffer.Buffer.from(file);
  }

  private setWrongImageSizeOrTypeMessage(imageInfo: ImageInfo): void {
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
    reader.onload = () => {
      const dv: DataView = new DataView(reader.result as ArrayBuffer);
      const imageInfo: ImageInfo = {
        size: dv.getUint16(constante.HEADER_BMP_P1, true),
        width: dv.getUint32(constante.HEADER_BMP_P2, true),
        height: dv.getUint32(constante.HEADER_BMP_P3, true)
      };
      self.setWrongImageSizeOrTypeMessage(imageInfo);
    };
  }

  private checkIfWrongImageSize(imageInfo: ImageInfo): Boolean {
    return (imageInfo["size"] !== constante.BIT_FORMAT
            || imageInfo["width"] !== constante.WINDOW_WIDTH
            || imageInfo["height"] !== constante.WINDOW_HEIGHT);
  }

  private checkIfWrongImageType(): Boolean {
    let isWrongType: Boolean = false;
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
}
