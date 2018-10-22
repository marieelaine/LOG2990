export class PartieMultiple {
    private _id: string;
    private _nomPartie: string;
    private _tempsSolo: Array<number>;
    private _tempsUnContreUn: Array<number>;
    private _image1: Buffer;
    private _image3D1: Buffer;
    private _image2: Buffer;
    private _image3D2: Buffer;
    private _imageDiff1: Buffer;
    private _imageDiff2: Buffer;

    public constructor( nomPartie: string, tempsSolo: Array<number>, tempsUnContreUn: Array<number>,
                        image1: Buffer, image3D1: Buffer, image2: Buffer, image3D2: Buffer,
                        imageDiff1: Buffer, imageDiff2: Buffer, id?: string) {
      this._nomPartie = nomPartie;
      this._tempsSolo = tempsSolo;
      this._tempsUnContreUn = tempsUnContreUn;
      this._image1 = image1;
      this._image3D1 = image3D1;
      this._image2 = image2;
      this._image3D2 = image3D2;
      this._imageDiff1 = imageDiff1;
      this._imageDiff2 = imageDiff2;
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

    public get image3D1(): Buffer {

      return this._image3D1;
    }

    public get image2(): Buffer {

      return this._image2;
    }

    public get image3D2(): Buffer {

      return this._image3D2;
    }

    public get imageDiff1(): Buffer {

      return this._imageDiff1;
    }

    public get imageDiff2(): Buffer {

      return this._imageDiff2;
    }

  }
