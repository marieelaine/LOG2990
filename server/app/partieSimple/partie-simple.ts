import * as fs from "fs";
import * as util from "util";
import * as p from "path";
import * as fsx from "fs-extra";
import { spawn, ChildProcess } from "child_process";
import { Schema, Model, Document } from "mongoose";
import { Request, Response} from "express";
import { BaseDeDonnees } from "../baseDeDonnees/baseDeDonnees";
import uniqueValidator = require("mongoose-unique-validator");
import "reflect-metadata";
import { injectable } from "inversify";
// import { socketServer } from "../www";

interface PartieSimpleInterface {
    _id: string;
    _nomPartie: string;
    _tempsSolo: Array<number>;
    _tempsUnContreUn: Array<number>;
    _image1: Buffer;
    _image2: Buffer;
    _imageDiff: Buffer;
}
@injectable()
export class DBPartieSimple {
    private baseDeDonnees: BaseDeDonnees;

    private modelPartieBuffer: Model<Document>;
    private modelPartieArray: Model<Document>;

    private schemaArray: Schema;
    private schemaBuffer: Schema;

    public constructor() {
        this.baseDeDonnees = new BaseDeDonnees();

        this.CreateSchemaArray();
        this.schemaArray.plugin(uniqueValidator);
        this.modelPartieArray = this.baseDeDonnees.mongoose.model("parties-simples-array", this.schemaArray, "parties-simples");

        this.CreateSchemaBuffer();
        this.schemaBuffer.plugin(uniqueValidator);
        this.modelPartieBuffer = this.baseDeDonnees.mongoose.model("parties-simples", this.schemaBuffer, "parties-simples");
    }

    private CreateSchemaArray(): void {
            this.schemaArray = new Schema({
                _nomPartie: {
                    type: String,
                    required: true,
                    unique: true,
                },
                _tempsSolo: {
                    type: Array,
                    required: true,
                },
                _tempsUnContreUn: {
                    type: Array,
                    required: true,
                },
                _image1: {
                    type: Array,
                    required: true,
                },
                _image2: {
                    type: Array,
                    required: true,
                },
                _imageDiff: {
                    type: Array,
                }
            });
        }

    private CreateSchemaBuffer(): void {
        this.schemaBuffer = new Schema({
            _nomPartie: {
                type: String,
                required: true,
                unique: true,
            },
            _tempsSolo: {
                type: Array,
                required: true,
            },
            _tempsUnContreUn: {
                type: Array,
                required: true,
            },
            _image1: {
                type: Buffer,
                required: true,
            },
            _image2: {
                type: Buffer,
                required: true,
            },
            _imageDiff: {
                type: Buffer,
            }
        });
    }

    private async enregistrerPartieSimple(partie: PartieSimpleInterface, res: Response, errorMsg: string): Promise<PartieSimpleInterface> {
        if (errorMsg === "") {
            partie._imageDiff = await this.getImageDiffAsBuffer();
            const partieSimple: Document = new this.modelPartieBuffer(partie);
            // tslint:disable-next-line:no-console
            console.log("save");
            await partieSimple.save();
        } else {
            // tslint:disable-next-line:no-console
            console.log("erreur");
            // Retourner errorMsg vers le client
            // socketServer.envoyerMessageErreurScript(errorMsg);
        }

        await this.deleteImagesDirectory();

        return partie;
    }

    private async getImageDiffAsBuffer(): Promise<Buffer> {
        const imageMod: string = p.resolve("../Images/image3.bmp");
        const readFilePromise: Function = util.promisify(fs.readFile);

        return await readFilePromise(imageMod) as Buffer;
    }

    private async deleteImagesDirectory(): Promise<void> {
        const dir: string = "../Images";
        await fsx.remove(dir);
    }

    private async verifierErreurScript(child: ChildProcess, partie: PartieSimpleInterface, res: Response): Promise<void> {
        let errorMsg: string = "";

        child.stderr.on("data", async (data: string) => {
            errorMsg = `${data}`;
            await this.enregistrerPartieSimple(partie, res, errorMsg);
        });
        child.stdout.on("data", async (data: string) => {
            await this.enregistrerPartieSimple(partie, res, errorMsg);
        });
    }

