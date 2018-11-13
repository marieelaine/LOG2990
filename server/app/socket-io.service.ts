import * as http from "http";
import * as socket from "socket.io";
import * as event from "../../common/communication/evenementsSocket";
import { injectable } from "inversify";
import { PartieSimpleInterface } from "./partieSimple/DB-partie-simple/DB-partie-simple";
import { PartieMultipleInterface } from "./partieMultiple/DB-partie-multiple/DB-partie-multiple";

@injectable()
export class SocketServerService {

    public io: SocketIO.Server;

    // tslint:disable-next-line:no-empty
    public constructor() {
    }

    public init(server: http.Server): void {
        this.io = socket(server);
        this.setOnEvents();
    }

    private setOnEvents(): void {
        this.io.on(event.DIALOG_ATTENTE_FERME, () => {
            this.io.emit(event.DIALOG_ATTENTE_FERME);
        });

    }

    public envoyerMessageErreurNom(msg: string): void {
        this.io.emit(event.ENVOYER_MESSAGE_NOM_PRIS, msg);
    }

    public envoyerMessageErreurDifferences(msg: string): void {
        this.io.emit(event.ENVOYER_MESSAGE_BMPDIFF, msg);
    }

    public envoyerPartieSimple(partieSimple: PartieSimpleInterface): void {
        this.io.emit(event.ENVOYER_PARTIE_SIMPLE, partieSimple);
    }

    public envoyerPartieSimpleAttente(partieId: string): void {
        this.io.emit(event.ENVOYER_PARTIE_SIMPLE_ATTENTE, partieId);
    }

    public supprimerPartieSimpleAttente(partieId: string): void {
        this.io.emit(event.DELETE_PARTIE_SIMPLE_ATTENTE, partieId);
    }

    public envoyerPartieMultiple(partieMultiple: PartieMultipleInterface): void {
        this.io.emit(event.ENVOYER_PARTIE_MULTIPLE, partieMultiple);
    }

    public supprimerPartieSimple(partieId: string): void {
        this.io.emit(event.DELETE_PARTIE_SIMPLE, partieId);
    }
}
