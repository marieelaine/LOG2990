import { PartieAbstraiteClass } from "./partie-abstraite-class";
import { tick, fakeAsync } from "@angular/core/testing";
import { PartieSimple } from "../admin/dialog-simple/partie-simple";
import { PartieMultiple } from "../admin/dialog-multiple/partie-multiple";
import { PartieService } from "./partie.service";
import { HttpClient } from "@angular/common/http";
import { HttpHandlerMock, ActivatedRouteMock } from "src/testing/mocks";
import { TempsUser } from "../admin/temps-user";
import {CookieService} from "ngx-cookie-service";

class PartieServiceMock extends PartieService {
    constructor() {
        const httpHandlerMock = new HttpHandlerMock();
        const httpClient = new HttpClient(httpHandlerMock);
        super(httpClient);
    }
}

class CookieServiceMock extends CookieService {
       constructor() {
           const doc = document;
           super(doc);
       }
   }

class AbstractClassInstance extends PartieAbstraiteClass {
    protected partie: PartieSimple | PartieMultiple;
    protected ajouterTemps(temps: number) {}
    protected setPartie(): void {}
    protected getImageData(): void {}
}

describe("PartieAbstraiteComponent", () => {
    let component: AbstractClassInstance;

    beforeEach(() => {
    component = new AbstractClassInstance(new ActivatedRouteMock(), new PartieServiceMock(), new CookieServiceMock(), true);
    component["partie"] = new PartieSimple ("nomPartie", new Array<TempsUser>(), new Array<TempsUser>(), Buffer.from(new Array<number>()),
                                            Buffer.from(new Array<number>()), new Array<Array<string>>(), "");
    });

    it("should create", () => {
    expect(component).toBeTruthy();
    });

    describe("start", () => {
        it("devrait initialiser correctement les attributs partieCommence, messageDifferences", () => {
            component["commencerPartie"]();
            expect(component["partieCommence"]).toEqual(true);
            expect(component["messageDifferences"]).toEqual("Vous avez trouvé 0 différences");
        });

        it("devrait appeler chrono.startTimer", () => {
            const spy: jasmine.Spy = spyOn(component["chrono"], "startTimer");

            component["commencerPartie"]();
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

    it("chrono.getTime devrait retourner 2 lorsque la partie dure 2 secondes", fakeAsync(() => {
        component["commencerPartie"]();
        tick(2000);
        component["terminerPartie"]();
        expect(component["chrono"].getTime()).toBe(2);
    }));

    it("partieCommence should be false true", () => {
    expect(component["partieCommence"]).toBeFalsy();
    });

    it("should return value 0", fakeAsync(() => {
    tick(1000);
    expect(component["chrono"].getTime()).toBe(0);
    }));
});
