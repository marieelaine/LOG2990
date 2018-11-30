import { DBPartieAbstract, TempsUser } from "../partie-DB/DB-partie-abstract";
import { PartieSimpleInterface } from "../partieSimple/DB-partie-simple/DB-partie-simple";
import { PartieMultipleInterface } from "../partieMultiple/DB-partie-multiple/DB-partie-multiple";
import { ChildProcess } from "child_process";
import { Request, Response } from "express";
import { assert } from "chai";
import sinon = require("sinon");
import { Schema } from "mongoose";
import * as constantes from "../constantes";
import * as fs from "fs";
import * as fsx from "fs-extra";

class DBPartie extends DBPartieAbstract {

    protected listeChannelsMultijoueur: Map<string, number>;

    public constructor() {
        super();

        this.schemaArray = new Schema({});
        this.schemaBuffer = new Schema({});
    }

    public async requeteAjouterPartie(req: Request, res: Response): Promise<void> { ""; }

    public async requeteDeletePartie(req: Request, res: Response): Promise<void> { ""; }

    protected envoyerPartiesPretes(channelId: string): void { ""; }

    protected async reinitialiserTemps(idPartie: String, tempsSolo: Array<TempsUser>,
                                       tempsUnContreUn: Array<TempsUser>): Promise<void> { ""; }

    protected async ajouterTemps(idPartie: string, temps: TempsUser, isSolo: boolean): Promise<void> { ""; }

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

    protected createSchemaArray(): void { ""; }

    protected createSchemaBuffer(): void { ""; }
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
    });

    describe("Fonction makeImagesDirectory", () => {
        it("Devrait appeller la fonction makeDirectory", async() => {
            // tslint:disable-next-line:no-any
            const spy: sinon.SinonSpy = sinon.spy<any>(fs, "mkdir").withArgs(sinon.match.string);

            await dbPartie["makeImagesDirectory"]();

            assert(spy.calledOnce);
        });
    });

    afterEach(async() => {
        sinon.restore();
        const dir: string = constantes.IMAGES_DIRECTORY;
        await fsx.remove(dir);
    });
});
