import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { VueSimpleComponent } from './vue-simple.component';
import { PartieSimple } from 'src/app/admin/dialog-simple/partie-simple';
import { MatCardModule } from '@angular/material';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ChatComponent } from 'src/app/chat/chat.component';
import { TempsUser } from 'src/app/admin/dialog-abstrait';
import { CookieService } from 'ngx-cookie-service';

describe('VueSimpleComponent', () => {
    let mockCookieService: jasmine.SpyObj<CookieService>;

    let component: VueSimpleComponent;
    let fixture: ComponentFixture<VueSimpleComponent>;

    beforeEach(() => {
        mockCookieService = jasmine.createSpyObj([""]);

        TestBed.configureTestingModule({
            declarations: [VueSimpleComponent, ChatComponent],
            imports: [
                MatCardModule,
                HttpClientTestingModule,
                RouterTestingModule,
            ],
            providers: [
                { provide: CookieService, useValue: mockCookieService },
            ]
        });

        fixture = TestBed.createComponent(VueSimpleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        component["partie"] = new PartieSimple(
            "nomPartie",
            new Array<TempsUser>(),
            new Array<TempsUser>(),
            Buffer.from(new Array<number>()),
            Buffer.from(new Array<number>()),
            new Array<Array<string>>(),
            "");
    });

    it('should create', () => {
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

        it("devrait appeler differenceTrouver si le pixel se trouve dans imageDiff", () => {
            component["partie"]["_imageDiff"] = [["1,1"]];

            component["testerPourDiff"](1, 1);
            expect(component["differenceTrouver"]).toHaveBeenCalled();
        });

        it("ne devrait pas appeler differenceTrouver si le pixel se trouve dans imageDiff", () => {
            component["partie"]["_imageDiff"] = [["1,2"]];

            component["testerPourDiff"](1, 1);
            expect(component["differenceTrouver"]).not.toHaveBeenCalled();
        });
    });

    describe("setup", () => {
        beforeEach(() => {
            component["partie"]["_image1"] = Buffer.from("Hello World");
            component["partie"]["_image2"] = Buffer.from("Hello World");
            component["imageData"] = ["Hello World", "Hello World"];
        });

        it("devrait appeler addNomPartieToChat", () => {
            // tslint:disable-next-line:no-any
            spyOn<any>(component, "addNomPartieToChat");
            component["setup"]();
            expect(component["addNomPartieToChat"]).toHaveBeenCalled();
        });

        it("devrait appeler ajusterSourceImage", () => {
            // tslint:disable-next-line:no-any
            spyOn<any>(component, "ajusterSourceImage");
            component["setup"]();
            expect(component["ajusterSourceImage"]).toHaveBeenCalled();
        });
    });
});
