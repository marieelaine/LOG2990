import { Schema, Model, Document } from "mongoose";
import { Request, Response} from "express";
import uniqueValidator = require("mongoose-unique-validator");
import "reflect-metadata";
import { injectable } from "inversify";
import { BaseDeDonnees } from "../baseDeDonnees/baseDeDonnees";

interface Usager {
    _id: string;
    _username: string;
}

export module DBUser {
    @injectable()
    export class User {

        private baseDeDonnees: BaseDeDonnees;
        private modelUser: Model<Document>;
        private schema: Schema;

        public constructor() {
            this.baseDeDonnees = new BaseDeDonnees();
            this.schema = new Schema({
                _username: {
                    type: String,
                    required: true,
                    unique: true
                }
            });
            this.schema.plugin(uniqueValidator);
            this.modelUser = this.baseDeDonnees.mongoose.model("users", this.schema);
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
                await this.modelUser.findOneAndDelete(userId);

                return res.status(201).json();
            } catch (err) {
            return res.status(501).json(err);
            }
        }

        private async obtenirUserId(username: String): Promise<String> {
            const users: Usager[] = [];
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

    }
}
