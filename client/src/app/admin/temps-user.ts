export class TempsUser {
    private _user: string;
    private _temps: number;

    public constructor(user: string, temps: number) {
      this._user = user;
      this._temps = temps;
    }

    public get user(): string {
        return this._user;
    }

    public get temps(): number {
        return this._temps;
    }
  }
