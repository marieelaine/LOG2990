import { PartieMultipleInterface } from "./partie-multiple";
import * as WebRequest from "web-request";
import * as assert from "assert";

const URL_LISTMULTIPLE: string = "http://localhost:3000/partieMultiple/getListePartieMultiple";
const URL_ID_PARTIE: string = "http://localhost:3000/partieMultiple/getPartieMultiple/:id";
const URL_ID: string = "http://localhost:3000/partieMultiple/:id";

describe("Route Partie Multiple classe", () => {
    describe("requete getListePartieMultiple", () => {
        it("Devrait retourner un tableau d'une longueur differente de 0", async () => {
            const resultat: PartieMultipleInterface[] = await WebRequest.json<PartieMultipleInterface[]>(URL_LISTMULTIPLE);

            assert.notEqual(resultat.length, 0);
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

            assert.notEqual(resultat.length, 0);
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

            assert.notEqual(resultat.length, 0);
        });

        it("Devrait retourner des donnees", async () => {
            const resultat: PartieMultipleInterface[] = await WebRequest.json<PartieMultipleInterface[]>(URL_ID);

            assert.ok(resultat);
        });
    });
});
