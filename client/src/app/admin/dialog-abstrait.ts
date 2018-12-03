import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Inject } from "@angular/core";
import { DialogData } from "./admin.component";
import { HttpClient } from "@angular/common/http";
import { DialogSimpleComponent } from "./dialog-simple/dialog-simple.component";
import { DialogMultipleComponent } from "./dialog-multiple/dialog-multiple.component";
import { Joueur } from "./joueur";

const BORNE_INF: number = 100;
const BORNE_SUP: number = 400;
const NB_ELEMENT: number = 4;
export const STRING_VIDE: string = "";
const JOUEUR: string = "Joueur";

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

    protected genererTableauTempsAleatoires(): Array<Joueur> {
        const arr: Array<Joueur> = [];
        for (let i: number = 1; i < NB_ELEMENT; i++) {
          arr.push(new Joueur(JOUEUR + i, this.genererTempsAleatoire()));
        }

        return arr;
    }

    private genererTempsAleatoire(): number {
        return Math.floor(Math.random() * BORNE_SUP) + BORNE_INF;
    }

    protected estVide(message: string): boolean {
      return message === STRING_VIDE;
    }

}
