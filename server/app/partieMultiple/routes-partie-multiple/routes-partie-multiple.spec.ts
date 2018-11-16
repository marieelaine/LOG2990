import { PartieMultipleInterface } from "../DB-partie-multiple/DB-partie-multiple";
import * as WebRequest from "web-request";
import * as assert from "assert";

const URL_LISTMULTIPLE: string = "http://localhost:3000/partieMultiple/getListePartieMultiple";
// id doit exister dans bd, n'est pas un mock
const URL_ID_PARTIE: string = "http://localhost:3000/partieMultiple/getPartieMultiple/5bedbb0dcd7e8a0f51044106";
const URL_ID: string = "http://localhost:3000/partieMultiple/:id";

describe("Route Partie Multiple classe", () => {
    describe("requete getListePartieMultiple", () => {
        it("Devrait retourner un tableau d'une longueur differente de 0", async () => {
            const resultat: PartieMultipleInterface[] = await WebRequest.json<PartieMultipleInterface[]>(URL_LISTMULTIPLE);

            assert.notStrictEqual(resultat.length, 0);
        });

        it("Devrait retourner des donnees", async () => {
            const resultat: PartieMultipleInterface[] = await WebRequest.json<PartieMultipleInterface[]>(URL_LISTMULTIPLE);

            assert.ok(resultat);
        });
    });
});

describe("Route Partie Multiple classe", () => {
    describe("requete get id", () => {
        it("Devrait retourner un tableau d'une longueur differente de 0", async () => {
            const resultat: PartieMultipleInterface[] = await WebRequest.json<PartieMultipleInterface[]>(URL_ID_PARTIE);

            assert.notStrictEqual(resultat.length, 0);
        });

        it("Devrait retourner des donnees", async () => {
            const resultat: PartieMultipleInterface[] = await WebRequest.json<PartieMultipleInterface[]>(URL_ID_PARTIE);

            assert.ok(resultat);
        });
    });
});

describe("Route Partie Multiple classe", () => {
    describe("requete get id", () => {
        it("Devrait retourner un string d'une longueur differente de 0", async () => {
            const resultat: PartieMultipleInterface[] = await WebRequest.json<PartieMultipleInterface[]>(URL_ID);

            assert.notStrictEqual(resultat.length, 0);
        });

        it("Devrait retourner des donnees", async () => {
            const resultat: PartieMultipleInterface[] = await WebRequest.json<PartieMultipleInterface[]>(URL_ID);

            assert.ok(resultat);
        });
    });
});
