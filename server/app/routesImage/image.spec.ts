import { assert } from "chai";
import { RouteImage } from "./image";

describe("BaseDeDonnees", () => {
    describe("Constructeur", () => {
        let image: RouteImage.Image;
        beforeEach(() => {
            image = new RouteImage.Image();
        });

        it ("should do nothing", () => {
            assert(true);
        });

        it ("should be defined", () => {
            assert.isDefined(image);
        });

    });
});