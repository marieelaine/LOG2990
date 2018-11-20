import * as fs from "fs";
import * as util from "util";
import * as p from "path";
import { ChildProcess, execFile } from "child_process";
import { Schema, Document } from "mongoose";
import { Request, Response} from "express";
import "reflect-metadata";
import { ReadLine } from "readline";
import { injectable, inject } from "inversify";
import { SocketServerService } from "../../socket-io.service";
import Types from "../../types";
import * as constantes from "../../constantes";
import { DBPartieAbstract, TempsUser } from "../../partie-DB/DB-partie-abstract";

const PARTIE_SECOND_ELEMENT: number = 2;

export interface PartieSimpleInterface {
    _id: string;
    _nomPartie: string;
    _tempsSolo: Array<TempsUser>;
    _tempsUnContreUn: Array<TempsUser>;
    _image1: Buffer;
    _image2: Buffer;
    _imageDiff: Array<Array<string>>;
}

@injectable()
export class DBPartieSimple extends DBPartieAbstract {

    protected listeChannelsMultijoueur: string[];

    public constructor(@inject(Types.SocketServerService) private socket: SocketServerService) {

        super();

        this.listeChannelsMultijoueur = [];

        this.modelPartieArray = this.baseDeDonnees["_mongoose"].model("parties-simples-array", this.schemaArray, "parties-simples");
        this.modelPartieBuffer = this.baseDeDonnees["_mongoose"].model("parties-simples", this.schemaBuffer, "parties-simples");
    }

    public async requeteAjouterPartie(req: Request, res: Response): Promise<void> {
        try {
            await this.genererImageMod(req.body);
            res.status(constantes.HTTP_CREATED).json(await this.getPartieByName(req.params.nomPartie));
        } catch (err) {
            res.status(constantes.HTTP_NOT_IMPLEMENTED).json(err);
        }
    }

    public async requeteDeletePartie(req: Request, res: Response): Promise<void> {
        try {
            await this.deletePartie(req.params.id, res);
            this.socket.supprimerPartieSimple(req.params.id);
            res.status(constantes.HTTP_CREATED);
        } catch (err) {
            res.status(constantes.HTTP_NOT_IMPLEMENTED).json(err);
        }
    }

    public requeteEnvoyerDiffTrouveeSimple(req: Request, res: Response): void {
        try {
            this.socket.envoyerDiffPartieSimple(req.body.channelId, req.body.diff, req.body.joueur);
            res.status(constantes.HTTP_CREATED).json(req.body.channelId);
        } catch (err) {
            res.status(constantes.HTTP_NOT_IMPLEMENTED).json(err);
        }
    }

    public requeteEnvoyerJoindreSimple(req: Request, res: Response): void {
        try {
            this.socket.envoyerJoindreSimple(req.body.partieId, req.body.channelId);
            res.status(constantes.HTTP_CREATED).json(req.body.channelId);
        } catch (err) {
            res.status(constantes.HTTP_NOT_IMPLEMENTED).json(err);
        }
    }

    public requeteEnvoyerPartieSimpleTerminee(req: Request, res: Response): void {
        try {
            this.socket.envoyerPartieSimpleTerminee(req.body.channelId, req.body.joueur);
            res.status(constantes.HTTP_CREATED).json(req.body.channelId);
        } catch (err) {
            res.status(constantes.HTTP_NOT_IMPLEMENTED).json(err);
        }
    }

    public requeteErreurSimple(req: Request, res: Response): void {
        try {
            this.socket.erreurSimple(req.body.channelId, req.body.joueur, req.body.ev);
            res.status(constantes.HTTP_CREATED).json(req.body.channelId);
        } catch (err) {
            res.status(constantes.HTTP_NOT_IMPLEMENTED).json(err);
        }
    }

    protected CreateSchemaArray(): void {
        this.schemaArray = new Schema({
            _nomPartie: { type: String, required: true, unique: true },
            _tempsSolo: { type: Array, required: true },
            _tempsUnContreUn: { type: Array, required: true },
            _image1: { type: Array, required: true },
            _image2: { type: Array, required: true },
            _imageDiff: { type: Array }
        });
    }

    protected CreateSchemaBuffer(): void {
        this.schemaBuffer = new Schema({
            _nomPartie: { type: String, required: true, unique: true },
            _tempsSolo: { type: Array, required: true },
            _tempsUnContreUn: { type: Array, required: true },
            _image1: { type: Buffer, required: true },
            _image2: { type: Buffer, required: true },
            _imageDiff: { type: Array }
        });
    }

