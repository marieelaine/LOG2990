export class PartieSimple {
    private _id: string;
    private _nomPartie: string;
    private _tempsSolo: Array<number>;
    private _tempsUnContreUn: Array<number>;
    private _image1: Buffer;
    private _image2: Buffer;
    private _imageDiff: Buffer;

    public constructor(nomPartie: string, tempsSolo: Array<number>, tempsUnContreUn: Array<number>,
                       image1: Buffer, image2: Buffer, imageDiff: Buffer) {
      this._nomPartie = nomPartie;
      this._tempsSolo = tempsSolo;
      this._tempsUnContreUn = tempsUnContreUn;
      this._image1 = image1;
      this._image2 = image2;
      this._imageDiff = imageDiff;
    }

    public get id(): String {

      return this._id;
    }

    public get username(): String {

      return this._nomPartie;
    }

  }
