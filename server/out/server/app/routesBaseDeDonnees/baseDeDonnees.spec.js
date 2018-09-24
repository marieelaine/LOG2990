"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const baseDeDonnees_1 = require("./baseDeDonnees");
const sinon = require("sinon");
describe("BaseDeDonnees", () => {
    describe("Constructeur", () => {
        let db;
        beforeEach(() => {
            db = new baseDeDonnees_1.RouteBaseDeDonnees.BaseDeDonnees();
        });
        it("should do nothing", () => {
            chai_1.assert(true);
        });
        it("should be defined", () => {
            chai_1.assert.isDefined(db);
        });
        it("should have defined a schema attribute", () => {
            chai_1.assert.isDefined(db["schema"]);
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
            const stub = sinon.stub(db, "obtenirUserId")
                .callsFake(() => {
                return true;
            });
            db["obtenirUserId"]("test");
            sinon.assert.calledOnce(stub);
        });
    });
});
//# sourceMappingURL=baseDeDonnees.spec.js.map