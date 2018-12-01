import { TempsUser } from "../server/app/partie-DB/DB-partie-abstract";

export interface PartieSimpleInterface {
    _id: string;
    _nomPartie: string;
    _tempsSolo: Array<TempsUser>;
    _tempsUnContreUn: Array<TempsUser>;
    _image1: Buffer;
    _image2: Buffer;
    _imageDiff: Array<Array<string>>;
}