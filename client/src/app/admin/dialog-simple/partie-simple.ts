import { TempsUser } from "../temps-user";
import { SafeResourceUrl } from "@angular/platform-browser";

export class PartieSimple {
    protected _id: string;
    protected _nomPartie: string;
    protected _tempsSolo: Array<TempsUser>;
    protected _tempsUnContreUn: Array<TempsUser>;
    protected _imageBlob: SafeResourceUrl;
    protected _image1: Buffer;
    protected _image2: Buffer;
    public _imageDiff: Array<Array<string>>;

    public constructor( nomPartie: string, tempsSolo: Array<TempsUser>, tempsUnContreUn: Array<TempsUser>,
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
