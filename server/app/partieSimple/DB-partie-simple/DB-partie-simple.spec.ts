import { DBPartieSimple } from "./DB-partie-simple";
import { assert } from "chai";
import * as fsx from "fs-extra";
import * as sinon from "sinon";
import * as constantes from "../../constantes";
import { SocketServerService } from "../../socket-io.service";
import { Joueur } from "../../partie-DB/DB-partie-abstract";
import { PartieSimpleInterface } from "../../../../common/partie-simple-interface";
import { Server } from "mock-socket";
import * as mockHttp from "node-mocks-http";
import {Request, Response} from "express";

describe("Partie Simple BD classe", () => {
    let dbPartieSimple: DBPartieSimple;
    const socketService: SocketServerService = new SocketServerService();
    const fakeURL: string = "ws://localhost:8080";
    // tslint:disable-next-line:no-any
    const mockServer: any = new Server(fakeURL);

    beforeEach(() => {
        socketService.init(mockServer);
        dbPartieSimple = new DBPartieSimple(socketService);
    });

    describe("Constructeur", () => {
        it("Devrait etre defini", () => {
            assert.isDefined(dbPartieSimple);
        });
        it("Devrait definir l'attribut modelPartieBuffer", () => {
            assert.isDefined(dbPartieSimple["modelPartieBuffer"]);
        });

        it("Devrait definir l'attribut modelPartieArray", () => {
            assert.isDefined(dbPartieSimple["modelPartieArray"]);
        });
    });

    describe("Fonction supprimerFichierImages", () => {
        it("Devrait appeller la fonction remove de fsx", async () => {
            const stub: sinon.SinonStub = sinon.stub(fsx, "remove").withArgs(sinon.match.string);
            const resultatAttendu: string = "../Images";

            await dbPartieSimple["supprimerFichierImages"]();

            assert(stub.calledOnce);
            assert(stub.calledWith(resultatAttendu));
        });
    });

    describe("Fonction traiterMessageErreur", () => {
        it("Devrait appeller la fonction supprimerFichierImages", async() => {
            const stub: sinon.SinonStub = sinon.stub(fsx, "remove").withArgs(sinon.match.string);
            // tslint:disable-next-line:no-any
            const spy: sinon.SinonSpy = sinon.spy<any>(dbPartieSimple, "supprimerFichierImages");
            const stubSocket: sinon.SinonStub = sinon.stub(dbPartieSimple["socket"], "envoyerMessageErreurDifferences");
            stubSocket.onCall(0).callThrough();

            const unePartie: PartieSimpleInterface = {
                _id: "1",
                _nomPartie: "unePartie",
                _tempsSolo: new Array<Joueur>(),
                _tempsUnContreUn: new Array<Joueur>(),
                _image1: Buffer.alloc(1),
                _image2: Buffer.alloc(1),
                _imageDiff: new Array<Array<string>>(),
            };

            await dbPartieSimple["traiterMessageErreur"](unePartie, "erreur");

            assert(spy.calledOnce);
            assert(stub.calledOnce);
        });
    });

    describe("Requetes", () => {
        it("Devrait ajouter une partie, mais retourne une erreur de connection", async () => {
            // tslint:disable-next-line:no-any
            const spy: sinon.SinonSpy = sinon.spy<any>(dbPartieSimple, "genererImageMod");
            const req: mockHttp.MockRequest<Request> = mockHttp.createRequest({
                method: "POST",
                url: "localhost:3000/partieSimple/ajouter",
                body: {
                    _id: "432",
                    _nomPartie: "partie1"
                },
                params: {
                    _id: "432",
                    _nomPartie: "partie1"
                }
            });

            const res: mockHttp.MockResponse<Response> = mockHttp.createResponse();

            await dbPartieSimple["requeteAjouterPartie"](req, res);

            assert(spy.calledOnce);
            // tslint:disable-next-line:no-magic-numbers
            assert.equal(res.statusCode, 501);
        });

        it("Devrait supprimer une partie", async () => {
            // tslint:disable-next-line:no-any
            const spy: sinon.SinonSpy = sinon.spy<any>(dbPartieSimple, "deletePartie");
            const req: mockHttp.MockRequest<Request> = mockHttp.createRequest({
                method: "DELETE",
                url: "localhost:3000/partieSimple/delete/432",
                body: {
                    _id: "432",
                    _nomPartie: "partie1"
                },
                params: {
                    _id: "432",
                    _nomPartie: "partie1"
                }
            });

            const res: mockHttp.MockResponse<Response> = mockHttp.createResponse();

            await dbPartieSimple["requeteDeletePartie"](req, res);

            assert(spy.calledOnce);
            // tslint:disable-next-line:no-magic-numbers
            assert.equal(res.statusCode, 201);
        });
    });

    describe("Méthodes envoyant des messages par socket:", () => {
        it("EnvoyerPartiesPretes:", () => {
            // tslint:disable-next-line:no-any
            const spy: sinon.SinonSpy = sinon.spy<any>(socketService, "envoyerPartiesSimplesChargees");
            dbPartieSimple["envoyerPartiesPretes"]("channelID");

            assert(spy.calledOnce);
        });

        it("EnvoyerMeilleurTemps:", () => {
            // tslint:disable-next-line:no-any
            const spy: sinon.SinonSpy = sinon.spy<any>(socketService, "meilleurTemps");
            const joueur: Joueur = { _nom : "", _temps : 0 };
            dbPartieSimple["envoyerMeilleurTemps"](joueur, "nomPartie", true, [joueur]);

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
