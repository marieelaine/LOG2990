import { Component, Inject } from '@angular/core';
import { DialogAbstrait } from '../dialog-abstrait';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DialogData } from '../admin.component';
import { HttpClient } from '@angular/common/http';
import { ParticlesModule } from 'angular-particle';
import { PartieMultiple } from './partie-mutiple';
import * as Buffer from "buffer";
import { PartieMultipleService } from '../partie-multiple.service';

@Component({
  selector: 'app-dialog-multiple',
  templateUrl: './dialog-multiple.component.html',
  styleUrls: ['./dialog-multiple.component.css'],
})

export class DialogMultipleComponent extends DialogAbstrait {

  protected toggleClassButton: boolean = false;
  protected checkboxArray: Array<string> = [];

  public constructor(
    dialogRef: MatDialogRef<DialogMultipleComponent>,
    @Inject(MAT_DIALOG_DATA) data: DialogData,
    http: HttpClient,
    private partieMultipleService: PartieMultipleService) {
      super(dialogRef, data, http);
    }

    // sur le click ajouter, call close dialog if requ and on submit
  protected onClickAjouterPartie(): void {
      this.setOutOfBoundNameLengthMessage();
      this.closeDialogIfRequirements();
    }

  protected onSubmit(): void {
    this.ajouterPartie();
  }

  protected ajouterPartie() {
    const tempsSolo: Array<number> = this.genererTableauTempsAleatoires();
    const temps1v1: Array<number> = this.genererTableauTempsAleatoires();

    const result: PartieMultiple = new PartieMultiple(this["data"].multipleGameName, tempsSolo, temps1v1,
                                                      Buffer.Buffer.from(new Array()), Buffer.Buffer.from(new Array()),
                                                      Buffer.Buffer.from(new Array()), Buffer.Buffer.from(new Array()),
                                                      Buffer.Buffer.from(new Array()), Buffer.Buffer.from(new Array()),
                                                      this["data"].quantiteObjets, this["data"].theme,
                                                      this["data"].typeModification);
    this.partieMultipleService.register(result)
      .subscribe(
        (data) => {
        },
        (error) => {
          console.error(error);
        }
      );
  }

  protected onThemeClickButton(event: Event, theme: string): void {
    this.toggleClassButton = !this.toggleClassButton;
    this.data.theme = theme;
    console.log(this.data.typeModification);
  }

  protected verifierSiMessageErreur(): Boolean {

    return (this.outOfBoundNameLengthMessage !== "");
  }

  protected checkIfOutOfBoundNameLength(): Boolean {

    return (this["data"].multipleGameName === "" || this["data"].multipleGameName === undefined
    || this["data"].multipleGameName.length < 3 || this["data"].multipleGameName.length > 20);
  }
}
