import { PartieMultipleMultijoueur } from "./partie-multiple-multijoueur";
import { assert } from "chai";
import * as sinon from "sinon";
import { SocketServerService } from "../../socket-io.service";

describe("Partie Simple Multijoueur classe", () => {
    let partieMultipleMultijoueur: PartieMultipleMultijoueur;
    const socketService: SocketServerService = new SocketServerService();
    beforeEach(() => {
        partieMultipleMultijoueur = new PartieMultipleMultijoueur(socketService);
    });

    describe("Constructeur", () => {
        it("Devrait etre defini", () => {
            assert.isDefined(partieMultipleMultijoueur);
        });
    });

    afterEach(async() => {
        sinon.restore();
    });
});
