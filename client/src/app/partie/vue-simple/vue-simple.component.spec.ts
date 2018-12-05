import { ComponentFixture, TestBed } from "@angular/core/testing";
import { VueSimpleComponent } from "./vue-simple.component";
import { PartieSimple } from "src/app/admin/dialog-simple/partie-simple";
import { MatCardModule, MatDialog } from "@angular/material";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { ChatComponent } from "src/app/chat/chat.component";
import { CookieService } from "ngx-cookie-service";
import { Joueur } from "src/app/admin/joueur";
import { SocketClientService } from "src/app/socket/socket-client.service";
import { Observable } from "rxjs";
import { PartieSimpleInterface } from "../../../../../common/partie-simple-interface";
import { FormsModule } from "@angular/forms";
import { ErrorHandler } from "@angular/core";

export class MockEvent {
    public offsetX: number;
    public offsetY: number;
    public srcElement: MockCanvas;
    public constructor(offsetX: number, offsetY: number, srcElement: MockCanvas) {
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.srcElement = srcElement;
    }
}

export class MockCanvas {
    public constructor() {
    }

    public getContext(context: string): CanvasRenderingContext2D {
        return new CanvasRenderingContext2D();
    }
}

describe("VueSimpleComponent", () => {
    let mockMatDialog: jasmine.SpyObj<MatDialog>;
    let mockCookieService: jasmine.SpyObj<CookieService>;

    let component: VueSimpleComponent;
    let fixture: ComponentFixture<VueSimpleComponent>;

    beforeEach(() => {
        mockMatDialog = jasmine.createSpyObj([
            "open"
        ]);
        mockCookieService = jasmine.createSpyObj(["get"]);

        TestBed.configureTestingModule({
            declarations: [VueSimpleComponent, ChatComponent],
            imports: [
                MatCardModule,
                HttpClientTestingModule,
                RouterTestingModule,
                FormsModule
            ],
            providers: [
                { provide: CookieService, useValue: mockCookieService },
                { provide: MatDialog, useValue: mockMatDialog },
                SocketClientService
            ]
        });

        fixture = TestBed.createComponent(VueSimpleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        component["partie"] = new PartieSimple(
            "nomPartie", new Array<Joueur>(), new Array<Joueur>(),
            Buffer.from(new Array<number>()), Buffer.from(new Array<number>()), new Array<Array<string>>(), "");
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("fonction ajouterTemps devrait appeler ajouterTempsPartieSimple du service", () => {
        const tempsJoueur: number = 15;
        spyOn(component["partieService"], "ajouterTempsPartieSimple").and.callThrough();
        component["ajouterTemps"]("", new Joueur("", tempsJoueur), false).catch(() => ErrorHandler);
        expect(component["partieService"]["ajouterTempsPartieSimple"]).toHaveBeenCalled();
    });

    it("supprimerChannelId devrait appeler la fonction supprimerChannelIdSimple du service", () => {
        spyOn(component["partieService"], "supprimerChannelIdSimple").and.callThrough();
        component["supprimerChannelId"]().catch(() => ErrorHandler);
        expect(component["partieService"]["supprimerChannelIdSimple"]).toHaveBeenCalled();
    });

    describe("setPartie", () => {
        beforeEach(() => {
            const partie: PartieSimple = new PartieSimple("name", [], [], new Buffer(""), new Buffer(""), [[]]);
            spyOn(component["partieService"], "getPartieSimple").and.returnValue(Observable.of(partie));
        });

        it("devrait appeler la fonction getPartieSimple de partieService", () => {
            component["setPartie"]();
            expect(component["partieService"]["getPartieSimple"]).toHaveBeenCalled();
        });

        it("devrait appeler la fonction reconstruirePartieSimple", () => {

            // tslint:disable-next-line:no-any
            const spy: jasmine.Spy = spyOn<any>(component, "reconstruirePartieSimple");
            component["setPartie"]();
            expect(spy).toHaveBeenCalled();
        });

        it("devrait appeler la fonction setPartieSimpleMultijoueur si multijoueur est a true", () => {
            component["partieAttributsMultijoueur"]["_isMultijoueur"] = true;
            // tslint:disable-next-line:no-any
            const spy: jasmine.Spy = spyOn<any>(component, "setPartieSimpleMultijoueur");
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
        const partieInterface: PartieSimpleInterface = { _id: "", _nomPartie: "", _tempsSolo: [], _tempsUnContreUn: [],
                                                         _image1: Buffer.from(new Array<number>()),
                                                         _image2: Buffer.from(new Array<number>()),
                                                         _imageDiff: new Array<Array<string>>() };
        component["reconstruirePartieSimple"](partieInterface);

        const resultatAttendu: PartieSimple = new PartieSimple("", [], [], Buffer.from(new Array<number>()),
                                                               Buffer.from(new Array<number>()), new Array<Array<string>>());
        expect(component["partie"]).toEqual(resultatAttendu);
    });

    describe("setup", () => {
        beforeEach(() => {
            component["partie"]["_image1"] = Buffer.from("Hello World");
            component["partie"]["_image2"] = Buffer.from("Hello World");
            component["imageData"] = ["Hello World", "Hello World"];
        });

        it("devrait appeler ajusterSourceImage", () => {
            // tslint:disable-next-line:no-any
            spyOn<any>(component, "ajusterSourceImage");
            component["setup"]();
            expect(component["ajusterSourceImage"]).toHaveBeenCalled();
        });
    });
});
