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
import { execFile, ChildProcess } from "child_process";

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
    private modelPartieArray: Model<Document>;
    private schema: Schema;
    private schemaArray: Schema;

    public constructor() {
        this.baseDeDonnees = new BaseDeDonnees();
        this.CreateSchema();
        this.CreateSchemaArray();

        this.schema.plugin(uniqueValidator);
        this.schemaArray.plugin(uniqueValidator);
        this.modelPartie = this.baseDeDonnees.mongoose.model("parties-multiples", this.schema, "parties-multiples");
        this.modelPartieArray = this.baseDeDonnees.mongoose.model("parties-multiples-array", this.schemaArray, "parties-multiples");

    }

    private CreateSchema(): void {
            this.schema = new Schema({
                _nomPartie: { type: String, required: true, unique: true, },
                _tempsSolo: { type: Array, required: true, },
                _tempsUnContreUn: { type: Array, required: true, },
                _image1PV1: { type: Buffer, required: true, },
                _image1PV2: { type: Buffer, required: true, },
                _image2PV1: { type: Buffer, required: true, },
                _image2PV2: { type: Buffer, required: true, },
                _imageDiff1: { type: Buffer },
                _imageDiff2: {type: Buffer },
                _quantiteObjets: { type: Number, required: true },
                _typeModification: { type: String, required: true },
                _theme: { type: String, required: true }
            });
        }

    private CreateSchemaArray(): void {
        this.schemaArray = new Schema({
            _nomPartie: { type: String, required: true, unique: true, },
            _tempsSolo: { type: Array, required: true, },
            _tempsUnContreUn: { type: Array, required: true, },
            _image1PV1: { type: Array, required: true, },
            _image1PV2: { type: Array, required: true, },
            _image2PV1: { type: Array, required: true, },
            _image2PV2: { type: Array, required: true, },
            _imageDiff1: { type: Buffer },
            _imageDiff2: {type: Buffer },
            _quantiteObjets: { type: Number, required: true },
            _typeModification: { type: String, required: true },
            _theme: { type: String, required: true }
        });
    }


    private async enregistrerPartieMultiple(partie: PartieMultipleInterface, res: Response, errorMsg: string): 
    Promise<PartieMultipleInterface> {
        if (errorMsg === "") {
            partie._image1PV1 = await this.getImageDiffAsBuffer("../Images/"+partie._nomPartie+"_a_ori.bmp");
            partie._image2PV1 = await this.getImageDiffAsBuffer("../Images/"+partie._nomPartie+"_b_ori.bmp");
            partie._image1PV2 = await this.getImageDiffAsBuffer("../Images/"+partie._nomPartie+"_a_mod.bmp");
            partie._image2PV2 = await this.getImageDiffAsBuffer("../Images/"+partie._nomPartie+"_b_mod.bmp");
            const partieMultiple: Document = new this.modelPartie(partie);
            // tslint:disable-next-line:no-console
            await partieMultiple.save();
        } else {
            // Retourner errorMsg vers le client
            // socketServer.envoyerMessageErreurScript(errorMsg);
        }
        this.deleteImagesDirectory();

        return partie;
    }

    private async getImageDiffAsBuffer(filename: string): Promise<Buffer> {
        const imageMod: string = p.resolve(filename);
        const readFilePromise: Function = util.promisify(fs.readFile);

        return await readFilePromise(imageMod) as Buffer;
    }

    private async verifierErreurScript(child: ChildProcess, partie: PartieMultipleInterface, res: Response): Promise<void> {
        let errorMsg: string = "";

        child.stderr.on("data", async (data: string) => {
            errorMsg = `${data}`;
            await this.enregistrerPartieMultiple(partie, res, errorMsg);
        });
        child.stdout.on("data", async (data: string) => {
            await this.enregistrerPartieMultiple(partie, res, errorMsg);
        });
    }

    private async deleteImagesDirectory(): Promise<void> {
        const dir: string = "../Images";
        await fsx.remove(dir);
    }

    private async genererScene(partie: PartieMultipleInterface, res: Response): Promise<void> {
        // tslint:disable-next-line:no-console
        await this.makeDirectory("../Images");
        const script: string = p.resolve("app/genmulti/main.exe");
        const args: string[] = [partie._theme, String(partie._quantiteObjets), partie._typeModification, "../Images/"+partie._nomPartie];

        const child: ChildProcess = execFile(script, args);
        this.verifierErreurScript(child, partie, res);
    }

    private async makeDirectory(name: string): Promise<void> {
        const dir: string = name;
        const mkdirPromise: Function = util.promisify(fs.mkdir);
        const existsPromise: Function = util.promisify(fs.exists);
        if (await existsPromise(dir)) {
            await fsx.remove(dir);
        }

        await mkdirPromise(dir);
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

    private async getListePartie(): Promise<PartieMultipleInterface[]> {
        const listeParties: PartieMultipleInterface[] = [];

        await this.modelPartieArray.find()
            .then((res: Document[]) => {
                for (const partie of res) {
                    listeParties.push(partie.toJSON());
                }
            });

        return listeParties;
    }

    public async requeteAjouterPartie(req: Request, res: Response): Promise<void> {
        try {
            await this.genererScene(req.body, res);
            res.status(201);
        } catch (err) {
            res.status(501).json(err);
        }
    }

    public async requeteDeletePartie(req: Request, res: Response): Promise<void> {
        try {
            await this.deletePartie(req.params.id, res);

            res.status(201);
        } catch (err) {
            res.status(501).json(err);
        }
    }

    public async requeteGetListePartie(req: Request, res: Response): Promise<void> {
        await this.baseDeDonnees.assurerConnection();
        res.send(await this.getListePartie());
    }

    public async requeteReinitialiserTemps(req: Request, res: Response): Promise<void> {
        await this.baseDeDonnees.assurerConnection();
        try {
            await this.reinitialiserTemps(req.params.id, req.body.tempsSolo, req.body.tempsUnContreUn);
            res.status(201);
        } catch (err) {
            res.status(501).json(err);
        }
    }

    private async reinitialiserTemps(idPartie: String, tempsSolo: Array<number>, tempsUnContreUn: Array<number>): Promise<void> {
        await this.modelPartie.findByIdAndUpdate(idPartie, { _tempsSolo: tempsSolo, _tempsUnContreUn: tempsUnContreUn })
            .catch(() => { throw new Error(); });
    }

}
