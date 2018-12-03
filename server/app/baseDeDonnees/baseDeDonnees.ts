import { injectable } from "inversify";
import "reflect-metadata";
import { Mongoose } from "mongoose";
import * as constantes from "../constantes";

enum ReadyState {
    Deconnecte = 0,
    Connecte
}
const MONGOOSE_INIT: string = "useCreateIndex";

@injectable()
export class BaseDeDonnees {

    private _mongoose: Mongoose;

    public constructor() {
        this._mongoose = new Mongoose();
        this._mongoose.set(MONGOOSE_INIT, true);
        this.seConnecter().catch();
    }

    public async assurerConnection(): Promise<void> {
        if (this._mongoose.connection.readyState !== ReadyState.Connecte) {
            await this.seConnecter();
        }
    }

    private async seConnecter(): Promise<void> {
        await this._mongoose.connect(constantes.URL_MONGO_DB, { useNewUrlParser: true });
    }

    public get mongoose(): Mongoose {
        return this._mongoose;
    }
}
