export class Joueur {
    private _nom: string;
    private _temps: number;

    public constructor(user: string, temps: number) {
      this._nom = user;
      this._temps = temps;
    }

    public get nom(): string {
        return this._nom;
    }

    public set nom(nom: string) {
        this._nom = nom;
    }

    public get temps(): number {
        return this._temps;
    }

    public set temps(temps: number) {
        this._temps = temps;
    }
  }
