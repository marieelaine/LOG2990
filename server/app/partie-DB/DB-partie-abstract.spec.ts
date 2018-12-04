import { DBPartieAbstract, Joueur } from "../partie-DB/DB-partie-abstract";
import { ChildProcess } from "child_process";
import { Request, Response } from "express";
import { assert } from "chai";
import sinon = require("sinon");
import { Schema } from "mongoose";
import * as constantes from "../constantes";
import * as fs from "fs";
import * as fsx from "fs-extra";
import { PartieSimpleInterface } from "../../../common/partie-simple-interface";
import { PartieMultipleInterface } from "../../../common/partie-multiple-interface";
import * as mockHttp from "node-mocks-http";

class DBPartie extends DBPartieAbstract {

    protected listeChannelsMultijoueur: Map<string, number>;

    public constructor() {
        super();

        this.schemaArray = new Schema({});
        this.schemaBuffer = new Schema({});
        this.listeChannelsMultijoueur = new Map();
    }

    public async requeteAjouterPartie(req: Request, res: Response): Promise<void> { ""; }

    public async requeteDeletePartie(req: Request, res: Response): Promise<void> { ""; }

    protected envoyerPartiesPretes(channelId: string): void { ""; }

    protected async trierTemps(idPartie: String, temps: Array<Joueur>, typeDeTemps: string): Promise<Array<Joueur>> { return []; }

    protected async ajouterTemps(idPartie: string, temps: Joueur, isSolo: boolean): Promise<void> { ""; }

    protected envoyerMeilleurTemps(joueur: Joueur, nomPartie: string, isSolo: boolean, temps: Array<Joueur>): void { ""; }

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
        return Promise.resolve(res);
    }

    protected async verifierErreurScript(child: ChildProcess,
                                         partie: PartieSimpleInterface | PartieMultipleInterface): Promise<void> { ""; }

    protected creerSchemaArray(): void { ""; }

    protected creerSchemaBuffer(): void { ""; }

}

describe("DBPartieAbstract", () => {
    let dbPartie: DBPartie;

    beforeEach(() => {
        dbPartie = new DBPartie();
    });

    describe("Constructeur", () => {
        it("Devrait etre defini", () => {
            assert.isDefined(dbPartie);
        });
        it("Devrait definir l'attribut basseDeDonnees", () => {
            assert.isDefined(dbPartie["baseDeDonnees"]);
        });

        it("Devrait definir l'attribut schemaArray", () => {
            assert.isDefined(dbPartie["schemaArray"]);
        });

        it("Devrait definir l'attribut schemaBuffer", () => {
            assert.isDefined(dbPartie["schemaBuffer"]);
        });

        it("Devrait definir l'attribut listeChannelsMultijoueur", () => {
            assert.isDefined(dbPartie["listeChannelsMultijoueur"]);
        });
    });

    describe("Fonction creerFichierImages", () => {
        it("Devrait appeller la fonction makeDirectory", async() => {
            // tslint:disable-next-line:no-any
            const spy: sinon.SinonSpy = sinon.spy<any>(fs, "mkdir").withArgs(sinon.match.string);

            await dbPartie["creerFichierImages"]();

            assert(spy.calledOnce);
        });
    });

    describe("Fonction supprimerFichierImages", () => {
        it("Devrait appeller la fonction remove de fsx", async () => {
            const stub: sinon.SinonStub = sinon.stub(fsx, "remove").withArgs(sinon.match.string);
            const resultatAttendu: string = "../Images";

            await dbPartie["supprimerFichierImages"]();

            assert(stub.calledOnce);
            assert(stub.calledWith(resultatAttendu));
        });
    });

    describe("Fonction getChannelId", () => {
        it("Devrait appeller la fonction getChannelId", () => {

            // tslint:disable-next-line:no-any
            const testString: any = dbPartie["getChannelId"]();
            assert.isDefined(testString);
            assert.isString(testString);
        });
    });

    describe("Requetes", () => {
        it("Devrait appeller la requete requeteGetChannelId", () => {
            // tslint:disable-next-line:no-any
            const spy: sinon.SinonSpy = sinon.spy<any>(dbPartie, "getChannelId");
            const req: mockHttp.MockRequest<Request> = mockHttp.createRequest({
                method: "GET",
                url: "localhost:3000/partieSimple/getChannelIdMultiple",
                body: {
                    _id: "432",
                    _channelId: "2"
                },
                params: {
                    _id: "432",
                    _channelId: "2"
                }
            });

            const res: mockHttp.MockResponse<Response> = mockHttp.createResponse();

            // tslint:disable-next-line:no-any
            dbPartie["requeteGetChannelId"](req, res);

            assert(spy.calledOnce);
            // tslint:disable-next-line:no-magic-numbers
            assert.equal(res.statusCode, 201);
        });
    });

    afterEach(async() => {
        sinon.restore();
        const dir: string = constantes.IMAGES_DIRECTORY;
        await fsx.remove(dir);
    });
});
