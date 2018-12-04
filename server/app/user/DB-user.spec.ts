import { assert } from "chai";
import { DBUser } from "./DB-user";
import { SocketServerService } from "../socket-io.service";
import { Server } from "mock-socket";
import * as mockHttp from "node-mocks-http";
import {Request, Response} from "express";
import { Usager } from "../../../common/usager";

describe("BaseDeDonneesUsager classe", () => {
    let user: DBUser;
    const socket: SocketServerService = new SocketServerService();
    const fakeURL: string = "ws://localhost:8080";
    // tslint:disable-next-line:no-any
    const mockServer: any = new Server(fakeURL);

    beforeEach(() => {
        socket.init(mockServer);
        user = new DBUser(socket);
    });

    describe("Constructeur", () => {
        it ("Devrait etre defini", () => {
            assert.isDefined(user);
        });

        it("Devrait definir l'attribut baseDeDonnes", () => {
            assert.isDefined(user["baseDeDonnees"]);
        });

        it("Devrait definir l'attribut schema", () => {
            assert.isDefined(user["schema"]);
        });

        it("Devrait definir l'attribut modelUser", () => {
            assert.isDefined(user["modelUser"]);
        });
    });

    describe("Requetes", () => {
        it("Devrait renvoyer un username non-existant", async () => {
            const req: mockHttp.MockRequest<Request> = mockHttp.createRequest({
                method: "GET",
                url: "localhost:3000/users/432",
                body: {_username: "432"}
            });

            const id: Promise<string> = user["obtenirUserId"](req.body._username);

            assert.notEqual(id, req.body._username);
        });

        it("Devrait envoyer une requete pour ajouter un usager, mais retourne une erreur de connection", async () => {
            const usager: Usager = {
                _id: "12",
                _username: "charles"
            };
            const res: mockHttp.MockResponse<Response> = mockHttp.createResponse();

            await user["ajouterUser"](usager, res);
            // tslint:disable-next-line:no-magic-numbers
            assert.equal(res.statusCode, 501);
        });

        it("Devrait envoyer une requete pour supprimer un usager", async () => {
            const usager: Usager = {
                _id: "12",
                _username: "charles"
            };
            const res: mockHttp.MockResponse<Response> = mockHttp.createResponse();

            await user["supprimerUser"](usager._username, res);
            // tslint:disable-next-line:no-magic-numbers
            assert.equal(res.statusCode, 201);
        });
    });

    mockServer.stop();
});
