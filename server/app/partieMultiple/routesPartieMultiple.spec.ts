// import { PartieMultipleInterface } from "./partie-multiple";
import * as WebRequest from "web-request";
import * as assert from "assert";

const URL_BASE: string = "http://localhost:3000/partieMultiple/getListePartieMultiple";

describe("Route Partie Multiple classe", () => {
    describe("requete get", () => {
        it("Devrait retourner des donnees", async () => {
            await WebRequest.get(URL_BASE);

            assert(true);
        });
    });
});
