import { Joueur } from "../joueur";
import { SafeResourceUrl } from "@angular/platform-browser";

export class PartieMultiple {
    protected _id: string;
    protected _nomPartie: string;
    protected _tempsSolo: Array<Joueur>;
    protected _tempsUnContreUn: Array<Joueur>;
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

    public constructor( nomPartie: string, tempsSolo: Array<Joueur>, tempsUnContreUn: Array<Joueur>,
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

    public get image1PV1(): Buffer {
        return this._image1PV1;
    }

    public set image1PV1(image1PV1: Buffer) {
        this._image1PV1 = image1PV1;
    }

    public get image1PV2(): Buffer {
        return this._image1PV2;
    }

    public set image1PV2(image1PV2: Buffer) {
        this._image1PV2 = image1PV2;
    }

    public get imageDiff1(): Array<Array<string>> {
        return this._imageDiff1;
    }

    public set imageDiff1(imageDiff1: Array<Array<string>>) {
        this._imageDiff1 = imageDiff1;
    }

    public get image2PV1(): Buffer {
        return this._image2PV1;
    }

    public set image2PV1(image2PV1: Buffer) {
        this._image2PV1 = image2PV1;
    }

    public get image2PV2(): Buffer {
        return this._image2PV2;
    }

    public set image2PV2(image2PV2: Buffer) {
        this._image2PV2 = image2PV2;
    }

    public get imageDiff2(): Array<Array<string>> {
        return this._imageDiff2;
    }

    public set imageDiff2(imageDiff2: Array<Array<string>>) {
        this._imageDiff2 = imageDiff2;
    }

    public get imageBlob(): SafeResourceUrl {
        return this._imageBlob;
    }

    public set imageBlob(imageBlob: SafeResourceUrl) {
        this._imageBlob = imageBlob;
    }

    public get quantiteObjets(): number {
        return this._quantiteObjets;
    }

    public set quantiteObjets(quantite: number) {
        this._quantiteObjets = quantite;
    }

    public get theme(): string {
        return this._theme;
    }

    public set theme(theme: string) {
        this._theme = theme;
    }

    public get typeModification(): string {
        return this._typeModification;
    }

    public set typeModification(mod: string) {
        this._typeModification = mod;
    }
  }
