import * as http from "http";
import * as socket from "socket.io";
import * as event from "../../common/communication/evenementsSocket";

export class SocketServer {

    public io: SocketIO.Server;

    public constructor(private leServeur: http.Server) {
        this.io = socket(this.leServeur);
        this.init();
    }

    public init(): void {
        // Initialiser connection au scoket
        this.io.on("connection", () => {
            console.log("made connection to socket");
        });
    }

    public envoyerMessageErreurScript(msgError: string): void {
        this.io.emit(event.ENVOYER_MESSAGE_BMPDIFF, msgError);
    }
}
