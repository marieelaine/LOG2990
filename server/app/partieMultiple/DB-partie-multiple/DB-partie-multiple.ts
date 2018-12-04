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
import { DBPartieAbstract, Joueur } from "../../partie-DB/DB-partie-abstract";
import { PartieMultipleInterface } from "../../../../common/partie-multiple-interface";
import * as uniqueValidator from "mongoose-unique-validator";

const imagePOV1: number = 1;
const imagePOV2: number = 2;
const MODEL_ARRAY: string = "parties-multiples-array";
const MODEL_BUFFER: string = "parties-multiples";
const NOM_COLLECTION: string = "parties-multiples";
const EVENT_TYPE: string = "data";
const EVENT_SUCCES: string = "Succes\n";
const EVENT_ERREUR: string = "Erreur\n";

const NOM_IMAGE_ORI_VUE1: string = "n_a_ori.bmp";
const NOM_IMAGE_ORI_VUE2: string = "n_b_ori.bmp";
const NOM_IMAGE_MOD_VUE1: string = "n_a_mod.bmp";
const NOM_IMAGE_MOD_VUE2: string = "n_b_mod.bmp";
const NOM_FICHER_DIFF_TXT: string = "n_a_diff.bmp.txt";
const NOM_FICHER_DIFF2_TXT: string = "n_b_diff.bmp.txt";

const PATH_GENMULTI: string = "./genmulti/genmulti";
const PATH_IMAGE: string = "../Images/n";

const EOF_FICHIER_DIFF: string = "END";
const DEBUT_DIFF: string = "DIFF";
const READLINE_ID: string = "readline";
const LECTURE_TYPE: string = "line";

@injectable()
export class DBPartieMultiple extends DBPartieAbstract {

    protected listeChannelsMultijoueur: Map<string, number>;

    public constructor(@inject(Types.SocketServerService) private socket: SocketServerService) {

        super();

        this.listeChannelsMultijoueur = new Map();

        this.modelPartieBuffer = this.baseDeDonnees.mongoose.model(MODEL_BUFFER, this.schemaBuffer, NOM_COLLECTION);
        this.modelPartieArray = this.baseDeDonnees.mongoose.model(MODEL_ARRAY, this.schemaArray, NOM_COLLECTION);
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
            this.socket.supprimerPartieMultiple(req.params.id);
            res.status(constantes.HTTP_CREATED);
        } catch (err) {
            res.status(constantes.HTTP_NOT_IMPLEMENTED).json(err);
        }
    }

    protected creerSchemaBuffer(): void {
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
            this.schemaBuffer.plugin(uniqueValidator);
        }

    protected creerSchemaArray(): void {
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
        this.schemaArray.plugin(uniqueValidator);
    }

    protected envoyerPartiesPretes(channelId: string): void {
        this.socket.envoyerPartiesMultiplesChargees(channelId);
    }

    protected envoyerMeilleurTemps(joueur: Joueur, nomPartie: string, isSolo: boolean, temps: Array<Joueur>): void {
        for (let i: number = 0; i < temps.length; i++) {
            if (temps[i]._temps === joueur._temps) {
                this.socket.meilleurTemps(joueur, nomPartie, isSolo, ++i);
            }
        }
    }

    protected async verifierErreurScript(child: ChildProcess, partie: PartieMultipleInterface): Promise<void> {
        let errorMsg: string = constantes.STR_VIDE;

        child.stderr.on(EVENT_TYPE, async (data: string) => {
            if (data === EVENT_ERREUR) {
                errorMsg = `${data}`;
                await this.ajouterImagesPartieMultiple(partie, errorMsg);
            }
        });
        child.stdout.on(EVENT_TYPE, async (data: string) => {
            if (data === EVENT_SUCCES) {
                await this.ajouterImagesPartieMultiple(partie, errorMsg);
            }
        });
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

    private async ajouterImagesPartieMultiple(partie: PartieMultipleInterface, errorMsg: string):
    Promise<void> {
        if (errorMsg === "") {
            partie._image1PV1 = await this.getImageDiffAsBuffer(constantes.INSIDE_IMAGES_DIRECTORY + NOM_IMAGE_ORI_VUE1);
            partie._image2PV1 = await this.getImageDiffAsBuffer(constantes.INSIDE_IMAGES_DIRECTORY + NOM_IMAGE_ORI_VUE2);
            partie._image1PV2 = await this.getImageDiffAsBuffer(constantes.INSIDE_IMAGES_DIRECTORY + NOM_IMAGE_MOD_VUE1);
            partie._image2PV2 = await this.getImageDiffAsBuffer(constantes.INSIDE_IMAGES_DIRECTORY + NOM_IMAGE_MOD_VUE2);
            this.getImageDiffTextFile(constantes.INSIDE_IMAGES_DIRECTORY + NOM_FICHER_DIFF_TXT, partie, imagePOV1);

        } else {
            this.socket.envoyerMessageErreurDifferences(constantes.ERREUR_SCENE);
        }
    }

    private async setImageDiff(diffArrays: Array<Array<string>>, partie: PartieMultipleInterface, imgNumber: number): Promise<void> {
        if (imgNumber === imagePOV1) {
            partie._imageDiff1 = diffArrays;
            this.getImageDiffTextFile(constantes.INSIDE_IMAGES_DIRECTORY + NOM_FICHER_DIFF2_TXT, partie, imagePOV2);
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
        await this.creerFichierImages();
        const script: string = p.resolve(PATH_GENMULTI);
        const args: string[] = [partie._theme, String(partie._quantiteObjets), partie._typeModification, PATH_IMAGE];
        const child: ChildProcess = execFile(script, args);
        await this.verifierErreurScript(child, partie);
    }

    private async enregistrerPartieMultiple(partie: PartieMultipleInterface): Promise<void> {
        const partieMultiple: Document = new this.modelPartieBuffer(partie);
        partieMultiple["_tempsSolo"] = this.getSortedTimes(partieMultiple["_tempsSolo"]);
        partieMultiple["_tempsUnContreUn"] = this.getSortedTimes(partieMultiple["_tempsUnContreUn"]);
        await partieMultiple.save(async (err: Error) => {
            if (err !== null && err.name === constantes.ERREUR_UNIQUE) {
                this.socket.envoyerMessageErreurNom(constantes.ERREUR_NOM_PRIS);
            } else {
                this.socket.envoyerPartieMultiple(await this.getPartieByName(partie._nomPartie) as PartieMultipleInterface);
            }
        });
        await this.supprimerFichierImages();
    }

    private getImageDiffTextFile(nomFichier: string, partie: PartieMultipleInterface, imgNumber: number): void {
        const imageMod: string = p.resolve(nomFichier);
        const diffArrays: Array<Array<string>> = new Array<Array<string>>();
        const input: fs.ReadStream = fs.createReadStream(imageMod);
        const rl: ReadLine = require(READLINE_ID).createInterface({
            input: input,
            terminal: false
        });
        let i: number = 0;
        let arrayDiff: Array<string> = new Array<string>();

        rl.on(LECTURE_TYPE, async (line: string) => {
            if (line.startsWith(EOF_FICHIER_DIFF)) {
                diffArrays.push(arrayDiff);
                await this.setImageDiff(diffArrays, partie, imgNumber);
            } else if (i === 0) {
                arrayDiff = new Array<string>();
                i++;
            } else if (line.startsWith(DEBUT_DIFF)) {
                diffArrays.push(arrayDiff);
                arrayDiff = new Array<string>();
                i++;
            } else {
                arrayDiff.push(line.toString());
            }
        });
    }
}
