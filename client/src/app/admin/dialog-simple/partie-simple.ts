export class PartieSimple {
    protected _id: string;
    protected _nomPartie: string;
    protected _tempsSolo: Array<number>;
    protected _tempsUnContreUn: Array<number>;
    protected _image1: Buffer;
    protected _image2: Buffer;
    public _imageDiff: Array<Array<string>>;

    public constructor( nomPartie: string, tempsSolo: Array<number>, tempsUnContreUn: Array<number>,
                        image1: Buffer, image2: Buffer, imageDiff: Array<Array<string>>, id?: string) {
      this._nomPartie = nomPartie;
      this._tempsSolo = tempsSolo;
      this._tempsUnContreUn = tempsUnContreUn;
      this._image1 = image1;
      this._image2 = image2;
      this._imageDiff = imageDiff;
      if (id) {
          this._id = id;
      }

    }
  }
