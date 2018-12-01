import {TempsUser} from "../server/app/partie-DB/DB-partie-abstract";

export interface PartieMultipleInterface {
    _id: string;
    _nomPartie: string;
    _tempsSolo: Array<TempsUser>;
    _tempsUnContreUn: Array<TempsUser>;
    _image1PV1: Buffer;
    _image1PV2: Buffer;
    _image2PV1: Buffer;
    _image2PV2: Buffer;
    _imageDiff1: Array<Array<string>>;
    _imageDiff2: Array<Array<string>>;
    _quantiteObjets: number;
    _theme: string;
    _typeModification: string;
}