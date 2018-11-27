import * as WebRequest from "web-request";
import { expect } from "chai";

const URL_BASE: string = "http://localhost:3000/";

describe("Partie Multiple Attente", () => {
    it("Devrait recuperer une liste de partie multiple vide", async () => {
        const uri: string = URL_BASE + "getPartieMultipleEnAttente";

        const result: string[] = await WebRequest.json<string[]>(uri);

        expect(result.length).to.equal(0);
    });
});
