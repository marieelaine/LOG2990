import { DBPartieMultiple } from "./DB-partie-multiple";
import { assert } from "chai";
import * as fsx from "fs-extra";
import * as sinon from "sinon";
import * as constantes from "../../constantes";
import { SocketServerService } from "../../socket-io.service";
import { Joueur } from "../../partie-DB/DB-partie-abstract";
import { PartieMultipleInterface } from "../../../../common/partie-multiple-interface";
import { Server } from "mock-socket";
import * as mockHttp from "node-mocks-http";
import {Request, Response} from "express";

describe("Partie Multiple BD classe", () => {
    let partieMultipleBD: DBPartieMultiple;
    const socket: SocketServerService = new SocketServerService();
    const fakeURL: string = "ws://localhost:8080";
     // tslint:disable-next-line:no-any
    const mockServer: any = new Server(fakeURL);

    beforeEach(() => {
        socket.init(mockServer);
        partieMultipleBD = new DBPartieMultiple(socket);
    });

    describe("Constructeur", () => {
        it("Devrait etre defini", () => {
            assert.isDefined(partieMultipleBD);
        });
        it("Devrait definir l'attribut modelPartieBuffer", () => {
            assert.isDefined(partieMultipleBD["modelPartieBuffer"]);
        });

        it("Devrait definir l'attribut modelPartieArray", () => {
            assert.isDefined(partieMultipleBD["modelPartieArray"]);
        });
    });

    describe("Fonction supprimerFichierImages", () => {
        it("Devrait appeller la fonction remove de fsx", () => {
            const stub: sinon.SinonStub = sinon.stub(fsx, "remove").withArgs(sinon.match.string);
            const resultatAttendu: string = "../Images";

            partieMultipleBD["supprimerFichierImages"]().catch();

            assert(stub.calledOnce);
            assert(stub.calledWith(resultatAttendu));
        });
    });

    describe("Fonction enregistrerPartieMultiple", () => {
        it("Devrait appeller la fonction supprimerFichierImages", async () => {
            const stub: sinon.SinonStub = sinon.stub(fsx, "remove").withArgs(sinon.match.string);
            // tslint:disable-next-line:no-any
            const spy: sinon.SinonSpy = sinon.spy<any>(partieMultipleBD, "supprimerFichierImages");
            const stubSocketEnvoyerPartie: sinon.SinonStub = sinon.stub(partieMultipleBD["socket"], "envoyerMessageErreurNom");

            stubSocketEnvoyerPartie.onCall(0).callThrough();
            stubSocketEnvoyerPartie.onCall(1).callThrough();

            const unePartie: PartieMultipleInterface = {
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

            await partieMultipleBD["enregistrerPartieMultiple"](unePartie);

            assert(spy.calledOnce);
            assert(stub.calledOnce);
        });
    });

    describe("Fonction genererScene", () => {
        it("Devrait appeller la fonction genererScene", async() => {
            // tslint:disable-next-line:no-any
            const spy: sinon.SinonSpy = sinon.spy<any>(partieMultipleBD, "genererScene");

            const unePartie: PartieMultipleInterface = {
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

            await partieMultipleBD["genererScene"](unePartie);

            assert(spy.calledOnce);
        });
    });

    describe("Fonction ajouterImagesPartieMultiple", () => {
        const fourthCall: number = 3;
        const thirdCall: number = 2;
        const unePartie: PartieMultipleInterface = {
            _id: "1", _nomPartie: "unePartie", _tempsSolo: new Array<Joueur>(),
            _tempsUnContreUn: new Array<Joueur>(), _image1PV1: Buffer.alloc(1),
            _image1PV2: Buffer.alloc(1), _image2PV1: Buffer.alloc(1),
            _image2PV2: Buffer.alloc(1), _imageDiff1: new Array<Array<string>>(),
            _imageDiff2: new Array<Array<string>>(), _quantiteObjets: 1,
            _theme: "theme", _typeModification: "a",
        };
        it("Devrait appeller la fonction getImageDiffAsBuffer", async() => {
            // tslint:disable-next-line:no-any
            const stub: sinon.SinonStub = sinon.stub<any>(partieMultipleBD, "getImageDiffAsBuffer");

            stub.onCall(0).callThrough();
            stub.onCall(1).callThrough();
            stub.onCall(thirdCall).callThrough();
            stub.onCall(fourthCall).callThrough();

            // tslint:disable-next-line:no-any
            const stubGetImageDiff: sinon.SinonStub = sinon.stub<any>(partieMultipleBD, "getImageDiffTextFile");
            stubGetImageDiff.onCall(0).callThrough();

            await partieMultipleBD["ajouterImagesPartieMultiple"](unePartie, "");

            assert(stub.called);
        });
    });

    describe("Requetes", () => {
        it("Devrait ajouter une partie", async () => {
            // tslint:disable-next-line:no-any
            const spy: sinon.SinonSpy = sinon.spy<any>(partieMultipleBD, "genererScene");
            const req: mockHttp.MockRequest<Request> = mockHttp.createRequest({
                method: "POST",
                url: "localhost:3000/partieMultiple/ajouter/",
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

            await partieMultipleBD["requeteAjouterPartie"](req, res);

            assert(spy.calledOnce);
            // tslint:disable-next-line:no-magic-numbers
            assert.equal(res.statusCode, 201);
        });

        it("Devrait supprimer une partie", async () => {
            // tslint:disable-next-line:no-any
            const spy: sinon.SinonSpy = sinon.spy<any>(partieMultipleBD, "deletePartie");
            const req: mockHttp.MockRequest<Request> = mockHttp.createRequest({
                method: "DELETE",
                url: "localhost:3000/partieMultiple/delete/432",
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

            await partieMultipleBD["requeteDeletePartie"](req, res);

            assert(spy.calledOnce);
            // tslint:disable-next-line:no-magic-numbers
            assert.equal(res.statusCode, 201);
        });
    });

    describe("Méthodes envoyant des messages par socket:", () => {
        it("EnvoyerPartiesPretes:", () => {
            // tslint:disable-next-line:no-any
            const spy: sinon.SinonSpy = sinon.spy<any>(socket, "envoyerPartiesMultiplesChargees");
            partieMultipleBD["envoyerPartiesPretes"]("channelID");

            assert(spy.calledOnce);
        });

        it("EnvoyerMeilleurTemps:", () => {
            // tslint:disable-next-line:no-any
            const spy: sinon.SinonSpy = sinon.spy<any>(socket, "meilleurTemps");
            const joueur: Joueur = { _nom : "", _temps : 0 };
            partieMultipleBD["envoyerMeilleurTemps"](joueur, "nomPartie", true, [joueur]);

            assert(spy.calledOnce);
        });
    });

    afterEach(async () => {
        sinon.restore();
        const dir: string = constantes.IMAGES_DIRECTORY;
        await fsx.remove(dir);
    });

    mockServer.stop();
});
