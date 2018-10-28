import * as http from "http";
import * as socket from "socket.io";
// import * as event from "../../common/communication/evenementsSocket";
import { injectable } from "inversify";

@injectable()
export class SocketServerService {

    public io: SocketIO.Server;

    public constructor(private leServeur: http.Server) {
        this.io = socket(this.leServeur);
        this.init();
    }

    public init(): void {
        // Initialiser connection au scoket
    }
}
