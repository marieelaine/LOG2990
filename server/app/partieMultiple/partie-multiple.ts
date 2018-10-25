import * as p from "path";
import * as fs from "fs";
import * as util from "util";
import * as fsx from "fs-extra";
import { Schema, Model, Document } from "mongoose";
import { Request, Response} from "express";
import uniqueValidator = require("mongoose-unique-validator");
import "reflect-metadata";
import { injectable } from "inversify";
import { BaseDeDonnees } from "../baseDeDonnees/baseDeDonnees";
import { execFile } from "child_process";
//import { RoutesPartieMultiple } from "../routesPartieMultiple";

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

    private async enregistrerPartieSimple(partie: PartieMultipleInterface, res: Response, errorMsg: string): Promise<PartieMultipleInterface> {
        if (errorMsg === "") {
            //partie._image1PV1 = await this.getImageDiffAsBuffer("app/partieMultiple/Images/allo_a_ori.bmp");
            //partie._image1PV2 = await this.getImageDiffAsBuffer("app/partieMultiple/Images/allo_b_ori.bmp");
            //partie._image2PV1 = await this.getImageDiffAsBuffer("app/partieMultiple/Images/allo_a_mod.bmp");
            //partie._image2PV2 = await this.getImageDiffAsBuffer("app/partieMultiple/Images/allo_b_mod.bmp");
            const doc: Document = new this.modelPartie(partie);
            console.log(doc);
            //await doc.save()
        } else {
            // Retourner errorMsg vers le client
            // socketServer.envoyerMessageErreurScript(errorMsg);
        }

        await this.deleteImagesDirectory();

        return partie;
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
    // private async getImageDiffAsBuffer(filename: string): Promise<Buffer> {
    //     const imageOri1: string = p.resolve(filename);
    //     const readFilePromise: Function = util.promisify(fs.readFile);

    //     return await readFilePromise(imageOri1) as Buffer;
    // }

    private async deleteImagesDirectory(): Promise<void> {
        const dir: string = "app/partieMultiple/Images";
        await fsx.remove(dir);
    }

    private async verifierErreurScript(child, partie: PartieMultipleInterface, res: Response): Promise<void> {
        let errorMsg: string = "";

        child.stderr.on("data", async (data) => {
            errorMsg = `${data}`;
            await this.enregistrerPartieSimple(partie, res, errorMsg);
        });
        child.stdout.on("data", async (data) => {
            await this.enregistrerPartieSimple(partie, res, errorMsg);
        });
    }

    private async genererScene(partie: PartieMultipleInterface, res: Response): Promise<void> {
        // tslint:disable-next-line:no-console
        await this.makeImagesDirectory();
        const script: string = p.resolve("app/partieMultiple/genmulti/main.exe");
        const args: string[] = [partie._theme, String(partie._quantiteObjets), partie._typeModification, partie._nomPartie];

        const child = execFile(script, args);
        this.verifierErreurScript(child, partie, res);
    }

    private async makeImagesDirectory(): Promise<void> {
        const dir: string = "app/partieMultiple/Images";
        const mkdirPromise: Function = util.promisify(fs.mkdir);
        const existsPromise: Function = util.promisify(fs.exists);
        if (await existsPromise(dir)) {
            await fsx.remove(dir);
        }

        await mkdirPromise(dir);
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
            await this.genererScene(req.body, res);
            res.status(201);
        } catch (err) {
            res.status(501).json(err);
        }
    }

    public async requetePartieSimpleId(req: Request, res: Response): Promise<void> {
        res.send(await this.obtenirPartieId(req.params.id));
    }

    private async obtenirPartieId(nomPartie: String): Promise<string> {
        const partieSimples: PartieMultipleInterface[] = [];
        await this.modelPartie.find()
            .then((res: Document[]) => {
                for (const partieSimple of res) {
                    partieSimples.push(partieSimple.toObject());
                }
            });

        for (const partieSimple of partieSimples) {
            if (partieSimple._nomPartie === nomPartie) {
                return partieSimple._id;
            }
        }
        // Change the return.

        return partieSimples[0]._id;
    }

    public async requeteDeletePartie(req: Request, res: Response): Promise<void> {
        try {
            await this.deletePartie(req.params.id, res);
            res.status(201);
        } catch (err) {
            res.status(501).json(err);
        }
    }

    private async deletePartie(idPartie: String, res: Response): Promise<Response> {
        try {
            await this.modelPartie.findOneAndRemove(this.modelPartie.findById(idPartie)).catch(() => {
                throw new Error();
            });

            return res.status(201);
        } catch (err) {

            return res.status(501).json(err);
        }
    }

    public async requeteGetListePartie(req: Request, res: Response): Promise<void> {
        await this.baseDeDonnees.assurerConnection();
        res.send(await this.getListePartie());
    }

}
