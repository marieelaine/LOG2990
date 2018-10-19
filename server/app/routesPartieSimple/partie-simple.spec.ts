import { assert } from "chai";
import { RoutePartieSimple } from "./partie-simple";

describe("BaseDeDonnees", () => {
    describe("Constructeur", () => {
        let image: RoutePartieSimple;
        beforeEach(() => {
            image = new RoutePartieSimple();
        });

        it ("should do nothing", () => {
            assert(true);
        });

        it ("should be defined", () => {
            assert.isDefined(image);
        });

    });
});
