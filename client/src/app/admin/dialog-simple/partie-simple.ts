import { Joueur } from "../joueur";
import { SafeResourceUrl } from "@angular/platform-browser";

export class PartieSimple {
    protected _id: string;
    protected _nomPartie: string;
    protected _tempsSolo: Array<Joueur>;
    protected _tempsUnContreUn: Array<Joueur>;
    protected _imageBlob: SafeResourceUrl;
    protected _image1: Buffer;
    protected _image2: Buffer;
    public _imageDiff: Array<Array<string>>;

    public constructor( nomPartie: string, tempsSolo: Array<Joueur>, tempsUnContreUn: Array<Joueur>,
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

    public get tempsSolo(): Array<Joueur> {
        return this._tempsSolo;
    }

    public set tempsSolo(tempsSolo: Array<Joueur>) {
        this._tempsSolo = tempsSolo;
    }

    public get tempsUnContreUn(): Array<Joueur> {
        return this._tempsUnContreUn;
    }

    public set tempsUnContreUn(tempsUnContre: Array<Joueur>) {
        this._tempsUnContreUn = tempsUnContre;
    }

    public get image1(): Buffer {
        return this._image1;
    }

    public set image1(image1: Buffer) {
        this._image1 = image1;
    }

    public get image2(): Buffer {
        return this._image2;
    }

    public set image2(image2: Buffer) {
        this._image2 = image2;
    }

    public get imageDiff(): Array<Array<string>> {
        return this._imageDiff;
    }

    public set imageDiff(imageDiff: Array<Array<string>>) {
        this._imageDiff = imageDiff;
    }

    public get imageBlob(): SafeResourceUrl {
        return this._imageBlob;
    }

    public set imageBlob(imageBlob: SafeResourceUrl) {
        this._imageBlob = imageBlob;
    }
  }
