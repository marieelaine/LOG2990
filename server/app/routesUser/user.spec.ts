import { assert } from "chai";
import { User } from "./user";

describe("BaseDeDonnees", () => {
    describe("Constructeur", () => {
        let db: User;
        beforeEach(() => {
            db = new User();
        });

        it ("should do nothing", () => {
            assert(true);
        });

        it ("should be defined", () => {
            assert.isDefined(db);
        });

    });
});
