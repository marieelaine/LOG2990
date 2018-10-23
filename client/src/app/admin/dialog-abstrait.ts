import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Inject } from "@angular/core";
import { DialogData } from "./admin.component";
import { HttpClient } from "@angular/common/http";

export default class T {}

export abstract class DialogAbstrait {

    protected outOfBoundNameLengthMessage: String = "";
    protected wrongNumberOfImagesMessage: String = "";
    protected wrongImageSizeOrTypeMessage: String = "";

    public constructor (private dialogRef: MatDialogRef<T>,
                        @Inject(MAT_DIALOG_DATA) protected data: DialogData,
                        protected http: HttpClient) {
    }

    protected abstract onFileSelectedImage(event, i): void;
    protected abstract onSubmit(): void;

    protected closeDialogIfRequirements(): void {
      if (this.checkIfNoErrorMessage()) {
         this.onSubmit();
         this.dialogRef.close();
       }
     }

    protected checkIfNoErrorMessage(): Boolean {
      if (this.outOfBoundNameLengthMessage === ""
      && this.wrongNumberOfImagesMessage === ""
      && this.wrongImageSizeOrTypeMessage === "") {
        return true;
      }

      return false;
    }

    protected onNoClick(): void {
      this.dialogRef.close();
  }

    protected genererTableauTempsAleatoires(): Array<number> {
        const arr: Array<number> = new Array<number>();
        for (let i: number = 0; i < 6; i++) {
          arr[i] = this.genererTempsAleatoire();
        }

        return arr;
      }

    private genererTempsAleatoire(): number {
        return Math.floor(Math.random() * 400) + 100;
      }

}
