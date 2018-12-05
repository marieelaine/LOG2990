import * as http from "http";
import * as socket from "socket.io";
import * as event from "../../common/communication/evenementsSocket";
import { injectable } from "inversify";
import { PartieSimpleInterface } from "../../common/partie-simple-interface";
import { PartieMultipleInterface } from "../../common/partie-multiple-interface";
import { Joueur } from "./partie-DB/DB-partie-abstract";
import "reflect-metadata";
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

    public envoyerDiffPartieMultiple(channelId: string, diff: number, source: string, joueur: string): void {
        this.io.emit(event.DIFFERENCE_TROUVEE_MULTIJOUEUR_MULTIPLE, {channelId: channelId, diff: diff, source: source, joueur: joueur});
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

    public envoyerPartieMultipleTerminee(channelId: string, joueur: string): void {
        this.io.emit(event.PARTIE_MULTIPLE_MULTIJOUEUR_TERMINEE, {channelId: channelId, joueur: joueur});
    }

    public erreurSimple(channelId: string, joueur: string, ev: MouseEvent): void {
        this.io.emit(event.ERREUR_PARTIE_SIMPLE, {channelId: channelId, joueur: joueur, ev: ev});
    }

    public erreurMultiple(channelId: string, joueur: string, ev: MouseEvent): void {
        this.io.emit(event.ERREUR_PARTIE_MULTIPLE, {channelId: channelId, joueur: joueur, ev: ev});
    }

    public connectionUser(joueur: string): void {
        this.io.emit(event.CONNECTION_USER, {joueur: joueur});
    }

    public deconnectionUser(joueur: string): void {
        this.io.emit(event.DECONNECTION_USER, {joueur: joueur});
    }

    public meilleurTemps(joueur: Joueur, partie: string, isSolo: boolean, position: number): void {
        this.io.emit(event.MEILLEUR_TEMPS, {joueur: joueur._nom, partie: partie, isSolo: isSolo, position: position});
    }

    public envoyerPartiesSimplesChargees(channelId: string): void {
        this.io.emit(event.PARTIES_SIMPLES_CHARGEES, channelId);
    }

    public envoyerPartiesMultiplesChargees(channelId: string): void {
        this.io.emit(event.PARTIES_MULTIPLES_CHARGEES, channelId);
    }
}
