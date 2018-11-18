import * as io from "socket.io-client";
import * as event from "../../../../common/communication/evenementsSocket";
import { Injectable } from "@angular/core";

@Injectable()
export class SocketClientService {

    public socket: SocketIOClient.Socket;

    public constructor() {
        this.socket = io("localhost:3000");
    }

    public differenceTrouvee(): void {
        this.socket.emit(event.DIFFERENCE_TROUVEE_MULTIJOUEUR);
    }
}
