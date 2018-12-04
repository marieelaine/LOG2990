import { assert } from "chai";
import { Server } from "mock-socket";
import { SocketServerService } from "./socket-io.service";
import * as fsx from "fs-extra";
import * as sinon from "sinon";
import * as constantes from "./constantes";
import * as event from "../../common/communication/evenementsSocket";

describe("Classe socket-io-service", () => {
    let socketService: SocketServerService;
    const fakeURL: string = "ws://localhost:8080";
    // tslint:disable-next-line:no-any
    const mockServer: any = new Server(fakeURL);

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

    describe("Methode init", () => {
        it("Devrais appeler la methode socket emit envoyerMessageErreurNom", () => {
            // tslint:disable-next-line:no-any
            const spy: sinon.SinonSpy = sinon.spy<any>(socketService["io"], "emit");

            socketService["envoyerMessageErreurNom"]("Test");
            assert(spy.calledWith(event.ENVOYER_MESSAGE_NOM_PRIS, "Test"));
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
