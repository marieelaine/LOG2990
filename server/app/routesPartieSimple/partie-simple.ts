import { Schema, Model, Document } from "mongoose";
import { Request, Response} from "express";
import { RouteBaseDeDonnees } from "../routesBaseDeDonnees/baseDeDonnees";
import uniqueValidator = require("mongoose-unique-validator");
import "reflect-metadata";
import { injectable } from "inversify";

interface PartieSimpleInterface {
    _id: string;
    _nomPartie: string;
    _tempsSolo: Array<number>;
    _tempsUnContreUn: Array<number>;
    _image1: Array<ArrayBuffer>;
    _image2: Array<ArrayBuffer>;
}

export module RoutePartieSimple {
    @injectable()
    export class PartieSimple {

        private baseDeDonnees: RouteBaseDeDonnees.BaseDeDonnees;
        private modelImage: Model<Document>;
        private schema: Schema;

        public constructor() {
            this.baseDeDonnees = new RouteBaseDeDonnees.BaseDeDonnees();
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
                }
            });
            this.schema.plugin(uniqueValidator);
            this.modelImage = this.baseDeDonnees.mongoose.model("parties-simples", this.schema);
        }

        private async ajouterPartieSimple(partie: {}, res: Response): Promise<Response> {
            const image: Document = new this.modelImage(partie);
            try {
                await image.save();

                return res.status(201).json(partie);
            } catch (err) {
                return res.status(501).json(err);
            }
        }

        private async deletePartieSimple(nomPartie: String, res: Response): Promise<Response> {
            const imageId: String = await this.obtenirPartieSimpleId(nomPartie);
            try {
                await this.modelImage.findByIdAndRemove(imageId);

                return res.status(201).json();
            } catch (err) {
            return res.status(501).json(err);
            }
        }

        private async obtenirPartieSimpleId(nomPartie: String): Promise<String> {
            const partieSimples: PartieSimpleInterface[] = [];
            await this.modelImage.find()
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

        public async requeteAjouterPartieSimple(req: Request, res: Response): Promise<void> {
            res.send(await this.ajouterPartieSimple(req.body, res));
        }

        public async requetePartieSimpleId(req: Request, res: Response): Promise<void> {
            res.send(await this.obtenirPartieSimpleId(req.params.id));
        }

        public async requeteDeletePartieSimple(req: Request, res: Response): Promise<void> {
            res.send(await this.deletePartieSimple(req.params.id, res));
        }
    }
}
