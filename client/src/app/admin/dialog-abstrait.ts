import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Inject } from "@angular/core";
import { DialogData } from "./admin.component";
import { HttpClient } from "@angular/common/http";

export default class T {}

export class TempsUser {
  private _user: string;
  private _temps: number;

  constructor(user: string, temps: number) {
    this._user = user;
    this._temps = temps;
  }
}

export abstract class DialogAbstrait {

    protected outOfBoundNameLengthMessage: string;

    public constructor (private dialogRef: MatDialogRef<T>,
                        @Inject(MAT_DIALOG_DATA) protected data: DialogData,
                        protected http: HttpClient) {
      this.outOfBoundNameLengthMessage = "";
    }

    protected abstract onClickAjouterPartie(): void;
    protected abstract onSubmit(): void;
    protected abstract ajouterPartie(): void;
    protected abstract verifierSiMessageErreur(): Boolean;
    protected abstract checkIfOutOfBoundNameLength(): Boolean;

    protected setOutOfBoundNameLengthMessage(): void {
      this.checkIfOutOfBoundNameLength() ?
        this.outOfBoundNameLengthMessage = "*Le nom du jeu doit être entre 3 et 20 charactères." :
        this.outOfBoundNameLengthMessage = "" ;
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

    protected genererTableauTempsAleatoires(): Array<TempsUser> {
        const arr: Array<TempsUser> = [];
        for (let i: number = 1; i < 4; i++) {
          arr.push(new TempsUser("Joueur" + i, this.genererTempsAleatoire()));
        }

        return arr;
    }

    private genererTempsAleatoire(): number {
        return Math.floor(Math.random() * 400) + 100;
    }

}
