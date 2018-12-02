import * as io from "socket.io-client";
import { Injectable } from "@angular/core";
import * as constantes from "../constantes";

@Injectable()
export class SocketClientService {

    public socket: SocketIOClient.Socket;

    public constructor() {
        this.socket = io(constantes.BASE_URL);
    }
}
