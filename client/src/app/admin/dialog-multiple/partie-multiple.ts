import { TempsUser } from "../temps-user";
import { SafeResourceUrl } from "@angular/platform-browser";

export class PartieMultiple {
    protected _id: string;
    protected _nomPartie: string;
    protected _tempsSolo: Array<TempsUser>;
    protected _tempsUnContreUn: Array<TempsUser>;
    protected _imageBlob: SafeResourceUrl;
    protected _image1PV1: Buffer;
    protected _image1PV2: Buffer;
    protected _image2PV1: Buffer;
    protected _image2PV2: Buffer;
    protected _imageDiff1: Array<Array<string>>;
    protected _imageDiff2: Array<Array<string>>;
    protected _quantiteObjets: number;
    protected _theme: string;
    protected _typeModification: string;

    public constructor( nomPartie: string, tempsSolo: Array<TempsUser>, tempsUnContreUn: Array<TempsUser>,
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
      this._imageBlob = "";

    }

    public get id(): string {
        return this._id;
    }

    public set id(id: string) {
        this._id = id;
    }

    public get nomPartie(): string {
        return this._nomPartie;
    }

    public set nomPartie(nomPartie: string) {
        this._nomPartie = nomPartie;
    }

    public get tempsSolo(): Array<TempsUser> {
        return this._tempsSolo;
    }

    public set tempsSolo(tempsSolo: Array<TempsUser>) {
        this._tempsSolo = tempsSolo;
    }

    public get tempsUnContreUn(): Array<TempsUser> {
        return this._tempsUnContreUn;
    }

    public set tempsUnContreUn(tempsUnContre: Array<TempsUser>) {
        this._tempsUnContreUn = tempsUnContre;
    }

  }
