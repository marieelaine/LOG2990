import { injectable } from "inversify";
import "reflect-metadata";
import { Request, Response} from "express";
import { Mongoose, Model, Document, Schema } from "mongoose";
import uniqueValidator = require("mongoose-unique-validator");
import {User} from "../../../client/src/app/vue-initiale/login-form/user";

export module RouteBaseDeDonnees {
    @injectable()
    export class BaseDeDonnees {

        private mongoose: Mongoose;
        private readonly mongoURL: string = "mongodb://admin:admin1@ds239692.mlab.com:39692/log2990-05";
        private modelUser: Model<Document>;
        private schema: Schema;

        public constructor() {
            this.mongoose = new Mongoose();
            this.mongoose.set("useCreateIndex", true);
            this.schema = new Schema({
                // _id : String,
                _username: {
                    type: String,
                    required: true,
                    unique: true
                }
            });
            this.schema.plugin(uniqueValidator);
            this.modelUser = this.mongoose.model("users", this.schema);
            this.seConnecter();
        }

        private async seConnecter(): Promise<void> {
            await this.mongoose.connect(this.mongoURL, { useNewUrlParser: true });
        }

        private async ajouterUser(user: {}, res: Response): Promise<Response> {
            const usager: Document = new this.modelUser(user);
            // tslint:disable-next-line:no-console
            console.log(usager);
            try {
                await usager.save();

                // tslint:disable-next-line:no-magic-numbers
                return res.status(201).json(usager);
              } catch (err) {
                // tslint:disable-next-line:no-magic-numbers
                return res.status(501).json(err);
            }
        }

        private async deleteUser(username: String, res: Response): Promise<Response> {
            const userId: String = this.obtenirUserId(username)["id"];
            // tslint:disable-next-line:no-console
            console.log(userId);
            try {
                await this.modelUser.findByIdAndDelete(userId);

                // tslint:disable-next-line:no-magic-numbers
                return res.status(201).json();
            } catch (err) {
            // tslint:disable-next-line:no-magic-numbers
            return res.status(501).json(err);
            }

            // tslint:disable-next-line:no-magic-numbers
            return res.status(201).json();
        }

        private async obtenirUserId(username: String): Promise<String> {
            const usager: User = await this.modelUser.findOne(username)
                .then((res: Document) => res.toObject())
                // tslint:disable-next-line:no-empty
                .catch(() => {});

            return usager.id;

        }

        public async requeteAjouterUser(req: Request, res: Response): Promise<void> {
            res.send(await this.ajouterUser(req.body, res));
        }

        public async requeteUserId(req: Request, res: Response): Promise<void> {
            res.send(await this.obtenirUserId(req.params.id));
        }

        public async requeteDeleteUser(req: Request, res: Response): Promise<void> {
            res.send(await this.deleteUser(req.body, res));
        }

    }
}
