import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Inject } from "@angular/core";
import { DialogData } from "./admin.component";
import { HttpClient } from "@angular/common/http";

export default class T {}

export abstract class DialogAbstrait {

    protected outOfBoundNameLengthMessage: string;

    public constructor (private dialogRef: MatDialogRef<T>,
                        @Inject(MAT_DIALOG_DATA) protected data: DialogData,
                        protected http: HttpClient) {
      this.outOfBoundNameLengthMessage = "";
    }

    protected abstract onSubmit(): void;
    protected abstract onClickAjouterPartie(): void;
    protected abstract verifierSiMessageErreur(): Boolean;

    protected setOutOfBoundNameLengthMessage(): void {
      this.checkIfOutOfBoundNameLength() ?
        this.outOfBoundNameLengthMessage = "*Le nom du jeu doit être entre 3 et 20 charactères." :
        this.outOfBoundNameLengthMessage = "" ;
    }

    private checkIfOutOfBoundNameLength(): Boolean {

      return (this["data"].simpleGameName === "" || this["data"].simpleGameName === undefined
      || this["data"].simpleGameName.length < 3 || this["data"].simpleGameName.length > 20);
    }

    protected closeDialogIfRequirements(): void {
      if (!this.verifierSiMessageErreur()) {
         this.onSubmit();
         this.dialogRef.close();
       }
     }

    protected surClickExterieurDialog(): void {
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
