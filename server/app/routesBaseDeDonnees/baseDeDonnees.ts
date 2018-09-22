import { injectable } from "inversify";
import "reflect-metadata";
import { Request, Response, NextFunction } from "express";
import {Mongoose, Model, Document, Schema} from "mongoose";
import {User} from "../../../client/src/app/vue-initiale/login-form/user";
import { Message } from "../../../common/communication/message";

export module RouteBaseDeDonnees {
    @injectable()
    export class BaseDeDonnees {

        private mongoose: Mongoose;
        private readonly mongoURL: string = "mongodb://admin:admin1@ds239692.mlab.com:39692/log2990-05";
        private modelUser: Model<Document>;
        private schema: Schema;

        public constructor() {
            this.mongoose = new Mongoose();
            this.schema = new Schema({
                username: String
            });
            this.modelUser = this.mongoose.model("users", this.schema);
            this.seConnecter();
        }

        private async seConnecter(): Promise<void> {
            await this.mongoose.connect(this.mongoURL);
        }

        private async ajouterUser(usagerJson: {}): Promise<void> {
            const usager: Document = new this.modelUser(usagerJson);
            await this.modelUser.create(usager);
        }

        private async obtenirUsername(identifiant: String): Promise<User> {
            let usager: User = new User();

            await this.modelUser.findById(identifiant)
                .then((res: Document) => { usager = res.toObject(); })
                .catch(() => {});

            return usager;

        }

        public helloWorld(req: Request, res: Response, next: NextFunction): void {
            const message: Message = {
                title: "jeremy",
                body: "World"
            };
            res.send(JSON.stringify(message));
        }

        public async requeteAjouterUser(req: Request, res: Response): Promise<void> {
            res.send(await this.ajouterUser(req.body));
        }

        public async requeteUser(req: Request, res: Response): Promise<void> {
            res.send(await this.obtenirUsername(req.params.id));
        }
    }
}
