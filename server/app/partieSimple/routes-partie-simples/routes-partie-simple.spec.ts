import * as WebRequest from "web-request";
import * as assert from "assert";
import { PartieSimpleInterface } from "../../../../common/partie-simple-interface";


const URL_BASE: string = "http://localhost:3000/partieSimple";

describe("Routes Partie Simple classe", () => {
    describe("Requete GET", () => {
        it("Devrait récuperer des donnees", async () => {
            const uri: string = URL_BASE + "/getListePartieSimple";
            const resultat: PartieSimpleInterface[] = await WebRequest.json<PartieSimpleInterface[]>(uri);

            assert.ok(resultat);
        });

        it("Devrait retourner un tableau de longueur différente à 0", async () => {
            const uri: string = URL_BASE + "/getListePartieSimple";
            const resultat: PartieSimpleInterface[] = await WebRequest.json<PartieSimpleInterface[]>(uri);

            assert.notStrictEqual(resultat.length, 0);
        });
    });
});
