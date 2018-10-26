import { DBPartieSimple } from "./partie-simple";
import { assert } from "chai";

describe("Partie Simple BD classe", () => {
    let dbPartieSimple: DBPartieSimple;

    beforeEach(() => {
        dbPartieSimple = new DBPartieSimple();
    });

    describe("Constructeur", () => {
        it("Devrait etre defini", () => {
            assert.isDefined(dbPartieSimple);
        });
        it("Devrait definir l'attribut basseDeDonnees", () => {
            assert.isDefined(dbPartieSimple["baseDeDonnees"]);
        });

        it("Devrait definir l'attribut modelPartie", () => {
            assert.isDefined(dbPartieSimple["modelPartie"]);
        });

        it("Devrait definir l'attribut modelPartieArray", () => {
            assert.isDefined(dbPartieSimple["modelPartieArray"]);
        });

        it("Devrait definir l'attribut schemaArray", () => {
            assert.isDefined(dbPartieSimple["schemaArray"]);
        });

        it("Devrait definir l'attribut schema", () => {
            assert.isDefined(dbPartieSimple["schema"]);
        });
    });
});
