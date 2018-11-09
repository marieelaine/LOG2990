import { PartieAbstraiteClass } from "./partie-abstraite-class";
import { tick, fakeAsync } from '@angular/core/testing';
import { PartieSimple } from "../admin/dialog-simple/partie-simple";
import { PartieMultiple } from "../admin/dialog-multiple/partie-multiple";
import { PartieService } from "./partie.service";
import { HttpClient } from "@angular/common/http";
import { HttpHandlerMock, ActivatedRouteMock } from "src/testing/mocks";

class PartieServiceMock extends PartieService {
    constructor() {
        const httpHandlerMock = new HttpHandlerMock();
        const httpClient = new HttpClient(httpHandlerMock);
        super(httpClient);
    }
}

class AbstractClassInstance extends PartieAbstraiteClass {
    protected partie: PartieSimple | PartieMultiple;
    protected ajouterTemps(temps: number) {}
    protected setPartie(): void {}
    protected getImageData(): void {}
}

describe('PartieAbstraiteComponent', () => {
    let component: AbstractClassInstance;

    beforeEach(() => {
    component = new AbstractClassInstance(new ActivatedRouteMock(), new PartieServiceMock(), true);
    component["partie"] = new PartieSimple ("nomPartie", new Array<number>(), new Array<number>(), Buffer.from(new Array<number>()),
                                            Buffer.from(new Array<number>()), new Array<Array<string>>(), "");
    });

    it('should create', () => {
    expect(component).toBeTruthy();
    });

    describe("start", () => {
        it("start devrait initialiser correctement les attributs partieCommence, messageDifferences, et blur", () => {
            component["start"]();
            expect(component["partieCommence"]).toEqual(true);
            expect(component["messageDifferences"]).toEqual("Vous avez trouvé 0 différences");
            expect(component["blur"]).toEqual(false);
        });

        it("start devrait appeler chrono.startTimer", () => {
            const spy: jasmine.Spy = spyOn(component["chrono"], "startTimer");

            component["start"]();
            expect(spy).toHaveBeenCalled();
        });

        // TODO : tester si le bouton Commencer à bien été enlevé dans les components
    });

    it("setID devrait setter le ID correctement", () => {
        component["setID"]();
        expect(component["partieID"]).toEqual("123");
    });

    it("addNomPartieToChat devrait appeler chat.addMessageToMessagesChat", () => {
        // tslint:disable-next-line:no-any
        const spy: jasmine.Spy = spyOn<any>(component["chat"], "addMessageToMessagesChat");
        component["addNomPartieToChat"]();

        expect(spy).toHaveBeenCalled();
    });

    it('chrono.getTime devrait retourner 2 lorsque la partie dure 2 secondes', fakeAsync(() => {
        component["start"]();
        tick(2000);
        component["terminerPartie"]();
        expect(component["chrono"].getTime()).toBe(2);
    }));

    it('partieCommence should be false and blur true', () => {
    expect(component["partieCommence"]).toBeFalsy();
    expect(component["blur"]).toBeTruthy();
    });

    it('should return value 0', fakeAsync(() => {
    tick(1000);
    expect(component["chrono"].getTime()).toBe(0);
    }));
});
