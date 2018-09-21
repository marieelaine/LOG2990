import { injectable } from "inversify";
import {Mongoose, Model, Document, Schema} from "mongoose";

@injectable()
export class BaseDeDonnees {

    private mongoose: Mongoose;
    private readonly mongoURL: string = "mongodb://admin:admin1@ds239692.mlab.com:39692/log2990-05";
    private model: Model<Document>;
    private schema: Schema;

    public constructor() {
        this.mongoose = new Mongoose();
        this.schema = new Schema({
            username: String
        });
        this.model = this.mongoose.model("users", this.schema);
        this.seConnecter();
    }

    private async seConnecter(): Promise<void> {
        await this.mongoose.connect(this.mongoURL);
    }
}
