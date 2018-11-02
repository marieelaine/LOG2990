import * as io from "socket.io-client";
import * as event from "../../../common/communication/evenementsSocket";

export class SocketClient {

    private socket: SocketIOClient.Socket;

    public constructor() {
        this.socket = io("localhost:3000");
        this.init();
    }

    private init(): void {
        this.socket.on(event.ENVOYER_MESSAGE_BMPDIFF, (data) => {
            alert(data);
        });

        this.socket.on(event.ENVOYER_MESSAGE_NOM_PRIS, (data) => {
            alert(data);
        });
    }
}
