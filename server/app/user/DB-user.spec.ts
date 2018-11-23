import { assert } from "chai";
import { DBUser } from "./DB-user";
import { SocketServerService } from "../socket-io.service";


describe("BaseDeDonneesUsager classe", () => {
    describe("Constructeur", () => {
        let user: DBUser;
        const socket: SocketServerService = new SocketServerService();

        beforeEach(() => {
            user = new DBUser(socket);
        });

        describe("Constructeur", () => {
            it ("Devrait etre defini", () => {
                assert.isDefined(user);
            });

            it("Devrait definir l'attribut baseDeDonnes", () => {
                assert.isDefined(user["baseDeDonnees"]);
            });

            it("Devrait definir l'attribut schema", () => {
                assert.isDefined(user["schema"]);
            });

            it("Devrait definir l'attribut modelUser", () => {
                assert.isDefined(user["modelUser"]);
            });
        });
    });
});
