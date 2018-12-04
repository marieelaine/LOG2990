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
import { DBPartieAbstract, Joueur } from "../../partie-DB/DB-partie-abstract";
import { PartieSimpleInterface } from "../../../../common/partie-simple-interface";
import * as uniqueValidator from "mongoose-unique-validator";

const FICHIER_DIFF_TXT: string = "image3.bmp.txt";
const IMAGE_1: string = "image1.bmp";
const IMAGE_2: string = "image2.bmp";
const IMAGE_3: string = "image3.bmp";
const SCRIPT_BMPDIFF: string = "./bmpdiff/bmpdiff";

@injectable()
export class DBPartieSimple extends DBPartieAbstract {

    protected listeChannelsMultijoueur: Map<string, number>;

    public constructor(@inject(Types.SocketServerService) private socket: SocketServerService) {

        super();

        this.listeChannelsMultijoueur = new Map();

        this.modelPartieArray = this.baseDeDonnees.mongoose.model("parties-simples-array", this.schemaArray, "parties-simples");
        this.modelPartieBuffer = this.baseDeDonnees.mongoose.model("parties-simples", this.schemaBuffer, "parties-simples");
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

    protected creerSchemaArray(): void {
        this.schemaArray = new Schema({
            _nomPartie: { type: String, required: true, unique: true },
            _tempsSolo: { type: Array, required: true },
            _tempsUnContreUn: { type: Array, required: true },
            _image1: { type: Array, required: true },
            _image2: { type: Array, required: true },
            _imageDiff: { type: Array }
        });
        this.schemaArray.plugin(uniqueValidator);
    }

    protected creerSchemaBuffer(): void {
        this.schemaBuffer = new Schema({
            _nomPartie: { type: String, required: true, unique: true },
            _tempsSolo: { type: Array, required: true },
            _tempsUnContreUn: { type: Array, required: true },
            _image1: { type: Buffer, required: true },
            _image2: { type: Buffer, required: true },
            _imageDiff: { type: Array }
        });
        this.schemaBuffer.plugin(uniqueValidator);
    }

    protected async verifierErreurScript(child: ChildProcess, partie: PartieSimpleInterface): Promise<void> {
        let errorMsg: string = constantes.STR_VIDE;

        child.stderr.on("data", async (data: string) => {
            errorMsg = `${data}`;
            await this.traiterMessageErreur(partie, errorMsg);
        });
        child.stdout.on("data", async (data: string) => {
            await this.traiterMessageErreur(partie, errorMsg);
        });
    }

    protected envoyerPartiesPretes(channelId: string): void {
        this.socket.envoyerPartiesSimplesChargees(channelId);
    }

    protected envoyerMeilleurTemps(joueur: Joueur, nomPartie: string, isSolo: boolean, temps: Array<Joueur>): void {
        for (let i: number = 0; i < temps.length; i++) {
            if (temps[i]._temps === joueur._temps) {
                this.socket.meilleurTemps(joueur, nomPartie, isSolo, ++i);
            }
        }
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

    private async traiterMessageErreur(partie: PartieSimpleInterface, errorMsg: string): Promise<void> {
        if (errorMsg === "") {
            this.getImageDiffAsArrays(partie);
        } else {
            this.socket.envoyerMessageErreurDifferences(constantes.ERREUR_DIFFERENCES);
        }

        await this.supprimerFichierImages();
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
                this.socket.envoyerPartieSimple(await this.getPartieByName(partie._nomPartie) as PartieSimpleInterface);
            }
        });
    }

    private getImageDiffAsArrays(partie: PartieSimpleInterface): void {
        const imageMod: string = p.resolve(constantes.INSIDE_IMAGES_DIRECTORY + FICHIER_DIFF_TXT);
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
        await this.ajouterImagesAuFichier(buffers);

        const script: string = p.resolve(SCRIPT_BMPDIFF);
        const imageOri1: string = p.resolve(constantes.INSIDE_IMAGES_DIRECTORY + IMAGE_1);
        const imageOri2: string = p.resolve(constantes.INSIDE_IMAGES_DIRECTORY + IMAGE_2);
        const imageMod: string = p.resolve(constantes.INSIDE_IMAGES_DIRECTORY + IMAGE_3);
        const args: string[] = [imageOri1, imageOri2, imageMod];

        const child: ChildProcess = execFile(script, args);
        await this.verifierErreurScript(child, partie);
    }

    private async ajouterImagesAuFichier(buffers: Array<Buffer>): Promise<void> {
        await this.creerFichierImages();
        const writeFilePromise: Function = util.promisify(fs.writeFile);
        let i: number = 1;
        for (const buf of buffers) {
            await writeFilePromise(constantes.IMAGES_DIRECTORY + "/image" + i.toString() + ".bmp", Buffer.from(buf));
            i++;
        }
    }
}
