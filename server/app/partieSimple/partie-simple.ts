import * as fs from "fs";
import * as util from "util";
import * as p from "path";
import * as fsx from "fs-extra";
import { ChildProcess, execFile, spawn } from "child_process";
import { Schema, Model, Document } from "mongoose";
import { Request, Response} from "express";
import { BaseDeDonnees } from "../baseDeDonnees/baseDeDonnees";
import uniqueValidator = require("mongoose-unique-validator");
import "reflect-metadata";
import { ReadLine } from "readline";
import { injectable, inject } from "inversify";
import { SocketServerService } from "../socket-io.service";
import Types from "../types";

export interface PartieSimpleInterface {
    _id: string;
    _nomPartie: string;
    _tempsSolo: Array<number>;
    _tempsUnContreUn: Array<number>;
    _image1: Buffer;
    _image2: Buffer;
    _imageDiff: Array<Array<string>>;
}

@injectable()
export class DBPartieSimple {
    private ajouterPartieFailed: boolean;
    private messageErreurNom: string;
    private messageErreurDiff: string;

    private baseDeDonnees: BaseDeDonnees;

    private modelPartieBuffer: Model<Document>;
    private modelPartieArray: Model<Document>;

    private schemaArray: Schema;
    private schemaBuffer: Schema;

    public constructor(@inject(Types.SocketServerService) private socket: SocketServerService) {
        this.messageErreurNom = "Le nom de la partie est déjà pris, veuillez réessayer.";
        this.messageErreurDiff = "Les deux images doivent avoir exactement 7 différences, veuillez réessayer.";
        this.baseDeDonnees = new BaseDeDonnees();

        this.CreateSchemaArray();
        this.schemaArray.plugin(uniqueValidator);
        this.modelPartieArray = this.baseDeDonnees["_mongoose"].model("parties-simples-array", this.schemaArray, "parties-simples");

        this.CreateSchemaBuffer();
        this.schemaBuffer.plugin(uniqueValidator);
        this.modelPartieBuffer = this.baseDeDonnees["_mongoose"].model("parties-simples", this.schemaBuffer, "parties-simples");
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
                type: Array,
            }
        });
    }

    private async traiterMessageErreur(partie: PartieSimpleInterface, errorMsg: string): Promise<void> {
        if (errorMsg === "") {
            this.getImageDiffAsArrays(partie);
        } else {
            this.socket.envoyerMessageErreurDifferences(this.messageErreurDiff);
        }

        await this.deleteImagesDirectory();
    }

    private async deleteImagesDirectory(): Promise<void> {
        const dir: string = "../Images";
        await fsx.remove(dir);
    }

    private async verifierErreurScript(child: ChildProcess, partie: PartieSimpleInterface): Promise<void> {
        let errorMsg: string = "";

        child.stderr.on("data", async (data: string) => {
            errorMsg = `${data}`;
            await this.traiterMessageErreur(partie, errorMsg);
        });
        child.stdout.on("data", async (data: string) => {
            await this.traiterMessageErreur(partie, errorMsg);
        });
    }

    private async genererImageMod(partie: PartieSimpleInterface): Promise<void> {
        const buffers: Array<Buffer> = [partie._image1, partie._image2];
        await this.addImagesToDirectory(buffers);

        const script: string = p.resolve("app/partieSimple/bmpdiff/bmpdiff");
        const imageOri1: string = p.resolve("../Images/image1.bmp");
        const imageOri2: string = p.resolve("../Images/image2.bmp");
        const imageMod: string = p.resolve("../Images/image3.bmp");
        const args: string[] = [imageOri1, imageOri2, imageMod];

        const child: ChildProcess = spawn(script, args);
        await this.verifierErreurScript(child, partie);
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
            await writeFilePromise("../Images/image" + i.toString() + ".bmp", Buffer.from(buf));
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

    private async getPartieSimple(partieID: String): Promise<PartieSimpleInterface> {
        const partieSimples: PartieSimpleInterface[] = [];
        await this.modelPartieArray.find()
            .then((parties: Document[]) => {
                for (const partie of parties) {
                    partieSimples.push(partie.toJSON());
                }
            });

        for (const partie of partieSimples) {
            if (partie._id.toString() === partieID) {
                return partie;
            }
        }

        return partieSimples[1];
    }

    private async getPartieSimpleByName(nomPartie: String): Promise<PartieSimpleInterface> {
        const partieSimples: PartieSimpleInterface[] = [];
        await this.modelPartieArray.find()
            .then((parties: Document[]) => {
                for (const partie of parties) {
                    partieSimples.push(partie.toJSON());
                }
            });

        for (const partie of partieSimples) {
            if (partie._nomPartie.toString() === nomPartie) {
                return partie;
            }
        }

        return partieSimples[1];
    }

    protected async enregistrerPartieSimple(diffArrays: Array<Array<string>>, partie: PartieSimpleInterface): Promise<void> {
        partie._imageDiff = diffArrays;
        const partieSimple: Document = new this.modelPartieBuffer(partie);
        await partieSimple.save(async (err: Error, data: Document) => {
            if (err !== null && err.name === "ValidationError") {
                this.socket.envoyerMessageErreurNom(this.messageErreurNom);
            } else {
                this.socket.envoyerPartieSimple(await this.getPartieSimpleByName(partie._nomPartie));
            }
        });
    }

    public getImageDiffAsArrays(partie: PartieSimpleInterface): void {
        const imageMod: string = p.resolve("../Images/image3.bmp.txt");
        const diffArrays: Array<Array<string>> = new Array<Array<string>>();
        const input: fs.ReadStream = fs.createReadStream(imageMod);
        const rl: ReadLine = require("readline").createInterface({
            input: input,
            terminal: false
        });

        let i: number = 0;
        let arrayDiff: Array<string> = new Array<string>();

        rl.on("line", async (line: string) => {
            if (line.startsWith("END")) {
                diffArrays.push(arrayDiff);
                await this.enregistrerPartieSimple(diffArrays, partie);
            } else if (i === 0) {
                arrayDiff = new Array<string>();
                i++;
            } else if (line.startsWith("DIFF")) {
                diffArrays.push(arrayDiff);
                arrayDiff = new Array<string>();
                i++;
            } else {
                arrayDiff.push(line.toString());
            }
        });
    }

    public async requeteAjouterPartieSimple(req: Request, res: Response): Promise<void> {
        try {
            await this.genererImageMod(req.body);

            if (!this.ajouterPartieFailed) {
                res.send(await this.getPartieSimpleByName(req.params.nomPartie));
            }
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
        res.send(await this.getPartieSimple(req.params.id));
    }
// tslint:disable-next-line:max-file-line-count
}
