import * as WebRequest from "web-request";
import { expect } from "chai";

const URL_BASE: string = "http://localhost:3000/";

describe("Partie Simple Attente Routes", () => {
    it("Devrait recuperer une liste de partie simple vide", async () => {
        const uri: string = URL_BASE + "getPartieSimpleEnAttente";

        const result: string[] = await WebRequest.json<string[]>(uri);

        expect(result.length).to.equal(0);
    });
});
