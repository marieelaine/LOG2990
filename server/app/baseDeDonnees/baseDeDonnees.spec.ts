
import { assert } from "chai";
import { BaseDeDonnees } from "./baseDeDonnees";

describe("BaseDeDonnees", () => {
    let db: BaseDeDonnees;
    beforeEach(() => {
        db = new BaseDeDonnees();
    });

    describe("Constructeur", () => {
        it("Devrait etre defini", () => {
            assert.isDefined(db);
        });

        it("Devrait avoir un schema", () => {
            assert.isDefined(db["schema"]);
        });
    });
});
