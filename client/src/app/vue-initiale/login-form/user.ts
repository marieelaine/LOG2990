export class User {
  private _id: string;
  private _username: string;

  public constructor(username: string) {

    this._username = username;
  }

  public get id(): string {

    return this._id;
  }

  public get username(): string {

    return this._username;
  }
}
