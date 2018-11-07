import { DBPartieSimple, PartieSimpleInterface } from "./DB-partie-simple";
import { assert } from "chai";
import * as fsx from "fs-extra";
import * as sinon from "sinon";
import { SocketServerService } from "../../socket-io.service";

describe("Partie Simple BD classe", () => {
    let dbPartieSimple: DBPartieSimple;
    const socket: SocketServerService = new SocketServerService();

    beforeEach(async () => {
        dbPartieSimple = await new DBPartieSimple(socket);
    });

    describe("Constructeur", () => {
        it("Devrait etre defini", () => {
            assert.isDefined(dbPartieSimple);
        });
        it("Devrait definir l'attribut basseDeDonnees", () => {
            assert.isDefined(dbPartieSimple["baseDeDonnees"]);
        });

        it("Devrait definir l'attribut modelPartieBuffer", () => {
            assert.isDefined(dbPartieSimple["modelPartieBuffer"]);
        });

        it("Devrait definir l'attribut modelPartieArray", () => {
            assert.isDefined(dbPartieSimple["modelPartieArray"]);
        });

        it("Devrait definir l'attribut schemaArray", () => {
            assert.isDefined(dbPartieSimple["schemaArray"]);
        });

        it("Devrait definir l'attribut schemaBuffer", () => {
            assert.isDefined(dbPartieSimple["schemaBuffer"]);
        });
    });

    describe("Fonction deleteImagesDirectory", () => {
        it("Devrait appeller la fonction remove de fsx", () => {
            const stub: sinon.SinonStub = sinon.stub(fsx, "remove").withArgs(sinon.match.string);
            const resultatAttendu: string = "../Images";

            dbPartieSimple["deleteImagesDirectory"]();

            assert(stub.calledOnce);
            assert(stub.calledWith(resultatAttendu));
        });
    });

    describe("Fonction traiterMessageErreur", () => {
        it("Devrait appeller la fonction dleteImagesDirectory si errorMsg n'est pas nul", () => {
            const stub: sinon.SinonStub = sinon.stub(fsx, "remove").withArgs(sinon.match.string);
            // tslint:disable-next-line:no-any
            const spy: sinon.SinonSpy = sinon.spy<any>(dbPartieSimple, "deleteImagesDirectory");

            const unePartie: PartieSimpleInterface = {
                _id: "1",
                _nomPartie: "unePartie",
                _tempsSolo: new Array<number>(),
                _tempsUnContreUn: new Array<number>(),
                _image1: Buffer.alloc(1),
                _image2: Buffer.alloc(1),
                _imageDiff: new Array<Array<string>>(),
            };

            dbPartieSimple["traiterMessageErreur"](unePartie, "erreur");

            assert(spy.calledOnce);
            assert(stub.calledOnce);
        });
    });

    // describe("Fonction enregistrerPartieSimple", () => {
    //     it("Devrait ajouter en element à la BD", async () => {
    //         const nbreElementsBDAvant: number = await dbPartieSimple["modelPartieBuffer"].find().count();

    //         const unePartie: PartieSimpleInterface = {
    //             _id: "1",
    //             _nomPartie: "unePartie",
    //             _tempsSolo: new Array<number>(),
    //             _tempsUnContreUn: new Array<number>(),
    //             _image1: Buffer.alloc(1),
    //             _image2: Buffer.alloc(1),
    //             _imageDiff: new Array<Array<string>>(),
    //         };

    //         dbPartieSimple["enregistrerPartieSimple"](new Array<Array<string>>(), unePartie);

    //         const nbreElementsBDApres: number = await dbPartieSimple["modelPartieBuffer"].find().count();

    //         assert.equal(nbreElementsBDApres, nbreElementsBDAvant + 1);
    //     });
    // });

    afterEach(() => {
        sinon.restore();
    });
});
