import { assert } from "chai";
import { RouteBaseDeDonnees } from "./baseDeDonnees";

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

        it("should call seConnecter()", () => {

        });
    });
});
