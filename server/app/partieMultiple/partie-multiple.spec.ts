// import { DBPartieMultiple, PartieMultipleInterface } from "./partie-multiple";
// import { assert } from "chai";
// import * as fsx from "fs-extra";
// import * as sinon from "sinon";
// import { Response } from "express";

// describe("Partie Multiple BD classe", () => {
//     let partieMultipleBD: DBPartieMultiple;

//     beforeEach(() => {
//         partieMultipleBD = new DBPartieMultiple();
//     });

//     describe("Constructeur", () => {
//         it("Devrait etre defini", () => {
//             assert.isDefined(partieMultipleBD);
//         });

//         it("Devrait definir l'attribut basseDeDonnees", () => {
//             assert.isDefined(partieMultipleBD["baseDeDonnees"]);
//         });

//         it("Devrait definir l'attribut modelPartie", () => {
//             assert.isDefined(partieMultipleBD["modelPartie"]);
//         });

//         it("Devrait definir l'attribut modelPartieArray", () => {
//             assert.isDefined(partieMultipleBD["modelPartieArray"]);
//         });

//         it("Devrait definir l'attribut schemaArray", () => {
//             assert.isDefined(partieMultipleBD["schemaArray"]);
//         });

//         it("Devrait definir l'attribut schema", () => {
//             assert.isDefined(partieMultipleBD["schema"]);
//         });
//     });

//     describe("Fonction deleteImagesDirectory", () => {
//         it("Devrait appeller la fonction remove de fsx", () => {
//             const stub: sinon.SinonStub = sinon.stub(fsx, "remove").withArgs(sinon.match.string);
//             const resultatAttendu: string = "../Images";

//             partieMultipleBD["deleteImagesDirectory"]();

//             assert(stub.calledOnce);
//             assert(stub.calledWith(resultatAttendu));
//         });
//     });

//     describe("Fonction enregistrerPartieMultiple", () => {
//         it("Devrait appeller la fonction dleteImagesDirectory", () => {
//             const stub: sinon.SinonStub = sinon.stub(fsx, "remove").withArgs(sinon.match.string);
//             // tslint:disable-next-line:no-any
//             const spy: sinon.SinonSpy = sinon.spy<any>(partieMultipleBD, "deleteImagesDirectory");

//             const unePartie: PartieMultipleInterface = {
//                 _id: "1",
//                 _nomPartie: "unePartie",
//                 _tempsSolo: new Array<number>(),
//                 _tempsUnContreUn: new Array<number>(),
//                 _image1PV1: Buffer.alloc(1),
//                 _image1PV2: Buffer.alloc(1),
//                 _image2PV1: Buffer.alloc(1),
//                 _image2PV2: Buffer.alloc(1),
//                 _imageDiff1: Buffer.alloc(1),
//                 _imageDiff2: Buffer.alloc(1),
//                 _quantiteObjets: 1,
//                 _theme: "theme",
//                 _typeModification: "a",
//             };

//             partieMultipleBD["enregistrerPartieMultiple"](unePartie, {} as Response, "erreur");

//             assert(spy.calledOnce);
//             assert(stub.calledOnce);
//         });
//     });

//     afterEach(() => {
//         sinon.restore();
//     });
// });
