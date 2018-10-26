export class User {
  private _id: String;
  private _username: String;

  public constructor(username: String) {

    this._username = username;
  }

  public get id(): String {

    return this._id;
  }

  public get username(): String {

    return this._username;
  }
}
