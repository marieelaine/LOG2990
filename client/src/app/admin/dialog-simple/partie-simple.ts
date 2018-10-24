export class PartieSimple {
    protected _id: string;
    protected _nomPartie: string;
    protected _tempsSolo: Array<number>;
    protected _tempsUnContreUn: Array<number>;
    public _image1: Uint8Array;
    public _image2: Uint8Array;
    protected _imageDiff: Buffer;

    public constructor( nomPartie: string, tempsSolo: Array<number>, tempsUnContreUn: Array<number>,
                        image1: Uint8Array, image2: Uint8Array, imageDiff: Buffer, id?: string) {
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
    get user(): string {
        return this._nomPartie;
    }
  }