    protected async verifierErreurScript(child: ChildProcess, partie: PartieSimpleInterface): Promise<void> {
        let errorMsg: string = "";

        child.stderr.on("data", async (data: string) => {
            errorMsg = `${data}`;
            await this.traiterMessageErreur(partie, errorMsg);
        });
        child.stdout.on("data", async (data: string) => {
            await this.traiterMessageErreur(partie, errorMsg);
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

    protected async getListePartie(): Promise<PartieSimpleInterface[]> {
        const listeParties: PartieSimpleInterface[] = [];

        await this.modelPartieArray.find()
            .then((res: Document[]) => {
                for (const partie of res) {
                    listeParties.push(partie.toJSON());
                }
            });

        return listeParties;
    }

    protected async obtenirPartieId(nomPartie: String): Promise<string> {
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

    protected async getPartieById(partieID: String): Promise<PartieSimpleInterface> {
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

    protected async getPartieByName(nomPartie: String): Promise<PartieSimpleInterface> {
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

    protected async reinitialiserTemps(idPartie: String, tempsSolo: Array<TempsUser>, tempsUnContreUn: Array<TempsUser>): Promise<void> {
        tempsSolo = this.getSortedTimes(tempsSolo);
        tempsUnContreUn = this.getSortedTimes(tempsUnContreUn);
        await this.modelPartieBuffer.findByIdAndUpdate(idPartie, { _tempsSolo: tempsSolo, _tempsUnContreUn: tempsUnContreUn })
                                    .catch(() => { throw new Error(); });
    }

    protected async ajouterTemps(idPartie: string, temps: TempsUser, isSolo: boolean): Promise<void> {
        const partie: PartieSimpleInterface = await this.getPartieById(idPartie) as PartieSimpleInterface;
        if (temps._user === "") {
            temps._user = "Anonyme";
        }
        if (isSolo) {
            if (temps._temps < partie["_tempsSolo"][PARTIE_SECOND_ELEMENT]["_temps"]) {
                partie["_tempsSolo"].splice(-1, 1);
                partie["_tempsSolo"].push(temps);
            }
        } else {
            if (temps._temps < partie["_tempsUnContreUn"][PARTIE_SECOND_ELEMENT]["_temps"]) {
                partie["_tempsUnContreUn"].splice(-1, 1);
                partie["_tempsUnContreUn"].push(temps);
            }
        }
        await this.reinitialiserTemps(idPartie, partie["_tempsSolo"], partie["_tempsUnContreUn"]);
    }
    private async traiterMessageErreur(partie: PartieSimpleInterface, errorMsg: string): Promise<void> {
        if (errorMsg === "") {
            this.getImageDiffAsArrays(partie);
        } else {
            this.socket.envoyerMessageErreurDifferences(constantes.ERREUR_DIFFERENCES);
        }

        await this.deleteImagesDirectory();
    }

    private async enregistrerPartieSimple(diffArrays: Array<Array<string>>, partie: PartieSimpleInterface): Promise<void> {
        partie._imageDiff = diffArrays;
        const partieSimple: Document = new this.modelPartieBuffer(partie);
        partieSimple["_tempsSolo"] = this.getSortedTimes(partieSimple["_tempsSolo"]);
        partieSimple["_tempsUnContreUn"] = this.getSortedTimes(partieSimple["_tempsUnContreUn"]);
        await partieSimple.save(async (err: Error, data: Document) => {
            if (err !== null && err.name === constantes.ERREUR_UNIQUE) {
                this.socket.envoyerMessageErreurNom(constantes.ERREUR_NOM_PRIS);
            } else {
                this.socket.envoyerPartieSimple(await this.getPartieByName(partie._nomPartie));
            }
        });
    }

    private getImageDiffAsArrays(partie: PartieSimpleInterface): void {
        const imageMod: string = p.resolve(constantes.INSIDE_IMAGES_DIRECTORY + "image3.bmp.txt");
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

    private async genererImageMod(partie: PartieSimpleInterface): Promise<void> {
        const buffers: Array<Buffer> = [partie._image1, partie._image2];
        await this.addImagesToDirectory(buffers);

        const script: string = p.resolve("./bmpdiff/bmpdiff");
        const imageOri1: string = p.resolve(constantes.INSIDE_IMAGES_DIRECTORY + "image1.bmp");
        const imageOri2: string = p.resolve(constantes.INSIDE_IMAGES_DIRECTORY + "image2.bmp");
        const imageMod: string = p.resolve(constantes.INSIDE_IMAGES_DIRECTORY + "image3.bmp");
        const args: string[] = [imageOri1, imageOri2, imageMod];

        const child: ChildProcess = execFile(script, args);
        await this.verifierErreurScript(child, partie);
    }

    private async addImagesToDirectory(buffers: Array<Buffer>): Promise<void> {
        await this.makeImagesDirectory();
        const writeFilePromise: Function = util.promisify(fs.writeFile);
        let i: number = 1;
        for (const buf of buffers) {
            await writeFilePromise(constantes.IMAGES_DIRECTORY + "/image" + i.toString() + ".bmp", Buffer.from(buf));
            i++;
        }
    }
}
