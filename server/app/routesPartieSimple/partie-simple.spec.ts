import { assert } from "chai";
import { RoutePartieSimple } from "./partie-simple";

describe("BaseDeDonnees", () => {
    describe("Constructeur", () => {
        let image: RoutePartieSimple.PartieSimple;
        beforeEach(() => {
            image = new RoutePartieSimple.PartieSimple();
        });

        it ("should do nothing", () => {
            assert(true);
        });

        it ("should be defined", () => {
            assert.isDefined(image);
        });

    });
});
