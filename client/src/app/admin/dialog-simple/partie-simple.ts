export class PartieSimple {
    private _id: string;
    private _nomPartie: string;
    // private _tempsSolo: Array<number>;
    // private _tempsUnContreUn: Array<number>;
    // private _image1: Array<ArrayBuffer>;
    // private _image2: Array<ArrayBuffer>;
    // private _imageDiff: Array<ArrayBuffer>;

    public constructor( nomPartie: string, tempsSolo: Array<number>, tempsUnContreUn: Array<number>,
                        image1: Array<ArrayBuffer>, image2: Array<ArrayBuffer>, imageDiff: Array<ArrayBuffer>, id?: string) {
      this._nomPartie = nomPartie;
      // this._tempsSolo = tempsSolo;
      // this._tempsUnContreUn = tempsUnContreUn;
      // this._image1 = image1;
      // this._image2 = image2;
      // this._imageDiff = imageDiff;
      if (id) {
          this._id = id;
      }

    }

    public get id(): String {

      return this._id;
    }

    public get username(): String {

      return this._nomPartie;
    }

  }
