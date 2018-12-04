import { ComponentFixture, TestBed } from "@angular/core/testing";
import { VueMultipleComponent } from "./vue-multiple.component";
import { CUSTOM_ELEMENTS_SCHEMA, ErrorHandler } from "@angular/core";
import { MatCardModule, MatDialog } from "@angular/material";
import { FormsModule } from "@angular/forms";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { CookieService } from "ngx-cookie-service";
import { SocketClientService } from "src/app/socket/socket-client.service";
import { Joueur } from "src/app/admin/joueur";
import { Observable } from "rxjs";
import { PartieMultiple } from "src/app/admin/dialog-multiple/partie-multiple";
import { PartieMultipleInterface } from "../../../../../common/partie-multiple-interface";

describe("VueMultipleComponent", () => {
  let component: VueMultipleComponent;
  let fixture: ComponentFixture<VueMultipleComponent>;
  let mockMatDialog: jasmine.SpyObj<MatDialog>;
  let mockCookieService: jasmine.SpyObj<CookieService>;

  beforeEach(() => {
    mockMatDialog = jasmine.createSpyObj([
      "open"
    ]);
    mockCookieService = jasmine.createSpyObj(["get"]);

    TestBed.configureTestingModule({
      declarations: [ VueMultipleComponent ],
      imports: [
          MatCardModule,
          HttpClientTestingModule,
          RouterTestingModule,
          FormsModule
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
      ],
      providers: [
        { provide: CookieService, useValue: mockCookieService },
        { provide: MatDialog, useValue: mockMatDialog },
        SocketClientService
      ]
    });

    fixture = TestBed.createComponent(VueMultipleComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("fonction ajouterTemps devrait appeler ajouterTempsPartieMultiple du service", () => {
    const tempsJoueur: number = 15;
    spyOn(component["partieService"], "ajouterTempsPartieMultiple").and.callThrough();
    component["ajouterTemps"]("", new Joueur("", tempsJoueur), false).catch(() => ErrorHandler);
    expect(component["partieService"]["ajouterTempsPartieMultiple"]).toHaveBeenCalled();
  });

  it("supprimerChannelId devrait appeler la fonction supprimerChannelIdMultiple du service", () => {
    spyOn(component["partieService"], "supprimerChannelIdMultiple").and.callThrough();
    component["supprimerChannelId"]().catch(() => ErrorHandler);
    expect(component["partieService"]["supprimerChannelIdMultiple"]).toHaveBeenCalled();
  });

  describe("setPartie", () => {
    beforeEach(() => {
      const nbOjets: number = 10;
      const partie: PartieMultiple = new PartieMultiple("name", [], [], new Buffer(""), new Buffer(""), new Buffer(""), new Buffer(""),
                                                        new Array<Array<string>>(), new Array<Array<string>>(),
                                                        nbOjets, "geo", "acs", "123");
      spyOn(component["partieService"], "getPartieMultiple").and.returnValue(Observable.of(partie));
    });

    it("devrait appeler la fonction getPartieSimple de partieService", () => {
      component["setPartie"]();
      expect(component["partieService"]["getPartieMultiple"]).toHaveBeenCalled();
    });

    it("setPartie devrait appeler la fonction reconstruirePartieMultiple", () => {

      // tslint:disable-next-line:no-any
      const spy: jasmine.Spy = spyOn<any>(component, "reconstruirePartieMultiple");
      component["setPartie"]();
      expect(spy).toHaveBeenCalled();
    });

    it("devrait appeler la fonction setPartieMultipleMultijoueur si multijoueur est a true", () => {
      component["partieAttributsMultijoueur"]["_isMultijoueur"] = true;
      // tslint:disable-next-line:no-any
      const spy: jasmine.Spy = spyOn<any>(component, "setPartieMultipleMultijoueur");
      component["setPartie"]();
      expect(spy).toHaveBeenCalled();
    });

    it("devrait appeler la fonction afficherPartie si multijoueur est a false", () => {
      component["partieAttributsMultijoueur"]["_isMultijoueur"] = false;
      // tslint:disable-next-line:no-any
      const spy: jasmine.Spy = spyOn<any>(component, "afficherPartie");
      component["setPartie"]();
      expect(spy).toHaveBeenCalled();
    });
  });

  it("reconstruirePartieSimple devrait recreer un object de type partie simple", () => {
    const nbObjets: number = 10;

    const partieInterface: PartieMultipleInterface = { _id: "", _nomPartie: "name", _tempsSolo: [], _tempsUnContreUn: [],
                                                       _image1PV1: Buffer.from(""), _image1PV2: Buffer.from(""),
                                                       _image2PV1: Buffer.from(""), _image2PV2: Buffer.from(""),
                                                       _imageDiff1: new Array<Array<string>>(),
                                                       _imageDiff2: new Array<Array<string>>(),
                                                       _quantiteObjets: nbObjets, _theme: "geo", _typeModification: "acs" };

    component["reconstruirePartieMultiple"](partieInterface);

    const partie: PartieMultiple = new PartieMultiple("name", [], [], new Buffer(""), new Buffer(""), new Buffer(""), new Buffer(""),
                                                      new Array<Array<string>>(), new Array<Array<string>>(),
                                                      nbObjets, "geo", "acs", "");
    expect(component["partie"]).toEqual(partie);
  });
});
