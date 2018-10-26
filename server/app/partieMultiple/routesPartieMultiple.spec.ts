import { PartieMultipleInterface } from "./partie-multiple";
import * as WebRequest from "web-request";
import * as assert from "assert";

const URL_BASE: string = "http://localhost:3000/partieMultiple/getListePartieMultiple";

describe("Route Partie Multiple classe", () => {
    describe("requete get", () => {
        it("Devrait retourner un tableau d'une longueur differente de 0", async () => {
            const resultat: PartieMultipleInterface[] = await WebRequest.json<PartieMultipleInterface[]>(URL_BASE);

            assert.notEqual(resultat.length, 0);
        });

        it("Devrait retourner des donnees", async () => {
            const resultat: PartieMultipleInterface[] = await WebRequest.json<PartieMultipleInterface[]>(URL_BASE);

            assert.ok(resultat);
        });
    });
});
