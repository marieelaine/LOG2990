import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PartieSoloComponent } from './partie-solo.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatCardModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { ErrorHandler } from '@angular/core';
import { PartieSimple } from 'src/app/admin/dialog-simple/partie-simple';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute, convertToParamMap, ActivatedRouteSnapshot, Params } from '@angular/router';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/from';
// import { ChronoComponent } from '../../chrono/chrono.component';

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
                }
            ]
        })
            .compileComponents()
            .catch(() => ErrorHandler);
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PartieSoloComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it("addNomPartieToChat devrait ajouter le nom de la partie au tableau de messages", () => {
        component["partie"] = new PartieSimple ("nomPartie", new Array<number>(), new Array<number>(), Buffer.from(new Array<number>()),
                                                Buffer.from(new Array<number>()), new Array<Array<string>>(), "");
        component["addNomPartieToChat"]();
        expect(component["messagesChat"][0]).toEqual("Bienvenue dans la partie NomPartie");
    });

    it("setID devrait setter le ID correctement", () => {
        component["setID"]();
        expect(component["partieID"]).toEqual("123");
    });

    describe("testerPourDiff", () => {
        it("devrait appeler differenceTrouver si le pixel se trouve dans imageDiff", () => {
            // tslint:disable-next-line:no-any
            spyOn<any>(component, "differenceTrouver");
            component["partie"] = new PartieSimple ("nomPartie", new Array<number>(), new Array<number>(), Buffer.from(new Array<number>()),
                                                    Buffer.from(new Array<number>()), [["[1, 1]"]], "");
            component["testerPourDiff"](1, 1);
            expect(component["differenceTrouver"]).toHaveBeenCalled();
        });
    });
});
