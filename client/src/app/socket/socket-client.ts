import * as io from "socket.io-client";
import * as event from "../../../../common/communication/evenementsSocket";
import { DialogErreurComponent } from "./dialog-erreur/dialog-erreur.component";
import { MatDialog } from "@angular/material";

export class SocketClient {

    private socket: SocketIOClient.Socket;

    public constructor(private dialog: MatDialog) {
        this.socket = io("localhost:3000");
        this.init();
    }

    private init(): void {
        this.socket.on(event.ENVOYER_MESSAGE_BMPDIFF, (data) => {
            this.openDialogWithData(data);
        });

        this.socket.on(event.ENVOYER_MESSAGE_NOM_PRIS, (data) => {
            this.openDialogWithData(data);
        });
    }

    private openDialogWithData(msg: string) {
        this.dialog.open(DialogErreurComponent, {
            height: "190px",
            width: "600px",
            panelClass: 'dialog',
            data: { message : msg }
        });
    }
}
