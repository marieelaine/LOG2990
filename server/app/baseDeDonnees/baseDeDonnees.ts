import { injectable } from "inversify";
import "reflect-metadata";
import { Mongoose } from "mongoose";

@injectable()
export class BaseDeDonnees {

    public mongoose: Mongoose;
    private readonly mongoURL: string = "mongodb://admin:admin1@ds239692.mlab.com:39692/log2990-05";

    public constructor() {
        this.mongoose = new Mongoose();
        this.mongoose.set("useCreateIndex", true);
        this.seConnecter();
    }

    public async assurerConnection(): Promise<void> {
        if (this.mongoose.connection.readyState !== 1) {
            await this.seConnecter();
        }

    }

    private async seConnecter(): Promise<void> {
        await this.mongoose.connect(this.mongoURL, { useNewUrlParser: true });
    }
}