export class ImageSimple {
    private _id: String;
    private _Imagename: String;

    public constructor(imageName: String) {
      // this._id = "";
      this._Imagename = imageName;
    }

    public get id(): String {

      return this._id;
    }

    public get username(): String {

      return this._Imagename;
    }
  }
