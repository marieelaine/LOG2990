
import { assert } from "chai";
import { BaseDeDonnees } from "./baseDeDonnees";
import * as sinon from "sinon";

describe("BaseDeDonnees classe", () => {
    let db: BaseDeDonnees;
    let connectStub: sinon.SinonStub;

    beforeEach(() => {
        db = new BaseDeDonnees();
        connectStub = sinon.stub(db.mongoose, "connect").withArgs(sinon.match.string, sinon.match.object);
    });

    describe("Constructeur", () => {
        it("Devrait etre defini", () => {
            assert.isDefined(db);
        });

        it("Devrait appeller la fonction seConnecter", async() => {
            await db["seConnecter"]();
            assert(connectStub.calledOnce);
        });
    });

    describe("Fonction assurerConnection", () => {
        it("Devrait appeller la fonction connect de Mongoose", async () => {
            await db.assurerConnection();

            assert(connectStub.calledOnce);
        });
    });

    afterEach(() => {
        sinon.restore();
    });
});
