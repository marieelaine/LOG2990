import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Inject } from "@angular/core";
import { DialogData } from "./admin.component";
import { HttpClient } from "@angular/common/http";
import { DialogSimpleComponent } from "./dialog-simple/dialog-simple.component";
import { DialogMultipleComponent } from "./dialog-multiple/dialog-multiple.component";
import { TempsUser } from "./temps-user";

const BORNE_INF: number = 100;
const BORNE_SUP: number = 400;
const NB_ELEMENT: number = 4;
const PAS_ERR: string = "";

export abstract class DialogAbstrait {

    public constructor (private dialogRef: MatDialogRef<DialogSimpleComponent | DialogMultipleComponent>,
                        @Inject(MAT_DIALOG_DATA) protected data: DialogData,
                        protected http: HttpClient) { }

    protected abstract onClickAjouterPartie(): void;
    protected abstract onSubmit(): void;
    protected abstract ajouterPartie(): void;
    protected abstract contientErreur(): boolean;

    protected fermerDialog(): void {
      if (!this.contientErreur()) {
         this.onSubmit();
         this.dialogRef.close();
       }
    }

    protected surClickExterieurDialog(): void {
      this.dialogRef.close();
    }

    protected genererTableauTempsAleatoires(): Array<TempsUser> {
        const arr: Array<TempsUser> = [];
        for (let i: number = 1; i < NB_ELEMENT; i++) {
          arr.push(new TempsUser("Joueur" + i, this.genererTempsAleatoire()));
        }

        return arr;
    }

    private genererTempsAleatoire(): number {
        return Math.floor(Math.random() * BORNE_SUP) + BORNE_INF;
    }

    protected estVide(message: string): boolean {
      return message === PAS_ERR;
    }

}
