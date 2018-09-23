import { assert } from "chai";
import { RouteBaseDeDonnees } from "./baseDeDonnees";
import * as sinon from "sinon";

describe("BaseDeDonnees", () => {
    describe("Constructeur", () => {
        let db: RouteBaseDeDonnees.BaseDeDonnees;
        beforeEach(() => {
            db = new RouteBaseDeDonnees.BaseDeDonnees();
        });

        it ("should do nothing", () => {
            assert(true);
        });

        it ("should be defined", () => {
            assert.isDefined(db);
        });

        it("should have defined a schema attribute", () => {
            assert.isDefined(db["schema"]);
        });

        // it("should call ajouterUser()", () => {
        //     // tslint:disable-next-line:no-any
        //     const stub: sinon.SinonStub = sinon.stub(db as any, "ajouterUser")
        //         .callsFake(() => {
        //             return true;
        //         });

        //     const body: Blob = new Blob();
        //     const init: {} = {"status": 200, "statusText": ""};
        //     const res: Response = new Response(body, init);
        //     db["ajouterUser"]({}, res);
        // });

        it("should call obtenirUserId() once", () => {
            // tslint:disable-next-line:no-any
            const stub: sinon.SinonStub = sinon.stub(db as any, "obtenirUserId")
                .callsFake(() => {
                    return true;
                });
            db["obtenirUserId"]("test");
            sinon.assert.calledOnce(stub);
        });
    });
});
