import * as p from "path";
import { Schema, Model, Document } from "mongoose";
import { Request, Response} from "express";
import uniqueValidator = require("mongoose-unique-validator");
import "reflect-metadata";
import { injectable } from "inversify";
import { BaseDeDonnees } from "../baseDeDonnees/baseDeDonnees";
import { execFile } from "child_process";

interface PartieMultipleInterface {
    _id: string;
    _nomPartie: string;
    _tempsSolo: Array<number>;
    _tempsUnContreUn: Array<number>;
    _image1PV1: Buffer;
    _image1PV2: Buffer;
    _image2PV1: Buffer;
    _image2PV2: Buffer;
    _imageDiff1: Buffer;
    _imageDiff2: Buffer;
    _quantiteObjets: number;
    _theme: string;
    _typeModification: string;
}

@injectable()
export class DBPartieMultiple {

    private baseDeDonnees: BaseDeDonnees;
    private modelPartie: Model<Document>;
    private schema: Schema;

    public constructor() {
        this.baseDeDonnees = new BaseDeDonnees();
        this.CreateSchema();

        this.schema.plugin(uniqueValidator);
        this.modelPartie = this.baseDeDonnees.mongoose.model("parties-multiples", this.schema);
    }

    private CreateSchema(): void {
            this.schema = new Schema({
                _nomPartie: { type: String, required: true, },
                _tempsSolo: { type: Array, required: true, },
                _tempsUnContreUn: { type: Array, required: true, },
                _image1PV1: { type: Buffer },
                _image1PV2: { type: Buffer },
                _image2PV1: { type: Buffer },
                _image2PV2: { type: Buffer },
                _imageDiff1: { type: Buffer },
                _imageDiff2: {type: Buffer },
                _quantiteObjets: { type: Number, required: true },
                _typeModification: { type: String, required: true },
                _theme: { type: String, required: true }
            });
        }

    // private async ajouterPartie(partie: PartieMultipleInterface, res: Response): Promise<void> {
    //     const doc: Document = new this.modelPartie(partie);
    //     // tslint:disable-next-line:no-console
    //     console.log("la partie av: " + doc);
    //     await doc.save();
    // }

    // private async deletePartie(nomPartie: String, res: Response): Promise<Response> {

    // }

    // private async obtenirPartieId(nomPartie: String): Promise<string> {

    // }

    private async genererScene(partie: PartieMultipleInterface): Promise<void> {
        // tslint:disable-next-line:no-console
        console.log(partie);
        const script: string = p.resolve("app/PartieMultiple/genmulti/main.exe");
        const args: string[] = [partie._theme, String(partie._quantiteObjets), partie._typeModification, partie._nomPartie];

        const child = execFile(script, args);
        console.log(child);
    }

    private async getListePartie(): Promise<PartieMultipleInterface[]> {
        const listeParties: PartieMultipleInterface[] = [];

        await this.modelPartie.find()
            .then((res: Document[]) => {
                for (const partie of res) {
                    listeParties.push(partie.toJSON());
                }
            });

        return listeParties;
    }

    public async requeteAjouterPartie(req: Request, res: Response): Promise<void> {
        try {
            // tslint:disable-next-line:no-console
            await this.genererScene(req.body);
            res.status(201);
        } catch (err) {
            res.status(501).json(err);
        }
    }

    // public async requetePartieSimpleId(req: Request, res: Response): Promise<void> {
    //     res.send(await this.obtenirPartieId(req.params.id));
    // }

    // public async requeteDeletePartie(req: Request, res: Response): Promise<void> {
    //     try {
    //         await this.deletePartie(req.params.id, res);

    //         res.status(201);
    //     } catch (err) {
    //         res.status(501).json(err);
    //     }
    // }

    public async requeteGetListePartie(req: Request, res: Response): Promise<void> {
        await this.baseDeDonnees.assurerConnection();
        res.send(await this.getListePartie());
    }

}
