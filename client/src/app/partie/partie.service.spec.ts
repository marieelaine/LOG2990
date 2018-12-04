import { TestBed } from "@angular/core/testing";
import { PartieService } from "./partie.service";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import * as constantes from "../constantes";
import { PartieSimpleInterface } from "../../../../common/partie-simple-interface";
import { PartieMultipleInterface } from "../../../../common/partie-multiple-interface";

const partieSimple: PartieSimpleInterface = {
    _id: "id",
    _nomPartie: "name",
    _tempsSolo: [],
    _tempsUnContreUn: [],
    _image1: new Buffer(""),
    _image2: new Buffer(""),
    _imageDiff: [[]]
};

const partieMultiple: PartieMultipleInterface = {
    _id: "id",
    _nomPartie: "name",
    _tempsSolo: [],
    _tempsUnContreUn: [],
    _image1PV1: new Buffer(""),
    _image1PV2: new Buffer(""),
    _image2PV1: new Buffer(""),
    _image2PV2: new Buffer(""),
    _imageDiff1: [[]],
    _imageDiff2: [[]],
    _quantiteObjets: 10,
    _theme: "geo",
    _typeModification: "a"
};

describe("PartieService", () => {
    let service: PartieService;
    let http: HttpTestingController;
    const responseForm: string = constantes.RESPONSE_FORM;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                PartieService
            ],
            imports: [
                HttpClientTestingModule,
            ],
        });

        service = TestBed.get(PartieService);
        http = TestBed.get(HttpTestingController);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });

    describe("Fonction getPartieSimpleInterface", () => {
        it("GET request should be called with proper arguments", () => {
            let partieResponse: PartieSimpleInterface = partieSimple;
            const partie: PartieSimpleInterface = partieResponse;
            const id: string = "id";

            service.getPartieSimple(id).subscribe((response) => {
                partieResponse = response;

                http.expectOne({
                    url: constantes.GET_PARTIE_SIMPLE + id,
                    method: constantes.METHODE_GET
                }).flush(responseForm);

                expect(partieResponse).toEqual(partie);
            });

        });
    });

    describe("Fonction getPartieMultipleInterface", () => {
        it("GET request should be called with proper arguments", () => {
            let partieResponse: PartieMultipleInterface = partieMultiple;
            const id: string = "id";
            const partie: PartieMultipleInterface = partieResponse;

            service.getPartieMultiple(id).subscribe((response) => {
                partieResponse = response;

                http.expectOne({
                    url: constantes.GET_PARTIE_MULTIPLE + id,
                    method: constantes.METHODE_GET
                }).flush(responseForm);

                expect(partieResponse).toEqual(partie);
            });

        });
    });

});
