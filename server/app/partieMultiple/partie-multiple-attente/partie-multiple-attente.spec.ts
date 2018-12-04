import { assert } from "chai";
import { RoutesPartieMultipleAttente } from "./partie-multiple-attente";
import { SocketServerService } from "../../socket-io.service";
import * as mockHttp from "node-mocks-http";
import { Request, Response } from "express";
import { Server } from "mock-socket";

describe("Partie Multiple Attente Routes", () => {
    let routesAttente: RoutesPartieMultipleAttente;
    const socket: SocketServerService = new SocketServerService();
    const fakeURL: string = "ws://localhost:8080";
    // tslint:disable-next-line:no-any
    const mockServer: any = new Server(fakeURL);

    beforeEach(() => {
        socket.init(mockServer);
        routesAttente = new RoutesPartieMultipleAttente(socket);
        routesAttente["partieMultipleAttente"] = ["1"];
    });

    describe("Constructeur", () => {
        it("Devrait etre defini", () => {
            assert.isDefined(routesAttente);
        });
        it("Devrait definir l'attribut partieMultipleAttente", () => {
            assert.isDefined(routesAttente["partieMultipleAttente"]);
        });
    });

    describe("Requetes:", () => {
        it("Devrait recuperer une liste de partie multiple en attente", async () => {
            const req: mockHttp.MockRequest<Request> = mockHttp.createRequest();
            const res: mockHttp.MockResponse<Response> = mockHttp.createResponse();
            await routesAttente["getPartieMultipleEnAttente"](req, res);
            const data: string[] = JSON.parse(res._getData());

            assert.equal(data, routesAttente["partieMultipleAttente"]);
        });

        it("Devrait ajouter une partie multiple en attente", async () => {
            const req: mockHttp.MockRequest<Request> = mockHttp.createRequest({
                method: "POST",
                url: "localhost:3000/addPartieMultipleEnAttente",
                body: {partieId: "2"}
            });
            const res: mockHttp.MockResponse<Response> = mockHttp.createResponse();

            await routesAttente["ajouterPartieMultipleEnAttente"](req, res);

            // tslint:disable-next-line:no-magic-numbers
            assert.equal(routesAttente["partieMultipleAttente"].length, 2);
        });

        it("Devrait supprimer la partie multiple en attente passee en parametre", async () => {
            const req: mockHttp.MockRequest<Request> = mockHttp.createRequest({
                method: "DELETE",
                url: "localhost:3000/deletePartieMultipleEnAttente/1",
                body: {
                partieId: "1"
                },
                params : {id: "1"}
            });
            const res: mockHttp.MockResponse<Response> = mockHttp.createResponse();

            await routesAttente["supprimerPartieMultipleEnAttente"](req, res);

            assert.equal(routesAttente["partieMultipleAttente"].length, 0);
        });
    });

    mockServer.stop();
});
