import { DBPartieMultiple } from "./partie-multiple";
import { assert } from "chai";

describe("Partie Multiple BD classe", () => {
    let partieMultipleBD: DBPartieMultiple;

    beforeEach(() => {
        partieMultipleBD = new DBPartieMultiple();
    });

    it("Devrait etre defini", () => {
        assert.isDefined(partieMultipleBD);
    });
});
