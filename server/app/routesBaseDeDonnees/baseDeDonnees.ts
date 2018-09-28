import { injectable } from "inversify";
import "reflect-metadata";
import { Request, Response} from "express";
import { Mongoose, Model, Document, Schema } from "mongoose";
import uniqueValidator = require("mongoose-unique-validator");

interface User {
    _id: string;
    _username: string;
}

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
            try {
                await usager.save();

                return res.status(201).json(user);
              } catch (err) {
                return res.status(501).json(err);
            }
        }

        private async deleteUser(username: String, res: Response): Promise<Response> {
            const userId: String = await this.obtenirUserId(username);
            try {
                await this.modelUser.findByIdAndRemove(userId);

                return res.status(201).json();
            } catch (err) {
            return res.status(501).json(err);
            }
        }

        private async obtenirUserId(username: String): Promise<String> {
            const users: User[] = [];
            await this.modelUser.find()
                .then((res: Document[]) => {
                    for (const user of res) {
                        users.push(user.toObject());
                    }
                });

            for (const user of users) {
                if (user._username === username) {
                    return user._id;
                }
            }

            // Change the return.
            return users[0]._id;
        }

        public async requeteAjouterUser(req: Request, res: Response): Promise<void> {
            res.send(await this.ajouterUser(req.body, res));
        }

        public async requeteUserId(req: Request, res: Response): Promise<void> {
            res.send(await this.obtenirUserId(req.params.id));
        }

        public async requeteDeleteUser(req: Request, res: Response): Promise<void> {
            res.send(await this.deleteUser(req.params.id, res));
        }
    }
}
