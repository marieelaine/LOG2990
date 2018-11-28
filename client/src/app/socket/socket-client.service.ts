import * as io from "socket.io-client";
import { Injectable } from "@angular/core";

@Injectable()
export class SocketClientService {

    public socket: SocketIOClient.Socket;

    public constructor() {
        this.socket = io("localhost:3000");
    }
}
