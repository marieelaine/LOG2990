import { assert } from "chai";
import { RouteBaseDeDonnees } from "./baseDeDonnees";

describe("BaseDeDonnees", () => {
    describe("Constructeur", () => {
        it ("should do nothing", () => {
            assert(true);
        });

        it ("should be defined", () => {
            const db: RouteBaseDeDonnees.BaseDeDonnees = new RouteBaseDeDonnees.BaseDeDonnees();
            assert.isDefined(db);
        });

    });
});
