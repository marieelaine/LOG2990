import { ComponentFixture, TestBed } from "@angular/core/testing";
import { VueSimpleComponent } from "./vue-simple.component";
import { PartieSimple } from "src/app/admin/dialog-simple/partie-simple";
import { MatCardModule, MatDialog } from "@angular/material";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { ChatComponent } from "src/app/chat/chat.component";
import { CookieService } from "ngx-cookie-service";
import { TempsUser } from "src/app/admin/joueur";
import { SocketClientService } from "src/app/socket/socket-client.service";

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
            "nomPartie", new Array<TempsUser>(), new Array<TempsUser>(),
            Buffer.from(new Array<number>()), Buffer.from(new Array<number>()), new Array<Array<string>>(), "");
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("setPartie devrait appeler la fonction getPartieSimple de partieService", () => {
        spyOn(component["partieService"], "getPartieSimple").and.callThrough();
        component["setPartie"]();
        expect(component["partieService"]["getPartieSimple"]).toHaveBeenCalled();
    });

    describe("testerPourDiff", () => {
        beforeEach(() => {
            component["partieCommence"] = true;
            // tslint:disable-next-line:no-any
            spyOn<any>(component, "differenceTrouver");
        });

        // it("devrait appeler differenceTrouver si le pixel se trouve dans imageDiff", () => {
        //     component["partie"]["_imageDiff"] = [["1,1"]];
        //     const event: MockEvent = new MockEvent(1, 1, new MockCanvas());

        //     component["testerPourDiff"](event);
        //     expect(component["differenceTrouver"]).toHaveBeenCalled();
        // });
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
