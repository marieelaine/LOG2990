import { assert } from "chai";
import { Server } from "mock-socket";
import { SocketServerService } from "./socket-io.service";
import * as fsx from "fs-extra";
import * as sinon from "sinon";
import * as constantes from "./constantes";
import * as event from "../../common/communication/evenementsSocket";
import { PartieSimpleInterface } from "../../common/partie-simple-interface";
import { Joueur } from "./partie-DB/DB-partie-abstract";
import { PartieMultipleInterface } from "../../common/partie-multiple-interface";

describe("Classe socket-io-service", () => {
    let socketService: SocketServerService;
    const fakeURL: string = "ws://localhost:8080";
    // tslint:disable-next-line:no-any
    const mockServer: any = new Server(fakeURL);

    const mockString: string = "Test";
    const mockNumber: number = 42;
    const unePartie: PartieSimpleInterface = {
        _id: "1",
        _nomPartie: "unePartie",
        _tempsSolo: new Array<Joueur>(),
        _tempsUnContreUn: new Array<Joueur>(),
        _image1: Buffer.alloc(1),
        _image2: Buffer.alloc(1),
        _imageDiff: new Array<Array<string>>(),
    };
    const unePartieMultiple: PartieMultipleInterface = {
        _id: "1",
        _nomPartie: "unePartie",
        _tempsSolo: new Array<Joueur>(),
        _tempsUnContreUn: new Array<Joueur>(),
        _image1PV1: Buffer.alloc(1),
        _image1PV2: Buffer.alloc(1),
        _image2PV1: Buffer.alloc(1),
        _image2PV2: Buffer.alloc(1),
        _imageDiff1: new Array<Array<string>>(),
        _imageDiff2: new Array<Array<string>>(),
        _quantiteObjets: 1,
        _theme: "theme",
        _typeModification: "a",
    };

    beforeEach(() => {
        socketService = new SocketServerService();
        socketService.init(mockServer);
    });

    describe("Constructeur", () => {
        it("Devrais etre defini", () => {
            assert.isDefined(socketService);
        });

        it("Devrais definir attribut io", () => {
            assert.isDefined(socketService["io"]);
        });
    });

    describe("Methodes emit", () => {
        it("Devrais appeler la methode socket emit envoyerMessageErreurNom", () => {
            // tslint:disable-next-line:no-any
            const spy: sinon.SinonSpy = sinon.spy<any>(socketService["io"], "emit");

            socketService["envoyerMessageErreurNom"](mockString);
            assert(spy.calledWith(event.ENVOYER_MESSAGE_NOM_PRIS, mockString));
            assert(spy.calledOnce);
        });
        it("Devrais appeler la methode socket emit envoyerMessageErreurDifferences", () => {
            // tslint:disable-next-line:no-any
            const spy: sinon.SinonSpy = sinon.spy<any>(socketService["io"], "emit");

            socketService["envoyerMessageErreurDifferences"](mockString);
            assert(spy.calledWith(event.ENVOYER_MESSAGE_BMPDIFF, mockString));
            assert(spy.calledOnce);
        });
        it("Devrais appeler la methode socket emit envoyerPartieSimple", () => {
            // tslint:disable-next-line:no-any
            const spy: sinon.SinonSpy = sinon.spy<any>(socketService["io"], "emit");

            socketService["envoyerPartieSimple"](unePartie);
            assert(spy.calledWith(event.ENVOYER_PARTIE_SIMPLE, unePartie));
            assert(spy.calledOnce);
        });
        it("Devrais appeler la methode socket emit envoyerPartieSimpleAttente", () => {
            // tslint:disable-next-line:no-any
            const spy: sinon.SinonSpy = sinon.spy<any>(socketService["io"], "emit");

            socketService["envoyerPartieSimpleAttente"](unePartie._id);
            assert(spy.calledWith(event.ENVOYER_PARTIE_SIMPLE_ATTENTE, unePartie._id));
            assert(spy.calledOnce);
        });
        it("Devrais appeler la methode socket emit supprimerPartieSimpleAttente", () => {
            // tslint:disable-next-line:no-any
            const spy: sinon.SinonSpy = sinon.spy<any>(socketService["io"], "emit");

            socketService["supprimerPartieSimpleAttente"](unePartie._id);
            assert(spy.calledWith(event.DELETE_PARTIE_SIMPLE_ATTENTE, unePartie._id));
            assert(spy.calledOnce);
        });
        it("Devrais appeler la methode socket emit envoyerPartieMultiple", () => {
            // tslint:disable-next-line:no-any
            const spy: sinon.SinonSpy = sinon.spy<any>(socketService["io"], "emit");

            socketService["envoyerPartieMultiple"](unePartieMultiple);
            assert(spy.calledWith(event.ENVOYER_PARTIE_MULTIPLE, unePartieMultiple));
            assert(spy.calledOnce);
        });
        it("Devrais appeler la methode socket emit supprimerPartieSimple", () => {
            // tslint:disable-next-line:no-any
            const spy: sinon.SinonSpy = sinon.spy<any>(socketService["io"], "emit");

            socketService["supprimerPartieSimple"](unePartie._id);
            assert(spy.calledWith(event.DELETE_PARTIE_SIMPLE, unePartie._id));
            assert(spy.calledOnce);
        });
        it("Devrais appeler la methode socket emit supprimerPartieMultiple", () => {
            // tslint:disable-next-line:no-any
            const spy: sinon.SinonSpy = sinon.spy<any>(socketService["io"], "emit");

            socketService["supprimerPartieMultiple"](unePartieMultiple._id);
            assert(spy.calledWith(event.DELETE_PARTIE_MULTIPLE, unePartieMultiple._id));
            assert(spy.calledOnce);
        });
        it("Devrais appeler la methode socket emit envoyerPartieMultipleAttente", () => {
            // tslint:disable-next-line:no-any
            const spy: sinon.SinonSpy = sinon.spy<any>(socketService["io"], "emit");

            socketService["envoyerPartieMultipleAttente"](unePartieMultiple._id);
            assert(spy.calledWith(event.ENVOYER_PARTIE_MULTIPLE_ATTENTE, unePartieMultiple._id));
            assert(spy.calledOnce);
        });
        it("Devrais appeler la methode socket emit supprimerPartieMultipleAttente", () => {
            // tslint:disable-next-line:no-any
            const spy: sinon.SinonSpy = sinon.spy<any>(socketService["io"], "emit");

            socketService["supprimerPartieMultipleAttente"](unePartieMultiple._id);
            assert(spy.calledWith(event.DELETE_PARTIE_MULTIPLE_ATTENTE, unePartieMultiple._id));
            assert(spy.calledOnce);
        });
        it("Devrais appeler la methode socket emit envoyerDiffPartieSimple", () => {
            // tslint:disable-next-line:no-any
            const spy: sinon.SinonSpy = sinon.spy<any>(socketService["io"], "emit");

            socketService["envoyerDiffPartieSimple"](mockString, mockNumber, mockString);
            assert(spy.calledWith(event.DIFFERENCE_TROUVEE_MULTIJOUEUR_SIMPLE,
                                  {channelId: mockString, diff: mockNumber, joueur: mockString}));
            assert(spy.calledOnce);
        });
        it("Devrais appeler la methode socket emit envoyerDiffPartieMultiple", () => {
            // tslint:disable-next-line:no-any
            const spy: sinon.SinonSpy = sinon.spy<any>(socketService["io"], "emit");

            socketService["envoyerDiffPartieMultiple"](mockString, mockNumber, mockString, mockString);
            assert(spy.calledWith(event.DIFFERENCE_TROUVEE_MULTIJOUEUR_MULTIPLE,
                                  {channelId: mockString, diff: mockNumber, source: mockString, joueur: mockString}));
            assert(spy.calledOnce);
        });
        it("Devrais appeler la methode socket emit envoyerJoindreSimple", () => {
            // tslint:disable-next-line:no-any
            const spy: sinon.SinonSpy = sinon.spy<any>(socketService["io"], "emit");

            socketService["envoyerJoindreSimple"](mockString, mockString);
            assert(spy.calledWith(event.JOINDRE_PARTIE_MULTIJOUEUR_SIMPLE, { partieId: mockString, channelId: mockString }));
            assert(spy.calledOnce);
        });
        it("Devrais appeler la methode socket emit envoyerJoindreMultiple", () => {
            // tslint:disable-next-line:no-any
            const spy: sinon.SinonSpy = sinon.spy<any>(socketService["io"], "emit");

            socketService["envoyerJoindreMultiple"](mockString, mockString);
            assert(spy.calledWith(event.JOINDRE_PARTIE_MULTIJOUEUR_MULTIPLE, { partieId: mockString, channelId: mockString }));
            assert(spy.calledOnce);
        });
        it("Devrais appeler la methode socket emit envoyerDialogMultipleFerme", () => {
            // tslint:disable-next-line:no-any
            const spy: sinon.SinonSpy = sinon.spy<any>(socketService["io"], "emit");

            socketService["envoyerDialogMultipleFerme"]();
            assert(spy.calledWith(event.DIALOG_ATTENTE_MULTIPLE_FERME));
            assert(spy.calledOnce);
        });
        it("Devrais appeler la methode socket emit envoyerDialogSimpleFerme", () => {
            // tslint:disable-next-line:no-any
            const spy: sinon.SinonSpy = sinon.spy<any>(socketService["io"], "emit");

            socketService["envoyerDialogSimpleFerme"]();
            assert(spy.calledWith(event.DIALOG_ATTENTE_SIMPLE_FERME));
            assert(spy.calledOnce);
        });
        it("Devrais appeler la methode socket emit envoyerPartieSimpleTerminee", () => {
            // tslint:disable-next-line:no-any
            const spy: sinon.SinonSpy = sinon.spy<any>(socketService["io"], "emit");

            socketService["envoyerPartieSimpleTerminee"](mockString, mockString);
            assert(spy.calledWith(event.PARTIE_SIMPLE_MULTIJOUEUR_TERMINEE, { channelId: mockString, joueur: mockString }));
            assert(spy.calledOnce);
        });
        it("Devrais appeler la methode socket emit envoyerPartieMultipleTerminee", () => {
            // tslint:disable-next-line:no-any
            const spy: sinon.SinonSpy = sinon.spy<any>(socketService["io"], "emit");

            socketService["envoyerPartieMultipleTerminee"](mockString, mockString);
            assert(spy.calledWith(event.PARTIE_MULTIPLE_MULTIJOUEUR_TERMINEE, { channelId: mockString, joueur: mockString }));
            assert(spy.calledOnce);
        });
        it("Devrais appeler la methode socket emit connectionUser", () => {
            // tslint:disable-next-line:no-any
            const spy: sinon.SinonSpy = sinon.spy<any>(socketService["io"], "emit");

            socketService["connectionUser"](mockString);
            assert(spy.calledWith(event.CONNECTION_USER, {joueur: mockString}));
            assert(spy.calledOnce);
        });
        it("Devrais appeler la methode socket emit deconnectionUser", () => {
            // tslint:disable-next-line:no-any
            const spy: sinon.SinonSpy = sinon.spy<any>(socketService["io"], "emit");

            socketService["deconnectionUser"](mockString);
            assert(spy.calledWith(event.DECONNECTION_USER, {joueur: mockString}));
            assert(spy.calledOnce);
        });
        it("Devrais appeler la methode socket emit meilleurTemps", () => {
            // tslint:disable-next-line:no-any
            const spy: sinon.SinonSpy = sinon.spy<any>(socketService["io"], "emit");

            const joueur: Joueur = { _nom : mockString, _temps : 0 };
            socketService["meilleurTemps"](joueur, mockString, true, 0);
            assert(spy.calledWith(event.MEILLEUR_TEMPS, { joueur: mockString, partie: mockString, isSolo: true, position: 0 }));
            assert(spy.calledOnce);
        });
        it("Devrais appeler la methode socket emit envoyerPartiesSimplesChargees", () => {
            // tslint:disable-next-line:no-any
            const spy: sinon.SinonSpy = sinon.spy<any>(socketService["io"], "emit");

            socketService["envoyerPartiesSimplesChargees"](mockString);
            assert(spy.calledWith(event.PARTIES_SIMPLES_CHARGEES, mockString));
            assert(spy.calledOnce);
        });
        it("Devrais appeler la methode socket emit envoyerPartiesMultiplesChargees", () => {
            // tslint:disable-next-line:no-any
            const spy: sinon.SinonSpy = sinon.spy<any>(socketService["io"], "emit");

            socketService["envoyerPartiesMultiplesChargees"](mockString);
            assert(spy.calledWith(event.PARTIES_MULTIPLES_CHARGEES, mockString));
            assert(spy.calledOnce);
        });
    });

    mockServer.stop();

    afterEach(async() => {
        sinon.restore();
        const dir: string = constantes.IMAGES_DIRECTORY;
        await fsx.remove(dir);
    });
});
