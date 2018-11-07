import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PartieSoloComponent } from './partie-solo.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatCardModule } from '@angular/material';
import { ErrorHandler } from '@angular/core';
import { PartieSimple } from 'src/app/admin/dialog-simple/partie-simple';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/of';

class ActivatedRouteMock extends ActivatedRoute {
    constructor() {
        super();
        this.snapshot = new ActivatedRouteSnapshot();
        this.snapshot.params = {
            ["idPartie"]: "123"
        };
    }
}

describe('PartieSoloComponent', () => {
    let component: PartieSoloComponent;
    let fixture: ComponentFixture<PartieSoloComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PartieSoloComponent],
            imports: [
                HttpClientTestingModule,
                MatCardModule
            ],
            providers: [
                {
                    provide: ActivatedRoute,
                    useClass: ActivatedRouteMock
                },
            ]
        })
            .compileComponents()
            .catch(() => ErrorHandler);
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PartieSoloComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        component["partie"] = new PartieSimple ("nomPartie", new Array<number>(), new Array<number>(), Buffer.from(new Array<number>()),
                                                Buffer.from(new Array<number>()), new Array<Array<string>>(), "");
        // component["imageG"] = new HTMLImageElement();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it("addNomPartieToChat devrait ajouter le nom de la partie au tableau de messages", () => {
        component["addNomPartieToChat"]();
        expect(component["messagesChat"][0]).toEqual("Bienvenue dans la partie NomPartie");
    });

    it("setID devrait setter le ID correctement", () => {
        component["setID"]();
        expect(component["partieID"]).toEqual("123");
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
            component["partie"] = new PartieSimple ("nomPartie", new Array<number>(), new Array<number>(), Buffer.from(new Array<number>()),
                                                    Buffer.from(new Array<number>()), [["1,1"]], "");
            component["testerPourDiff"](1, 1);
            expect(component["differenceTrouver"]).toHaveBeenCalled();
        });

        it("ne devrait pas appeler differenceTrouver si le pixel se trouve dans imageDiff", () => {
            component["partie"] = new PartieSimple ("nomPartie", new Array<number>(), new Array<number>(), Buffer.from(new Array<number>()),
                                                    Buffer.from(new Array<number>()), [["1,2"]], "");
            component["testerPourDiff"](1, 1);
            expect(component["differenceTrouver"]).not.toHaveBeenCalled();
        });
    });

    describe("setup", () => {
        beforeEach(() => {
            component["partie"]["_image1"] = Buffer.from("Hello World");
            component["partie"]["_image2"] = Buffer.from("Hello World");
        });

        // it("devrait appeler addNomPartieToChat", () => {
        //     // tslint:disable-next-line:no-any
        //     spyOn<any>(component, "addNomPartieToChat");
        //     component["setup"]();
        //     expect(component["addNomPartieToChat"]).toHaveBeenCalled();
        // });

        it("devrait appeler ajusterSourceImage", () => {
            // tslint:disable-next-line:no-any
            spyOn<any>(component, "ajusterSourceImage");
            component["setup"]();
            expect(component["ajusterSourceImage"]).toHaveBeenCalled();
        });
    });
});
