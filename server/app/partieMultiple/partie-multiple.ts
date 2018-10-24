import { Schema, Model, Document } from "mongoose";
import { Request, Response} from "express";
import uniqueValidator = require("mongoose-unique-validator");
import "reflect-metadata";
import { injectable } from "inversify";
import { BaseDeDonnees } from "../baseDeDonnees/baseDeDonnees";

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
        this.modelPartie = this.baseDeDonnees.mongoose.model("parties-multiple", this.schema);
    }

    private CreateSchema(): void {
            this.schema = new Schema({
                _nomPartie: { type: String, required: true, },
                _tempsSolo: { type: Array, required: true, },
                _tempsUnContreUn: { type: Array, required: true, },
                _image1PV1: {
                    type: Buffer,
                    required: true,
                },
                _image1PV2: {
                    type: Buffer,
                    required: true,
                },
                _image2PV1: {
                    type: Buffer,
                    required: true,
                },
                _image2PV2: {
                    type: Buffer,
                    required: true,
                },
                _imageDiff1: {
                    type: Buffer,
                },
                _imageDiff2: {
                    type: Buffer,
                }
            });
        }

    private async ajouterPartie(partie: PartieMultipleInterface, res: Response): Promise<void> {
        // tslint:disable-next-line:no-console
        console.log("allo de ajouter partie");
        const doc: Document = new this.modelPartie(partie);
        await doc.save();
    }

    // private async deletePartie(nomPartie: String, res: Response): Promise<Response> {

    // }

    // private async obtenirPartieId(nomPartie: String): Promise<string> {

    // }

    // private async getListePartie(): Promise<PartieSimple[]> {
    // }

    public async requeteAjouterPartie(req: Request, res: Response): Promise<void> {
        // tslint:disable-next-line:no-console
        console.log("allo de requete ajouter partie");
        try {
            await this.ajouterPartie(req.body, res);
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

    // public async requeteGetListePartie(req: Request, res: Response): Promise<void> {
    //     await this.baseDeDonnees.assurerConnection();
    //     res.send(await this.getListePartie());
    // }

}
