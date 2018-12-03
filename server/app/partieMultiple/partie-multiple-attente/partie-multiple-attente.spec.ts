import * as WebRequest from "web-request";
import { expect } from "chai";
import { BASE_URL } from "../../../../client/src/app/constantes";

describe("Partie Multiple Attente", () => {
    it("Devrait recuperer une liste de partie multiple vide", async () => {
        const uri: string = BASE_URL + "getPartieMultipleEnAttente";

        const result: string[] = await WebRequest.json<string[]>(uri);

        expect(result.length).to.equal(0);
    });
});
