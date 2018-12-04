import { assert } from "chai";
import { RoutesPartieSimpleAttente } from "./partie-simple-attente";
import { SocketServerService } from "../../socket-io.service";
import * as mockHttp from "node-mocks-http";
import { Request, Response } from "express";
import { Server } from "mock-socket";

describe("Partie Simple Attente Routes", () => {
    let routesAttente: RoutesPartieSimpleAttente;
    const socket: SocketServerService = new SocketServerService();
    const fakeURL: string = "ws://localhost:8080";
    // tslint:disable-next-line:no-any
    const mockServer: any = new Server(fakeURL);

    beforeEach(() => {
        socket.init(mockServer);
        routesAttente = new RoutesPartieSimpleAttente(socket);
        routesAttente["partieSimpleAttente"] = ["1"];
    });

    describe("Constructeur", () => {
        it("Devrait etre defini", () => {
            assert.isDefined(routesAttente);
        });
        it("Devrait definir l'attribut partieSimpleAttente", () => {
            assert.isDefined(routesAttente["partieSimpleAttente"]);
        });
    });

    describe("Requetes:", () => {
        it("Devrait recuperer une liste de partie simple en attente", async () => {
            const req: mockHttp.MockRequest<Request> = mockHttp.createRequest();
            const res: mockHttp.MockResponse<Response> = mockHttp.createResponse();

            await routesAttente["getPartieSimpleEnAttente"](req, res);
            const data: string[] = JSON.parse(res._getData());

            assert.equal(data, routesAttente["partieSimpleAttente"]);
        });

        it("Devrait ajouter une partie simple en attente", async () => {
            const req: mockHttp.MockRequest<Request> = mockHttp.createRequest({
                method: "POST",
                url: "localhost:3000/addPartieSimpleEnAttente",
                body: {partieId: "2"}
            });
            const res: mockHttp.MockResponse<Response> = mockHttp.createResponse();

            await routesAttente["ajouterPartieSimpleEnAttente"](req, res);

            // tslint:disable-next-line:no-magic-numbers
            assert.equal(routesAttente["partieSimpleAttente"].length, 2);
        });

        it("Devrait supprimer la partie simple en attente passee en parametre", async () => {
            const req: mockHttp.MockRequest<Request> = mockHttp.createRequest({
                method: "DELETE",
                url: "localhost:3000/deletePartieSimpleEnAttente/1",
                body: {
                partieId: "1"
                },
                params : {id: "1"}
            });
            const res: mockHttp.MockResponse<Response> = mockHttp.createResponse();

            await routesAttente["supprimerPartieSimpleEnAttente"](req, res);

            assert.equal(routesAttente["partieSimpleAttente"].length, 0);
        });
    });

    mockServer.stop();
});
