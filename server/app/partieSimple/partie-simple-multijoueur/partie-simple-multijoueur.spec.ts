import { PartieSimpleMultijoueur } from "./partie-simple-multijoueur";
import { assert } from "chai";
// import * as sinon from "sinon";
// import * as request from "request";
import { SocketServerService } from "../../socket-io.service";
// import { Joueur } from "../../partie-DB/DB-partie-abstract";

// const mainRoute: string = "/partieSimple";

describe("Partie Simple Multijoueur classe", () => {
    let partieSimpleMultijoueur: PartieSimpleMultijoueur;
    const socketService: SocketServerService = new SocketServerService();
    beforeEach(() => {
        partieSimpleMultijoueur = new PartieSimpleMultijoueur(socketService);
        // const get: sinon.SinonStub = sinon.stub(request, "get");
        // const post: sinon.SinonStub = sinon.stub(request, "post");
    });

    describe("Constructeur", () => {
        it("Devrait etre defini", () => {
            assert.isDefined(partieSimpleMultijoueur);
        });
    });

    // describe("POST /differenceTrouveeMultijoueurSimple", () => {
    //     it("should return the movie that was added", (done: MochaDone) => {
    //         request.get.yields(null, null, JSON.stringify({

    //         }));
    //     });
    // });

    // afterEach(async() => {
    //     sinon.restore();
    //     request.get.restore();
    //     request.post.restore();
    // });
});
