import * as constantes from "../../constantes";

export class PartieAttributsAdmin {
    private _partieCommence: boolean;
    private _differenceRestantes: number;
    private _diffTrouvee: number[][];
    private _penaliteEtat: boolean;
    private _isMultijoueur: boolean;
    private _messageDifferences: string;
    private _differencesTrouvees: number;

    public constructor() {
        this.partieCommence = false;
        this.differencesTrouvees = 0;
        this.messageDifferences = constantes.CHARGEMENT_IMAGES;
        this.diffTrouvee = [[], []];
        this.penaliteEtat = false;
    }

    public get partieCommence(): boolean {
        return this._partieCommence;
    }

    public set partieCommence(value: boolean) {
        this._partieCommence = value;
    }

    public get differenceRestantes(): number {
        return this._differenceRestantes;
    }

    public set differenceRestantes(value: number) {
        this._differenceRestantes = value;
    }

    public get diffTrouvee(): number[][] {
        return this._diffTrouvee;
    }

    public set diffTrouvee(value: number[][]) {
        this._diffTrouvee = value;
    }

    public get penaliteEtat(): boolean {
        return this._penaliteEtat;
    }

    public set penaliteEtat(value: boolean) {
        this._penaliteEtat = value;
    }

    public get isMultijoueur(): boolean {
        return this._isMultijoueur;
    }

    public set isMultijoueur(value: boolean) {
        this._isMultijoueur = value;
    }

    public get messageDifferences(): string {
        return this._messageDifferences;
    }

    public set messageDifferences(value: string) {
        this._messageDifferences = value;
    }

    public get differencesTrouvees(): number {
        return this._differencesTrouvees;
    }

    public set differencesTrouvees(value: number) {
        this._differencesTrouvees = value;
    }
}
