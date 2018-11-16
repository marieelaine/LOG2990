import * as p from "path";
import * as fs from "fs";
import * as util from "util";
import * as constantes from "../../constantes";
import { Schema, Document } from "mongoose";
import { Request, Response} from "express";
import "reflect-metadata";
import { injectable, inject } from "inversify";
import { execFile, ChildProcess } from "child_process";
import { SocketServerService } from "../../socket-io.service";
import Types from "../../types";
import { ReadLine } from "readline";
import { DBPartieAbstract, TempsUser } from "../../partie-DB/DB-partie-abstract";

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

const imagePOV1: number = 1;
const imagePOV2: number = 2;

@injectable()
export class DBPartieMultiple extends DBPartieAbstract {

    public constructor(@inject(Types.SocketServerService) private socket: SocketServerService) {

        super();

        this.modelPartieBuffer = this.baseDeDonnees.mongoose.model("parties-multiples", this.schemaBuffer, "parties-multiples");

        this.modelPartieArray = this.baseDeDonnees.mongoose.model("parties-multiples-array", this.schemaArray, "parties-multiples");

    }

    public async requeteAjouterPartie(req: Request, res: Response): Promise<void> {
        try {
            await this.genererScene(req.body);
            res.status(constantes.HTTP_CREATED).json(this.getPartieByName(req.params.nomPartie));
        } catch (err) {
            res.status(constantes.HTTP_NOT_IMPLEMENTED).json(err);
        }
    }

    public async requeteDeletePartie(req: Request, res: Response): Promise<void> {
        try {
            await this.deletePartie(req.params.id, res);
            // TODO : this.socket.supprimerPartieMultiple(req.params.id);
            res.status(constantes.HTTP_CREATED);
        } catch (err) {
            res.status(constantes.HTTP_NOT_IMPLEMENTED).json(err);
        }
    }

    protected CreateSchemaBuffer(): void {
            this.schemaBuffer = new Schema({
                _nomPartie: { type: String, required: true, unique: true, },
                _tempsSolo: { type: Array, required: true, },
                _tempsUnContreUn: { type: Array, required: true, },
                _image1PV1: { type: Buffer, required: true, },
                _image1PV2: { type: Buffer, required: true, },
                _image2PV1: { type: Buffer, required: true, },
                _image2PV2: { type: Buffer, required: true, },
                _imageDiff1: { type: Array },
                _imageDiff2: {type: Array },
                _quantiteObjets: { type: Number, required: true },
                _typeModification: { type: String, required: true },
                _theme: { type: String, required: true }
            });
        }

    protected CreateSchemaArray(): void {
        this.schemaArray = new Schema({
            _nomPartie: { type: String, required: true, unique: true, },
            _tempsSolo: { type: Array, required: true, },
            _tempsUnContreUn: { type: Array, required: true, },
            _image1PV1: { type: Array, required: true, },
            _image1PV2: { type: Array, required: true, },
            _image2PV1: { type: Array, required: true, },
            _image2PV2: { type: Array, required: true, },
            _imageDiff1: { type: Array },
            _imageDiff2: {type: Array },
            _quantiteObjets: { type: Number, required: true },
            _typeModification: { type: String, required: true },
            _theme: { type: String, required: true }
        });
    }

    protected async verifierErreurScript(child: ChildProcess, partie: PartieMultipleInterface): Promise<void> {
        let errorMsg: string = "";

        child.stderr.on("data", async (data: string) => {
            if (data === "Erreur\n") {
                errorMsg = `${data}`;
                await this.ajouterImagesPartieMultiple(partie, errorMsg);
            }
        });
        child.stdout.on("data", async (data: string) => {
            if (data === "Succes\n") {
                await this.ajouterImagesPartieMultiple(partie, errorMsg);
            }
        });
    }

    protected async deletePartie(idPartie: string, res: Response): Promise<Response> {
        try {
            await this.modelPartieBuffer.findOneAndRemove(this.modelPartieBuffer.findById(idPartie)).catch(() => {
                throw new Error();
            });

            return res.status(constantes.HTTP_CREATED);
        } catch (err) {

            return res.status(constantes.HTTP_NOT_IMPLEMENTED).json(err);
        }
    }

    protected async getListePartie(): Promise<PartieMultipleInterface[]> {
        const listeParties: PartieMultipleInterface[] = [];

        await this.modelPartieArray.find()
            .then((res: Document[]) => {
                for (const partie of res) {
                    listeParties.push(partie.toJSON());
                }
            });

        return listeParties;
    }

    protected async obtenirPartieId(nomPartie: String): Promise<string> {
        const partieMultiple: PartieMultipleInterface[] = [];
        await this.modelPartieBuffer.find()
            .then((res: Document[]) => {
                for (const partie of res) {
                    partieMultiple.push(partie.toObject());
                }
            });

        for (const partieSimple of partieMultiple) {
            if (partieSimple._nomPartie === nomPartie) {
                return partieSimple._id;
            }
        }

        return partieMultiple[0]._id;
    }

