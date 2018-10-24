import * as fs from "fs";
import * as fsx from "fs-extra";
import * as util from "util";
import { Schema, Model, Document } from "mongoose";
import { Request, Response} from "express";
import { RouteBaseDeDonnees } from "../routesBaseDeDonnees/baseDeDonnees";
import uniqueValidator = require("mongoose-unique-validator");
import "reflect-metadata";
import { injectable } from "inversify";
// import { PartieSimple } from "../../../client/src/app/admin/dialog-simple/partie-simple";

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
export class RoutePartieSimple {

    private baseDeDonnees: RouteBaseDeDonnees.BaseDeDonnees;
    private modelPartie: Model<Document>;
    private schema: Schema;

    public constructor() {
        this.baseDeDonnees = new RouteBaseDeDonnees.BaseDeDonnees();
        this.CreateSchema();

        this.schema.plugin(uniqueValidator);
        this.modelPartie = this.baseDeDonnees.mongoose.model("parties-simples", this.schema);
    }

    private CreateSchema(): void {
            this.schema = new Schema({
                _nomPartie: {
                    type: String,
                    required: true,
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
                    type: Buffer,
                }
            });
        }

    private async ajouterPartieSimple(partie: PartieSimpleInterface, res: Response): Promise<string> {
        const buffers: Array<Buffer> = [partie._image1, partie._image2];
        partie._imageDiff = await this.getImageDiffAsBuffer(buffers);

        const image: Document = new this.modelPartie(partie);
        await image.save();

        return this.obtenirPartieSimpleId(partie._nomPartie);
    }

    private async getImageDiffAsBuffer(buffers: Array<Buffer>): Promise<Buffer> {
        await this.generateImageDiff(buffers);

        return new Buffer("");
    }

    // private convertImageToBuffer(image: File): Buffer {
    //     return new Buffer("");
    // }

    private async generateImageDiff(buffers: Array<Buffer>): Promise<void> {
        await this.addImagesToDirectory(buffers);
        // Runner le script
    }

    private async addImagesToDirectory(buffers: Array<Buffer>): Promise<void> {
        await this.makeImagesDirectory();
        const writeFilePromise: Function = util.promisify(fs.writeFile);
        let i: number = 1;
        for (const buf of buffers) {
            await writeFilePromise("Images/image" + i.toString() + ".bmp", new Buffer(buf));
            i++;
        }
    }

    private async makeImagesDirectory(): Promise<void> {
        const dir: string = "Images";
        const mkdirPromise: Function = util.promisify(fs.mkdir);
        const existsPromise: Function = util.promisify(fs.exists);

        if (await existsPromise(dir)) {
            await fsx.remove(dir);
        }

        await mkdirPromise(dir);
    }

    private async deletePartieSimple(nomPartie: String, res: Response): Promise<Response> {
        const imageId: String = await this.obtenirPartieSimpleId(nomPartie);
        try {
            await this.modelPartie.findOneAndDelete(imageId).catch(() => {
                throw new Error();
            });

            return res.status(201);
        } catch (err) {
            return res.status(501).json(err);
        }
    }

    private async obtenirPartieSimpleId(nomPartie: String): Promise<string> {
        const partieSimples: PartieSimpleInterface[] = [];
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

    private async getListePartie(): Promise<PartieSimpleInterface[]> {
        const listeParties: PartieSimpleInterface[] = [];
        await this.modelPartie.find()
            .then((res: Document[]) => {
                for (const partie of res) {
                    listeParties.push(partie.toJSON());
                }
            });

        return listeParties;
    }

    private async getPartieSimple(partieID: String, res: Response): Promise<PartieSimpleInterface> {
        const partieSimples: PartieSimpleInterface[] = [];
        await this.modelPartie.find()
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
        return partieSimples[0];
    }

    public async requeteAjouterPartieSimple(req: Request, res: Response): Promise<void> {
        try {
            const partieId: string = await this.ajouterPartieSimple(req.body, res);
            res.status(201).json(partieId);
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

    public async requeteGetPartieSimple(req: Request, res: Response): Promise<void> {
        await this.baseDeDonnees.assurerConnection();
        res.send(await this.getPartieSimple(req.params.id, res));
    }

}
