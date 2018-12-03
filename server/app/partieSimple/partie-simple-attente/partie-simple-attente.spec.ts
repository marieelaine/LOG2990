import * as WebRequest from "web-request";
import { expect } from "chai";
import { BASE_URL } from "../../../../client/src/app/constantes";

describe("Partie Simple Attente Routes", () => {
    it("Devrait recuperer une liste de partie simple vide", async () => {
        const uri: string = BASE_URL + "getPartieSimpleEnAttente";

        const result: string[] = await WebRequest.json<string[]>(uri);

        expect(result.length).to.equal(0);
    });
});
