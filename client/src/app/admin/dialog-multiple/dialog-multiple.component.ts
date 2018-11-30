import { Component, Inject } from "@angular/core";
import { DialogAbstrait} from "../dialog-abstrait";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { DialogData, Checkbox } from "../admin.component";
import { HttpClient } from "@angular/common/http";
import { PartieMultiple } from "./partie-multiple";
import * as Buffer from "buffer";
import { PartieMultipleService } from "../partie-multiple.service";
import { FormControl, Validators } from "@angular/forms";
import { TempsUser } from "../temps-user";
import { LONGUEUR_NOM_MIN, LONGUEUR_NOM_MAX, NB_OBJET_MIN, NB_OBJET_MAX } from "src/app/constantes";

@Component({
  selector: "app-dialog-multiple",
  templateUrl: "./dialog-multiple.component.html",
  styleUrls: ["./dialog-multiple.component.css"],
})

export class DialogMultipleComponent extends DialogAbstrait {

  protected toggleClassButtonGeo: boolean;
  protected toggleClassButtonOcean: boolean;
  protected outOfBoundNumberForms: string;
  protected checkboxMessage: string;
  protected themeButtonMessage: string;
  protected qtyControl: FormControl;
  protected nameControl: FormControl;

  public constructor(
    dialogRef: MatDialogRef<DialogMultipleComponent>,
    @Inject(MAT_DIALOG_DATA) data: DialogData,
    http: HttpClient,
    private partieMultipleService: PartieMultipleService) {
      super(dialogRef, data, http);
      this.toggleClassButtonGeo = false;
      this.toggleClassButtonOcean = false;
      this.outOfBoundNumberForms = "";
      this.checkboxMessage = "";
      this.themeButtonMessage = "";
      this.data.theme = "";
      this.data.typeModification = "";
      this.nameControl = new FormControl("", [
        Validators.minLength(LONGUEUR_NOM_MIN), Validators.maxLength(LONGUEUR_NOM_MAX), Validators.required]);
      this.qtyControl = new FormControl("", [
        Validators.min(NB_OBJET_MIN), Validators.max(NB_OBJET_MAX),
        Validators.required, Validators.pattern("[ 0-9 ]*")]);
  }

  protected checkboxArray: Checkbox[] =  [
  {
    name: "Ajout",
    checked: false,
    value: "a"
  },
  {
    name: "Suppression",
    checked: false,
    value: "s"
  },
  {
    name: "Changement de couleur",
    checked: false,
    value: "c"
  }
  ];

  protected getCheckboxes(): void {
    const arr: Array<string> = this.checkboxArray.filter((x) => x.checked).map((x) => x.value);
    let typeModif: string = "";
    for (const item of arr) {
      typeModif += item;
    }
    this.data.typeModification = typeModif;
  }

  protected onClickAjouterPartie(): void {
      this.setOutOfBoundNameLengthMessage();
      this.setOutOfBoundNumberFormsMessage();
      this.setCheckboxMessage();
      this.setThemeMessage();
      this.closeDialogIfRequirements();
    }

  protected onSubmit(): void {
    this.ajouterPartie();
  }

  protected ajouterPartie(): void {
    const tempsSolo: Array<TempsUser> = this.genererTableauTempsAleatoires();
    const temps1v1: Array<TempsUser> = this.genererTableauTempsAleatoires();

    const result: PartieMultiple = new PartieMultiple(this.data.multipleGameName, tempsSolo, temps1v1,
                                                      Buffer.Buffer.from(new Array()), Buffer.Buffer.from(new Array()),
                                                      Buffer.Buffer.from(new Array()), Buffer.Buffer.from(new Array()),
                                                      new Array<Array<string>>(), new Array<Array<string>>(),
                                                      this.data.quantiteObjets, this.data.theme,
                                                      this.data.typeModification);
    this.partieMultipleService.register(result)
      .subscribe(
        (data) => {
        },
        (error) => {
          console.error(error);
        });
  }

  protected onGeoClickButton(event: Event, theme: string): void {
    this.toggleClassButtonGeo = !this.toggleClassButtonGeo;
    this.toggleClassButtonOcean = false;
    this.data.theme = theme;
  }

  protected onThemeClickButton(event: Event, theme: string): void {
    this.toggleClassButtonOcean = !this.toggleClassButtonOcean;
    this.toggleClassButtonGeo = false;
    this.data.theme = theme;
  }

  protected verifierSiMessageErreur(): Boolean {
    return (this.outOfBoundNameLengthMessage !== ""
            || this.outOfBoundNumberForms !== ""
            || this.checkboxMessage !== ""
            || this.themeButtonMessage !== "");
  }

  protected checkIfOutOfBoundNameLength(): Boolean {
    return (this["data"].multipleGameName === "" || this["data"].multipleGameName === undefined
    || this["data"].multipleGameName.length < LONGUEUR_NOM_MIN || this["data"].multipleGameName.length > LONGUEUR_NOM_MAX);
  }

  protected checkIfOutOfBoundNumberForms(): Boolean {
    return (this["data"].quantiteObjets < NB_OBJET_MIN || this["data"].quantiteObjets > NB_OBJET_MAX);
  }

  protected checkAllCheckbox(): Boolean {
    return (this["data"].typeModification === "");
  }

  protected checkThemeButton(): Boolean {
    return (this.data.theme === "");
  }

  protected setOutOfBoundNumberFormsMessage(): void {
    this.checkIfOutOfBoundNumberForms() ?
      this.outOfBoundNumberForms = "*Le nombre de formes doit être entre 10 et 200." :
      this.outOfBoundNumberForms = "" ;
  }

  protected setCheckboxMessage(): void {
    this.checkAllCheckbox() ?
      this.checkboxMessage = "*Une transformation doit etre selectionnee au minimum." :
      this.checkboxMessage = "" ;
  }

  protected setThemeMessage(): void {
    this.checkThemeButton() ?
      this.themeButtonMessage = "*Un theme doit etre selectionne." :
      this.themeButtonMessage = "" ;
  }
}
