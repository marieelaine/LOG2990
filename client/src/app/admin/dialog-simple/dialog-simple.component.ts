import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { DialogData } from "../admin.component";
import { HttpClient } from "@angular/common/http";
import {FormControl, Validators, FormGroup} from "@angular/forms";
import { PartieSimple } from "./partie-simple";
import { PartieSimpleService } from "../partie-simple.service";
import { Observable } from "rxjs";

export const IMAGE_URL: string = "http://localhost:3000/images/";
const URL_AJOUTER: string = IMAGE_URL + "ajouter/";

@Component({
  selector: "app-dialog-simple",
  templateUrl: "./dialog-simple.component.html",
  styleUrls: ["./dialog-simple.component.css"],
  providers: [PartieSimpleService]})

export class DialogSimpleComponent {

  protected outOfBoundNameLengthMessage: String = "";
  protected wrongNumberOfImagesMessage: String = "";
  protected wrongImageSizeOrTypeMessage: String = "";
  protected premiereImage: string;
  protected deuxiemeImage: string;
  private currentImageNumber: number;
  private selectedFiles: File[] = [];
  private selectedFilesAsArrayBuffers: Buffer[] = [];
  private correctImageExtension: String = "image/bmp";
  private titrePartie = new FormControl("", [Validators.required]);
  private gameNameTaken: Boolean;

  public constructor(
    public dialogRef: MatDialogRef<DialogSimpleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private http: HttpClient,
    private partieSimpleService: PartieSimpleService) {
    }

  protected onFileSelectedImage(event, i): void {
    this.currentImageNumber = i;
    const file = event.target.files[0] as File;
    this.selectedFiles[this.currentImageNumber] = file;
    this.convertImageToArrayToCheckSize(this.selectedFiles[this.currentImageNumber]);

    const reader: FileReader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        if (this.currentImageNumber) {
          this.deuxiemeImage = reader.result as string;
        } else {
          this.premiereImage = reader.result as string;
        }

    };

  }

  protected onSubmit(): void {
    const self = this;
    var i = 0;
    this.selectedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = function() {
        self.addToSelectedFilesAsArrayBuffer(reader.result as ArrayBuffer, i);
        i++;
      };
    });
  }

  private addToSelectedFilesAsArrayBuffer(file: ArrayBuffer, i: number) {
    const Buffer = require("buffer/").Buffer;
    this.selectedFilesAsArrayBuffers[i] = Buffer.from(file);
    if (i === 1) {
      const result: PartieSimple = new PartieSimple(this.data.simpleGameName, this.genererTableauTempsAleatoires(),
                                                    this.genererTableauTempsAleatoires(), this.selectedFilesAsArrayBuffers[0],
                                                    this.selectedFilesAsArrayBuffers[1],
                                                    Buffer.from(new Array()));
      this.partieSimpleService.register(result)
        .subscribe(
          (data) => {
            this.gameNameTaken = false;
          },
          (error) => {
            console.error(error);
            this.gameNameTaken = true;
          });
    }
  }

  private genererTableauTempsAleatoires(): Array<number> {
    const arr: Array<number> = new Array<number>();
    for (let i: number = 0; i < 6; i++) {
      arr[i] = this.genererTempsAleatoire();
    }

    return arr;
  }

  private genererTempsAleatoire(): number {
    return 312;
  }

  protected obtenirImageId(identifiant: string): Observable<PartieSimple> {
      return this.http.get<PartieSimple>(IMAGE_URL + identifiant);
  }

  protected obtenirImageName(imageName: string): Observable<PartieSimple> {
      return this.http.get<PartieSimple>(IMAGE_URL + imageName);
  }

  protected async creerNouvelleImage(image: PartieSimple): Promise<Object> {
      return this.http.post(URL_AJOUTER, image).toPromise();
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

  protected setWrongImageSizeOrTypeMessage(imageInfo): void {
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

  private checkIfWrongImageType(): Boolean {
    var isWrongType: Boolean = false;
    this.selectedFiles.forEach((file) => {
    if (file !== undefined && file.type !== this.correctImageExtension) {
      isWrongType = true;
    }
  });

    return isWrongType;
  }

  protected onNoClick(): void {
    this.dialogRef.close();
  }

  protected onAddSimpleGameClick(): void {
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

  protected setWrongNumberOfImagesMessage(): void {
    this.checkIfWrongNumberOfImages() ?
    this.wrongNumberOfImagesMessage = "*Vous devez entrer deux images." :
    this.wrongNumberOfImagesMessage = "";
  }

  private checkIfOutOfBoundNameLength(): Boolean {
    if (this.data.simpleGameName === "" || this.data.simpleGameName === undefined
    || this.data.simpleGameName.length < 3 || this.data.simpleGameName.length > 20) {
      return true;
    }

    return false;
  }

  protected setOutOfBoundNameLengthMessage(): void {
    this.checkIfOutOfBoundNameLength() ?
      this.outOfBoundNameLengthMessage = "*Le nom du jeu doit être entre 3 et 20 charactères." :
      this.outOfBoundNameLengthMessage = "" ;
  }

  protected checkIfNoErrorMessage(): Boolean {
    if (this.outOfBoundNameLengthMessage === ""
    && this.wrongNumberOfImagesMessage === ""
    && this.wrongImageSizeOrTypeMessage === "") {
      return true;
    }

    return false;
  }

  protected closeDialogIfRequirements(): void {
   if (this.checkIfNoErrorMessage()) {
      this.onSubmit();
      this.dialogRef.close();
    }
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
