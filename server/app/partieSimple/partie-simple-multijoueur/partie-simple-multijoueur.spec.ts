import { assert } from "chai";
import { PartieSimpleMultijoueur } from "./partie-simple-multijoueur";
import { SocketServerService } from "../../socket-io.service";
import * as mockHttp from "node-mocks-http";
import { Request, Response } from "express";
import { Server } from "mock-socket";

describe("Partie Simple Multijoueur", () => {
    const fakeURL: string = "ws://localhost:8080";
    // tslint:disable-next-line:no-any
    const mockServer: any = new Server(fakeURL);
    let partie: PartieSimpleMultijoueur;
    const socket: SocketServerService = new SocketServerService();

    beforeEach(() => {
        socket.init(mockServer);
        partie = new PartieSimpleMultijoueur(socket);
    });

    describe("Constructeur", () => {
        it("Devrait etre defini", () => {
            assert.isDefined(partie);
        });
    });

    describe("Requetes:", () => {
        it("Devrait envoyer une requete pour joindre une partie simple", async () => {
            const req: mockHttp.MockRequest<Request> = mockHttp.createRequest({
                method: "POST",
                url: "localhost:3000/joindrePartieMultijoueurSimple",
                body: {channelId: "2"}
            });
            const res: mockHttp.MockResponse<Response> = mockHttp.createResponse();

            partie["requeteEnvoyerJoindreSimple"](req, res);
            const data: string = JSON.parse(res._getData());

            assert.equal(data, req.body.channelId);
        });

        it("Devrait envoyer une requete pour une difference trouvee", async () => {
            const req: mockHttp.MockRequest<Request> = mockHttp.createRequest({
                method: "POST",
                url: "localhost:3000/joindrePartieMultijoueurSimple",
                body: {
                    channelId: "2",
                    diff: "180",
                    source: "image1",
                    joueur: "charles"
                }
            });
            const res: mockHttp.MockResponse<Response> = mockHttp.createResponse();

            partie["requeteEnvoyerDiffTrouveeSimple"](req, res);
            const data: string = JSON.parse(res._getData());

            assert.equal(data, req.body.channelId);
        });

        it("Devrait envoyer une requete pour terminer une partie simple", async () => {
            const req: mockHttp.MockRequest<Request> = mockHttp.createRequest({
                method: "POST",
                url: "localhost:3000//partieTermineeMultijoueurSimple",
                body: {channelId: "2"}
            });
            const res: mockHttp.MockResponse<Response> = mockHttp.createResponse();

            partie["requeteEnvoyerPartieSimpleTerminee"](req, res);
            const data: string = JSON.parse(res._getData());

            assert.equal(data, req.body.channelId);
        });

        it("Devrait envoyer une requete pour erreur dans une partie simple", async () => {
            const req: mockHttp.MockRequest<Request> = mockHttp.createRequest({
                method: "POST",
                url: "localhost:3000/erreurMultijoueurSimple",
                body: {channelId: "2"}
            });
            const res: mockHttp.MockResponse<Response> = mockHttp.createResponse();

            partie["requeteErreurSimple"](req, res);
            const data: string = JSON.parse(res._getData());

            assert.equal(data, req.body.channelId);
        });
    });

    mockServer.stop();
});
