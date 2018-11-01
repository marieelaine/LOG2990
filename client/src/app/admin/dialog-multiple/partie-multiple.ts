export class PartieMultiple {
    protected _id: string;
    protected _nomPartie: string;
    protected _tempsSolo: Array<number>;
    protected _tempsUnContreUn: Array<number>;
    protected _image1PV1: Buffer;
    protected _image1PV2: Buffer;
    protected _image2PV1: Buffer;
    protected _image2PV2: Buffer;
    protected _imageDiff1: Array<Array<string>>;
    protected _imageDiff2: Array<Array<string>>;
    protected _quantiteObjets: number;
    protected _theme: string;
    protected _typeModification: string;

    public constructor( nomPartie: string, tempsSolo: Array<number>, tempsUnContreUn: Array<number>,
                        image1PV1: Buffer, image1PV2: Buffer, image2PV1: Buffer, image2PV2: Buffer,
                        imageDiff1: Array<Array<string>>, imageDiff2: Array<Array<string>>, quantiteObjets: number, theme: string,
                        typeModification: string,  id?: string) {
      this._nomPartie = nomPartie;
      this._tempsSolo = tempsSolo;
      this._tempsUnContreUn = tempsUnContreUn;
      this._image1PV1 = image1PV1;
      this._image1PV2 = image1PV2;
      this._image2PV1 = image2PV1;
      this._image2PV2 = image2PV2;
      this._imageDiff1 = imageDiff1;
      this._imageDiff2 = imageDiff2;
      this._quantiteObjets = quantiteObjets;
      this._theme = theme;
      this._typeModification = typeModification;
      if (id) {
          this._id = id;
      }

    }
  }
