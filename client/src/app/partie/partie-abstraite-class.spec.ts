import { PartieAbstraiteClass } from "./partie-abstraite-class";
import { tick, fakeAsync } from "@angular/core/testing";
import { PartieSimple } from "../admin/dialog-simple/partie-simple";
import { PartieMultiple } from "../admin/dialog-multiple/partie-multiple";
import { PartieService } from "./partie.service";
import { HttpClient } from "@angular/common/http";
import { HttpHandlerMock, ActivatedRouteMock } from "src/testing/mocks";
import { TempsUser } from "../admin/temps-user";
import { CookieServiceMock } from "../../testing/cookieMock";

const ONE_SECOND_TIMER: number = 1000;
const TWO_SECONDS_TIMER: number = 2000;
const TWO_SECONDS_CHRONO: number = 2;

class PartieServiceMock extends PartieService {
    public constructor() {
        const httpHandlerMock: HttpHandlerMock = new HttpHandlerMock();
        const httpClient: HttpClient = new HttpClient(httpHandlerMock);
        super(httpClient);
    }
}

class AbstractClassInstance extends PartieAbstraiteClass {
    protected partie: PartieSimple | PartieMultiple;
    protected ajouterTemps(temps: number): void {}
    protected setPartie(): void {}
    protected getImageData(): void {}
}

describe("PartieAbstraiteComponent", () => {
    let component: AbstractClassInstance;
    const PartieServiceMock = sinon.Mock(PartieService);
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
        tick(TWO_SECONDS_TIMER);
        component["terminerPartie"]();
        expect(component["chrono"].getTime()).toBe(TWO_SECONDS_CHRONO);
    }));

    it("partieCommence should be false true", () => {
    expect(component["partieCommence"]).toBeFalsy();
    });

    it("should return value 0", fakeAsync(() => {
    tick(ONE_SECOND_TIMER);
    expect(component["chrono"].getTime()).toBe(0);
    }));
});
