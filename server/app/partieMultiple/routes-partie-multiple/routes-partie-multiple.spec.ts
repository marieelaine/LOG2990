import * as WebRequest from "web-request";
import * as assert from "assert";
import { PartieMultipleInterface } from "../../../../common/partie-multiple-interface";
import { BASE_URL } from "../../../../client/src/app/constantes";

const URL_LISTMULTIPLE: string = BASE_URL + "partieMultiple/getListePartieMultiple";
const URL_ID_PARTIE: string = BASE_URL + "partieMultiple/getPartieMultiple/5bedbb0dcd7e8a0f51044106";
const URL_ID: string = BASE_URL + "partieMultiple/:id";

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
