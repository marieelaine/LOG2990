import { DBPartieSimple, PartieSimpleInterface } from "./DB-partie-simple";
import { assert } from "chai";
import * as fsx from "fs-extra";
import * as sinon from "sinon";
import * as constantes from "../../constantes";
import { SocketServerService } from "../../socket-io.service";
import { TempsUser } from "../../partie-DB/DB-partie-abstract";

describe("Partie Simple BD classe", () => {
    let dbPartieSimple: DBPartieSimple;
    const socketService: SocketServerService = new SocketServerService();
    
    beforeEach(() => {
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

    describe("Fonction deleteImagesDirectory", () => {
        it("Devrait appeller la fonction remove de fsx", async () => {
            const stub: sinon.SinonStub = sinon.stub(fsx, "remove").withArgs(sinon.match.string);
            const resultatAttendu: string = "../Images";

            await dbPartieSimple["deleteImagesDirectory"]();

            assert(stub.calledOnce);
            assert(stub.calledWith(resultatAttendu));
        });
    });

    describe("Fonction traiterMessageErreur", () => {
        it("Devrait appeller la fonction deleteImagesDirectory", async() => {
            const stub: sinon.SinonStub = sinon.stub(fsx, "remove").withArgs(sinon.match.string);
            // tslint:disable-next-line:no-any
            const spy: sinon.SinonSpy = sinon.spy<any>(dbPartieSimple, "deleteImagesDirectory");
            const stubSocket: sinon.SinonStub = sinon.stub(dbPartieSimple["socket"], "envoyerMessageErreurDifferences");
            stubSocket.onCall(0).callThrough();
            
            const unePartie: PartieSimpleInterface = {
                _id: "1",
                _nomPartie: "unePartie",
                _tempsSolo: new Array<TempsUser>(),
                _tempsUnContreUn: new Array<TempsUser>(),
                _image1: Buffer.alloc(1),
                _image2: Buffer.alloc(1),
                _imageDiff: new Array<Array<string>>(),
            };

            await dbPartieSimple["traiterMessageErreur"](unePartie, "erreur");

            assert(spy.calledOnce);
            assert(stub.calledOnce);
        });
    });

    afterEach(async() => {
        sinon.restore();
        const dir: string = constantes.IMAGES_DIRECTORY;
        await fsx.remove(dir);
    });
});
