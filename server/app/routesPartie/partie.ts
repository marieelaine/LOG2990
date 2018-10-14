import { Schema, Model, Document } from "mongoose";
import { Request, Response} from "express";
import { RouteBaseDeDonnees } from "../routesBaseDeDonnees/baseDeDonnees";
import uniqueValidator = require("mongoose-unique-validator");
import "reflect-metadata";
import { injectable } from "inversify";

interface ImageInterface {
    _id: string;
    _imageName: string;
}

export module RouteImage {
    @injectable()
    export class Image {

        private baseDeDonnees: RouteBaseDeDonnees.BaseDeDonnees;
        private modelImage: Model<Document>;
        private schema: Schema;

        public constructor() {
            this.baseDeDonnees = new RouteBaseDeDonnees.BaseDeDonnees();
            this.schema = new Schema({
                _ImageName: {
                    type: String,
                    required: true,
                    unique: true
                }
            });
            this.schema.plugin(uniqueValidator);
            this.modelImage = this.baseDeDonnees.mongoose.model("images", this.schema);
        }

        private async ajouterImage(im: {}, res: Response): Promise<Response> {
            const image: Document = new this.modelImage(im);
            try {
                await image.save();

                return res.status(201).json(im);
            } catch (err) {
                return res.status(501).json(err);
            }
        }

        private async deleteImage(imageName: String, res: Response): Promise<Response> {
            const imageId: String = await this.obtenirImageId(imageName);
            try {
                await this.modelImage.findByIdAndRemove(imageId);

                return res.status(201).json();
            } catch (err) {
            return res.status(501).json(err);
            }
        }

        private async obtenirImageId(imageName: String): Promise<String> {
            const images: ImageInterface[] = [];
            await this.modelImage.find()
                .then((res: Document[]) => {
                    for (const image of res) {
                        images.push(image.toObject());
                    }
                });

            for (const image of images) {
                if (image._imageName === imageName) {
                    return image._id;
                }
            }

            // Change the return.
            return images[0]._id;
        }

        public async requeteAjouterImage(req: Request, res: Response): Promise<void> {
            res.send(await this.ajouterImage(req.body, res));
        }

        public async requeteImageId(req: Request, res: Response): Promise<void> {
            res.send(await this.obtenirImageId(req.params.id));
        }

        public async requeteDeleteImage(req: Request, res: Response): Promise<void> {
            res.send(await this.deleteImage(req.params.id, res));
        }
    }
}