    private async genererImageMod(partie: PartieSimpleInterface, res: Response): Promise<void> {
        const buffers: Array<Buffer> = [partie._image1, partie._image2];
        await this.addImagesToDirectory(buffers);

        const pyScript: string = p.resolve("app/PartieSimple/bmpdiff/bmpdiff.py");
        const imageOri1: string = p.resolve("../Images/image1.bmp");
        const imageOri2: string = p.resolve("../Images/image2.bmp");
        const imageMod: string = p.resolve("../Images/image3.bmp");
        const args: string[] = [imageOri1, imageOri2, imageMod];
        args.unshift(pyScript);
        const child: ChildProcess = spawn("python", args);
        this.verifierErreurScript(child, partie, res);
    }

    private async makeImagesDirectory(): Promise<void> {
        const dir: string = "../Images";
        const mkdirPromise: Function = util.promisify(fs.mkdir);
        const existsPromise: Function = util.promisify(fs.exists);
        if (await existsPromise(dir)) {
            await fsx.remove(dir);
        }

        await mkdirPromise(dir);
    }

    private async addImagesToDirectory(buffers: Array<Buffer>): Promise<void> {
        await this.makeImagesDirectory();
        const writeFilePromise: Function = util.promisify(fs.writeFile);
        let i: number = 1;
        for (const buf of buffers) {
            await writeFilePromise("../Images/image" + i.toString() + ".bmp", new Buffer(buf));
            i++;
        }
    }

    private async deletePartieSimple(idPartie: String, res: Response): Promise<Response> {
        try {
            await this.modelPartieBuffer.findOneAndRemove(this.modelPartieBuffer.findById(idPartie)).catch(() => {
                throw new Error();
            });

            return res.status(201);
        } catch (err) {

            return res.status(501).json(err);
        }
    }

    private async obtenirPartieSimpleId(nomPartie: String): Promise<string> {
        const partieSimples: PartieSimpleInterface[] = [];
        await this.modelPartieBuffer.find()
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

    private async getListePartie(): Promise<PartieSimpleInterface[]> {
        const listeParties: PartieSimpleInterface[] = [];

        await this.modelPartieArray.find()
            .then((res: Document[]) => {
                for (const partie of res) {
                    listeParties.push(partie.toJSON());
                }
            });

        return listeParties;
    }

    private async reinitialiserTemps(idPartie: String, tempsSolo: Array<number>, tempsUnContreUn: Array<number>): Promise<void> {
        await this.modelPartieBuffer.findByIdAndUpdate(idPartie, { _tempsSolo: tempsSolo, _tempsUnContreUn: tempsUnContreUn })
            .catch(() => { throw new Error(); });
    }

    private async getPartieSimple(partieID: String, res: Response): Promise<PartieSimpleInterface> {
        const partieSimples: PartieSimpleInterface[] = [];
        await this.modelPartieArray.find()
            .then((parties: Document[]) => {
                for (const partie of parties) {
                    partieSimples.push(partie.toJSON());
                }
            });

        for (const partie of partieSimples) {
            if (partie._id === partieID) {
                return partie;
            }
        }

        // TODO: gestion de si la partie n'est pas trouvé
        return partieSimples[1];
    }

    public async requeteAjouterPartieSimple(req: Request, res: Response): Promise<void> {
        try {
            await this.genererImageMod(req.body, res);
            // res.status(201).json(partie);
            res.status(201).json({});
        } catch (err) {
            res.status(501).json(err);
        }
    }

    public async requetePartieSimpleId(req: Request, res: Response): Promise<void> {
        res.send(await this.obtenirPartieSimpleId(req.params.id));
    }

    public async requeteDeletePartieSimple(req: Request, res: Response): Promise<void> {
        try {
            await this.deletePartieSimple(req.params.id, res);

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

    public async requeteGetPartieSimple(req: Request, res: Response): Promise<void> {
        await this.baseDeDonnees.assurerConnection();
        res.send(await this.getPartieSimple(req.params.id, res));
    }

}
