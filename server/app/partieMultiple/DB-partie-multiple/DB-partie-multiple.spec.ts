import { PartieMultipleInterface, DBPartieMultiple } from "./DB-partie-multiple";
import { assert } from "chai";
import * as fsx from "fs-extra";
import * as sinon from "sinon";
import { SocketServerService } from "../../socket-io.service";
import { TempsUser } from "../../partie-DB/DB-partie-abstract";

describe("Partie Multiple BD classe", () => {
    let partieMultipleBD: DBPartieMultiple;
    const socket: SocketServerService = new SocketServerService();

    beforeEach(() => {
        partieMultipleBD = new DBPartieMultiple(socket);
    });

    describe("Constructeur", () => {
        it("Devrait etre defini", () => {
            assert.isDefined(partieMultipleBD);
        });

        it("Devrait definir l'attribut baseDeDonnees", () => {
            assert.isDefined(partieMultipleBD["baseDeDonnees"]);
        });

        it("Devrait definir l'attribut modelPartie", () => {
            assert.isDefined(partieMultipleBD["modelPartie"]);
        });

        it("Devrait definir l'attribut modelPartieArray", () => {
            assert.isDefined(partieMultipleBD["modelPartieArray"]);
        });

        it("Devrait definir l'attribut schemaArray", () => {
            assert.isDefined(partieMultipleBD["schemaArray"]);
        });

        it("Devrait definir l'attribut schema", () => {
            assert.isDefined(partieMultipleBD["schema"]);
        });
    });

    describe("Fonction makeDirectory", () => {
        it("Devrait appeller la fonction makeDirectory", () => {
            // tslint:disable-next-line:no-any
            const spy: sinon.SinonSpy = sinon.spy<any>(partieMultipleBD, "makeDirectory");
            const resultatAttendu: string = "../Images";

            partieMultipleBD["makeDirectory"](resultatAttendu);

            assert(spy.calledOnce);
        });
    });

    describe("Fonction deleteImagesDirectory", () => {
        it("Devrait appeller la fonction remove de fsx", () => {
            const stub: sinon.SinonStub = sinon.stub(fsx, "remove").withArgs(sinon.match.string);
            const resultatAttendu: string = "../Images";

            partieMultipleBD["deleteImagesDirectory"]().catch();

            assert(stub.calledOnce);
            assert(stub.calledWith(resultatAttendu));
        });
    });

    describe("Fonction enregistrerPartieMultiple", () => {
        it("Devrait appeller la fonction deleteImagesDirectory", () => {
            const stub: sinon.SinonStub = sinon.stub(fsx, "remove").withArgs(sinon.match.string);
            // tslint:disable-next-line:no-any
            const spy: sinon.SinonSpy = sinon.spy<any>(partieMultipleBD, "deleteImagesDirectory");

            const unePartie: PartieMultipleInterface = {
                _id: "1",
                _nomPartie: "unePartie",
                _tempsSolo: new Array<TempsUser>(),
                _tempsUnContreUn: new Array<TempsUser>(),
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

            partieMultipleBD["enregistrerPartieMultiple"](unePartie).catch();

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
                _tempsSolo: new Array<TempsUser>(),
                _tempsUnContreUn: new Array<TempsUser>(),
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
        it("Devrait appeller la fonction getImageDiffAsArray", async() => {
            // tslint:disable-next-line:no-any
            const spy: sinon.SinonSpy = sinon.spy<any>(partieMultipleBD, "getImageDiffAsArray");

            const unePartie: PartieMultipleInterface = {
                _id: "1",
                _nomPartie: "unePartie",
                _tempsSolo: new Array<TempsUser>(),
                _tempsUnContreUn: new Array<TempsUser>(),
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

            await partieMultipleBD["ajouterImagesPartieMultiple"](unePartie, "");

            assert(spy.calledOnce);
        });
    });

    afterEach(() => {
        sinon.restore();
    });
});
