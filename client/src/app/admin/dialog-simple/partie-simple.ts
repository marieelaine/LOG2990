export class PartieSimple {
    private _id: string;
    private _nomPartie: string;
    private _ImageName: string;

    public constructor(imageName: string) {
      // this._id = "";
      this._ImageName = imageName;
    }

    public get id(): String {

      return this._id;
    }

    public get username(): String {

      return this._ImageName;
    }

  }
