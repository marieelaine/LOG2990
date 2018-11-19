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

    public supprimerPartieMultiple(partieId: string): void {
        this.io.emit(event.DELETE_PARTIE_MULTIPLE, partieId);
    }

    public envoyerPartieMultipleAttente(partieId: string): void {
        this.io.emit(event.ENVOYER_PARTIE_MULTIPLE_ATTENTE, partieId);
    }

    public supprimerPartieMultipleAttente(partieId: string): void {
        this.io.emit(event.DELETE_PARTIE_MULTIPLE_ATTENTE, partieId);
    }

    public envoyerDiffPartieSimple(channelId: string, diff: number, joueur: string): void {
        this.io.emit(event.DIFFERENCE_TROUVEE_MULTIJOUEUR_SIMPLE, {channelId: channelId, diff: diff, joueur: joueur});
    }

    public envoyerDiffPartieMultiple(channelId: string, diff: number, source: string): void {
        this.io.emit(event.DIFFERENCE_TROUVEE_MULTIJOUEUR_MULTIPLE, {channelId: channelId, diff: diff, source: source});
    }

    public envoyerJoindreSimple(partieId: string, channelId: string): void {
        this.io.emit(event.JOINDRE_PARTIE_MULTIJOUEUR_SIMPLE, { partieId, channelId });
    }

    public envoyerJoindreMultiple(partieId: string, channelId: string): void {
        this.io.emit(event.JOINDRE_PARTIE_MULTIJOUEUR_MULTIPLE, { partieId, channelId });
    }

    public envoyerDialogMultipleFerme(): void {
        this.io.emit(event.DIALOG_ATTENTE_MULTIPLE_FERME);
    }

    public envoyerDialogSimpleFerme(): void {
        this.io.emit(event.DIALOG_ATTENTE_SIMPLE_FERME);
    }

    public envoyerPartieSimpleTerminee(channelId: string, joueur: string): void {
        this.io.emit(event.PARTIE_SIMPLE_MULTIJOUEUR_TERMINEE, {channelId: channelId, joueur: joueur});
    }
}
