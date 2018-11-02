import * as http from "http";
import * as socket from "socket.io";
import * as event from "../../common/communication/evenementsSocket";
import { injectable } from "inversify";

@injectable()
export class SocketServerService {

    public io: SocketIO.Server;

    // tslint:disable-next-line:no-empty
    public constructor() {
    }

    public init(server: http.Server): void {
        this.io = socket(server);
    }

    public envoyerMessageErreurNom(msg: string): void {
        this.io.emit(event.ENVOYER_MESSAGE_NOM_PRIS, msg);
    }

    public envoyerMessageErreurDifferences(msg: string): void {
        this.io.emit(event.ENVOYER_MESSAGE_BMPDIFF, msg);
    }
}
