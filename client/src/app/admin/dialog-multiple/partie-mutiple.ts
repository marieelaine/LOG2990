export class PartieMultiple {
    private _id: string;
    private _nomPartie: string;
    private _tempsSolo: Array<number>;
    private _tempsUnContreUn: Array<number>;
    private _image1: Buffer;
    private _image2: Buffer;
    private _imageDiff: Buffer;

    public constructor( nomPartie: string, tempsSolo: Array<number>, tempsUnContreUn: Array<number>,
                        image1: Buffer, image2: Buffer, imageDiff: Buffer, id?: string) {
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

    public get id(): String {

      return this._id;
    }

    public get username(): String {

      return this._nomPartie;
    }

    public get tempsSolo(): Array<number> {

      return this._tempsSolo;
    }

    public get tempsUnContreUn(): Array<number> {

      return this._tempsUnContreUn;
    }

    public get image1(): Buffer {

      return this._image1;
    }

    public get image2(): Buffer {

      return this._image2;
    }

    public get imageDiff(): Buffer {

      return this._imageDiff;
    }

  }
