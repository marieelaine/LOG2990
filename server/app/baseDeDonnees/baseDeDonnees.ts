import { injectable } from "inversify";
import "reflect-metadata";
import { Mongoose } from "mongoose";

@injectable()
export class BaseDeDonnees {

    private _mongoose: Mongoose;
    private readonly mongoURL: string = "mongodb://admin:admin1@ds239692.mlab.com:39692/log2990-05";

    public constructor() {
        this._mongoose = new Mongoose();
        this._mongoose.set("useCreateIndex", true);
        this.seConnecter();
    }

    public async assurerConnection(): Promise<void> {
        if (this._mongoose.connection.readyState !== 1) {
            await this.seConnecter();
        }
    }

    private async seConnecter(): Promise<void> {
        await this._mongoose.connect(this.mongoURL, { useNewUrlParser: true });
    }

    public get mongoose(): Mongoose {
        return this._mongoose;
    }
}
