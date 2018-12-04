import * as socket from "socket.io";
import { assert } from "chai";
import { Server } from "mock-socket";
import { SocketServerService } from "./socket-io.service";
import * as fsx from "fs-extra";
import * as sinon from "sinon";
import * as constantes from "./constantes";

describe("Classe socket-io-service --------------------------------------------------------------------------------", () => {
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
        it("Devrais appeler la methode socket", () => {
            // tslint:disable-next-line:no-any
            // const spy: sinon.SinonSpy = sinon.spy<any>(socket, "emit").withArgs(sinon.match.string);
            const stub: sinon.SinonStub = sinon.stub(socket["io"], "listen").withArgs(sinon.match.string);

            socketService["envoyerMessageErreurNom"]("Test");

            // assert(spy.calledOnce);
            assert(stub.calledWith("Test"));
        });
    });

    mockServer.stop();

    afterEach(async() => {
        sinon.restore();
        const dir: string = constantes.IMAGES_DIRECTORY;
        await fsx.remove(dir);
    });
});
