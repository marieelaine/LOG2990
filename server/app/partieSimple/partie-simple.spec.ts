import { assert } from "chai";
import { DBPartieSimple } from "./partie-simple";

describe("BaseDeDonnees", () => {
    describe("Constructeur", () => {
        let image: DBPartieSimple;
        beforeEach(() => {
            image = new DBPartieSimple();
        });

        it ("should do nothing", () => {
            assert(true);
        });

        it ("should be defined", () => {
            assert.isDefined(image);
        });

    });
});