    protected async getPartieById(partieID: String): Promise<PartieMultipleInterface> {
        const partieMultiple: PartieMultipleInterface[] = [];
        await this.modelPartieArray.find()
            .then((parties: Document[]) => {
                for (const partie of parties) {
                    partieMultiple.push(partie.toJSON());
                }
            });

        for (const partie of partieMultiple) {
            if (partie._id.toString() === partieID) {
                return partie;
            }
        }

        return partieMultiple[1];
    }

    protected async getPartieByName(nomPartie: String): Promise<PartieMultipleInterface> {
        const partieMultiple: PartieMultipleInterface[] = [];
        await this.modelPartieArray.find()
            .then((parties: Document[]) => {
                for (const partie of parties) {
                    partieMultiple.push(partie.toJSON());
                }
            });

        for (const partie of partieMultiple) {
            if (partie._nomPartie.toString() === nomPartie) {
                return partie;
            }
        }

        return partieMultiple[1];
    }

    protected async reinitialiserTemps(idPartie: String, tempsSolo: Array<TempsUser>, tempsUnContreUn: Array<TempsUser>): Promise<void> {
        tempsSolo = this.getSortedTimes(tempsSolo);
        tempsUnContreUn = this.getSortedTimes(tempsUnContreUn);
        await this.modelPartieBuffer.findByIdAndUpdate(idPartie, { _tempsSolo: tempsSolo, _tempsUnContreUn: tempsUnContreUn })
            .catch(() => { throw new Error(); });
    }

    private async ajouterImagesPartieMultiple(partie: PartieMultipleInterface, errorMsg: string):
    Promise<void> {
        if (errorMsg === "") {
            partie._image1PV1 = await this.getImageDiffAsBuffer(constantes.INSIDE_IMAGES_DIRECTORY + "n_a_ori.bmp");
            partie._image2PV1 = await this.getImageDiffAsBuffer(constantes.INSIDE_IMAGES_DIRECTORY + "n_b_ori.bmp");
            partie._image1PV2 = await this.getImageDiffAsBuffer(constantes.INSIDE_IMAGES_DIRECTORY + "n_a_mod.bmp");
            partie._image2PV2 = await this.getImageDiffAsBuffer(constantes.INSIDE_IMAGES_DIRECTORY + "n_b_mod.bmp");
            this.getImageDiffTextFile(constantes.INSIDE_IMAGES_DIRECTORY + "n_a_diff.bmp.txt", partie, 1);

        } else {
            this.socket.envoyerMessageErreurDifferences(constantes.ERREUR_SCENE);
        }
    }

    private async setImageDiff(diffArrays: Array<Array<string>>, partie: PartieMultipleInterface, imgNumber: number): Promise<void> {
        if (imgNumber === imagePOV1) {
            partie._imageDiff1 = diffArrays;
            this.getImageDiffTextFile(constantes.INSIDE_IMAGES_DIRECTORY + "n_b_diff.bmp.txt", partie, imagePOV2);
        } else {
            partie._imageDiff2 = diffArrays;
            await this.enregistrerPartieMultiple(partie);
        }
    }

    private async getImageDiffAsBuffer(filename: string): Promise<Buffer> {
        const imageMod: string = p.resolve(filename);
        const readFilePromise: Function = util.promisify(fs.readFile);

        return await readFilePromise(imageMod) as Buffer;
    }

    private async genererScene(partie: PartieMultipleInterface): Promise<void> {
        await this.makeImagesDirectory();
        const script: string = p.resolve("./genmulti/genmulti");
        const args: string[] = [partie._theme, String(partie._quantiteObjets), partie._typeModification, "../Images/n"];
        const child: ChildProcess = execFile(script, args);
        await this.verifierErreurScript(child, partie);
    }

    private async enregistrerPartieMultiple(partie: PartieMultipleInterface): Promise<void> {
        const partieMultiple: Document = new this.modelPartieBuffer(partie);
        await partieMultiple.save(async (err: Error) => {
            if (err !== null && err.name === constantes.ERREUR_UNIQUE) {
                this.socket.envoyerMessageErreurNom(constantes.ERREUR_NOM_PRIS);
            } else {
                this.socket.envoyerPartieMultiple(await this.getPartieByName(partie._nomPartie));
            }
        });
        await this.deleteImagesDirectory();
    }

    private getImageDiffTextFile(nomFichier: string, partie: PartieMultipleInterface, imgNumber: number): void {
        const imageMod: string = p.resolve(nomFichier);
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
                await this.setImageDiff(diffArrays, partie, imgNumber);
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
}
