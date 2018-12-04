import { assert } from "chai";
import { PartieMultipleMultijoueur } from "./partie-multiple-multijoueur";
import { SocketServerService } from "../../socket-io.service";
import * as mockHttp from "node-mocks-http";
import { Request, Response } from "express";
import { Server } from "mock-socket";

describe("Partie Multiple Multijoueur", () => {
    const fakeURL: string = "ws://localhost:8080";
    let partie: PartieMultipleMultijoueur;
    const socket: SocketServerService = new SocketServerService();
     // tslint:disable-next-line:no-any
    const mockServer: any = new Server(fakeURL);

    beforeEach(() => {
        socket.init(mockServer);
        partie = new PartieMultipleMultijoueur(socket);
    });

    describe("Constructeur", () => {
        it("Devrait etre defini", () => {
            assert.isDefined(partie);
        });
    });

    describe("Requetes:", () => {
        it("Devrait envoyer une requete pour joindre une partie multiple", () => {
            const req: mockHttp.MockRequest<Request> = mockHttp.createRequest({
                method: "POST",
                url: "localhost:3000/joindrePartieMultijoueurMultiple",
                body: {channelId: "2"}
            });
            const res: mockHttp.MockResponse<Response> = mockHttp.createResponse();

            partie["requeteEnvoyerJoindreMultiple"](req, res);
            const data: string = JSON.parse(res._getData());

            assert.equal(data, req.body.channelId);
        });

        it("Devrait envoyer une requete pour une difference trouvee", () => {
            const req: mockHttp.MockRequest<Request> = mockHttp.createRequest({
                method: "POST",
                url: "localhost:3000/joindrePartieMultijoueurMultiple",
                body: {
                    channelId: "2",
                    diff: "180",
                    source: "image1",
                    joueur: "charles"
                }
            });
            const res: mockHttp.MockResponse<Response> = mockHttp.createResponse();

            partie["requeteEnvoyerDiffTrouveeMultiple"](req, res);
            const data: string = JSON.parse(res._getData());

            assert.equal(data, req.body.channelId);
        });

        it("Devrait envoyer une requete pour terminer une partie multiple", () => {
            const req: mockHttp.MockRequest<Request> = mockHttp.createRequest({
                method: "POST",
                url: "localhost:3000//partieTermineeMultijoueurMultiple",
                body: {channelId: "2"}
            });
            const res: mockHttp.MockResponse<Response> = mockHttp.createResponse();

            partie["requeteEnvoyerPartieMultipleTerminee"](req, res);
            const data: string = JSON.parse(res._getData());

            assert.equal(data, req.body.channelId);
        });

        it("Devrait envoyer une requete pour erreur dans une partie multiple", () => {
            const req: mockHttp.MockRequest<Request> = mockHttp.createRequest({
                method: "POST",
                url: "localhost:3000/erreurMultijoueurMultiple",
                body: {channelId: "2"}
            });
            const res: mockHttp.MockResponse<Response> = mockHttp.createResponse();

            partie["requeteErreurMultiple"](req, res);
            const data: string = JSON.parse(res._getData());

            assert.equal(data, req.body.channelId);
        });
    });

    mockServer.stop();
});
