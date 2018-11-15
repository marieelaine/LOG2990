import { DBPartieAbstract, TempsUser } from "../partie-DB/DB-partie-abstract";
import { PartieSimpleInterface } from "../partieSimple/DB-partie-simple/DB-partie-simple";
import { PartieMultipleInterface } from "../partieMultiple/DB-partie-multiple/DB-partie-multiple";
import { ChildProcess } from "child_process";
import { Request, Response} from "express";
import { assert } from "chai";

class DBPartie extends DBPartieAbstract {
    public async requeteAjouterPartie(req: Request, res: Response): Promise<void> { ""; }

    public async requeteDeletePartie(req: Request, res: Response): Promise<void> { ""; }

    protected async reinitialiserTemps(idPartie: String, tempsSolo: Array<TempsUser>,
                                       tempsUnContreUn: Array<TempsUser>): Promise<void> { ""; }

    protected async getPartieByName(nomPartie: String): Promise<PartieSimpleInterface | PartieMultipleInterface> {
        const partie: PartieSimpleInterface = {     _id: "123",
                                                    _nomPartie: "",
                                                    _tempsSolo: [],
                                                    _tempsUnContreUn: [],
                                                    _image1: Buffer.from([]),
                                                    _image2: Buffer.from([]),
                                                    _imageDiff: []};

        return Promise.resolve(partie);
     }

    protected async getPartieById(partieID: String): Promise<PartieSimpleInterface | PartieMultipleInterface> {
        const partie: PartieSimpleInterface = {     _id: "123",
                                                    _nomPartie: "",
                                                    _tempsSolo: [],
                                                    _tempsUnContreUn: [],
                                                    _image1: Buffer.from([]),
                                                    _image2: Buffer.from([]),
                                                    _imageDiff: []};

        return Promise.resolve(partie);
    }

    protected async obtenirPartieId(nomPartie: String): Promise<string> { return Promise.resolve(""); }

    protected async getListePartie(): Promise<PartieSimpleInterface[] | PartieMultipleInterface[]> {
        const partie: PartieSimpleInterface = {     _id: "123",
                                                    _nomPartie: "",
                                                    _tempsSolo: [],
                                                    _tempsUnContreUn: [],
                                                    _image1: Buffer.from([]),
                                                    _image2: Buffer.from([]),
                                                    _imageDiff: []};
        const a: Array<PartieSimpleInterface> = new Array<PartieSimpleInterface>();
        a.push(partie);

        return Promise.resolve(a);
    }

    protected async deletePartie(idPartie: string, res: Response): Promise<Response> {
        // tslint:disable-next-line:typedef
        const httpMocks = require("node-mocks-http");

        return Promise.resolve(httpMocks.createReponse());
    }

    protected async verifierErreurScript(child: ChildProcess,
                                         partie: PartieSimpleInterface | PartieMultipleInterface): Promise<void> { ""; }

    protected CreateSchemaArray(): void { ""; }

    protected CreateSchemaBuffer(): void { ""; }
}

describe("DBPartieAbstract", () => {

    let dbPartie: DBPartie;

    beforeEach(() => {
        dbPartie = new DBPartie();
    });

    it("getSortedTimes devrait sort un array de TempsUser", () => {
        const user1: TempsUser = { _user: "", _temps: 1 };
        const user2: TempsUser = { _user: "", _temps: 2 };

        let array: Array<TempsUser> = [user2, user1];

        array = dbPartie["getSortedTimes"](array);

        const expectedArray: Array<TempsUser> = [user1, user2];

        assert.equal(expectedArray, array);
    });
});
