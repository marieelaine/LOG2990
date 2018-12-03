import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { AdminComponent } from "./admin.component";
import { MatMenuModule, MatToolbarModule, MatCardModule, MatDialogModule, MatDialog } from "@angular/material";
import { ListePartiesComponent } from "../liste-parties/liste-parties.component";
import { RouterTestingModule } from "@angular/router/testing";
import { By } from "@angular/platform-browser";
import { ListePartieMultipleComponent } from "../liste-parties/liste-partie-multiple/liste-partie-multiple.component";
import { ListePartieSimpleComponent } from "../liste-parties/liste-partie-simple/liste-partie-simple.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { SocketClientService } from "../socket/socket-client.service";
import { DebugElement } from "@angular/core";
import {CookieService} from "ngx-cookie-service";

describe("AdminComponent", () => {
    let mockMatDialog: jasmine.SpyObj<MatDialog>;

    let component: AdminComponent;
    let fixture: ComponentFixture<AdminComponent>;

    beforeEach(() => {
        mockMatDialog = jasmine.createSpyObj([
            "open"
        ]);

        TestBed.configureTestingModule({
            declarations: [AdminComponent, ListePartiesComponent, ListePartieSimpleComponent, ListePartieMultipleComponent],
            imports: [
                MatMenuModule,
                MatToolbarModule,
                MatCardModule,
                RouterTestingModule,
                MatDialogModule,
                NoopAnimationsModule,
                HttpClientTestingModule
            ],
            providers: [
                SocketClientService,
                { provide: MatDialog, useValue: mockMatDialog },
                CookieService
            ]
        });

        fixture = TestBed.createComponent(AdminComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("Devrait être créé", () => {
        expect(component).toBeTruthy();
    });

    it("Devrait avoir un menu avec 2 options (native click), un simple dialog window et un multiple dialog window", async () => {
        const elem: DebugElement = fixture.debugElement;
        const button: DebugElement = elem.query((e) => e.name === "button");
        const nbMenuItem: number = 2;
        expect(!!button).toBe(true);

        button.nativeElement.click();
        fixture.detectChanges();
        expect(fixture.debugElement.queryAll(By.css(".menu-item")).length).toEqual(nbMenuItem);

        const buttonSimple: HTMLElement = fixture.debugElement.query(By.css("#simpleDialog")).nativeElement;
        const buttonMultiple: HTMLElement = fixture.debugElement.query(By.css("#multipleDialog")).nativeElement;

        // tslint:disable-next-line:no-any
        const spySimple: jasmine.Spy = spyOn<any>(component, "openDialogSimple");
        buttonSimple.dispatchEvent(new Event("click"));

        fixture.detectChanges();
        expect(spySimple).toHaveBeenCalled();

        // tslint:disable-next-line:no-any
        const spyMultiple: jasmine.Spy = spyOn<any>(component, "openDialogMultiple");
        buttonMultiple.dispatchEvent(new Event("click"));

        fixture.detectChanges();
        expect(spyMultiple).toHaveBeenCalled();
    });

    describe("Fonction openDialogSimple", () => {
        it("Devrait assigner une chaine de caractere vide a l'attribut gameName", () => {
            component["openDialogSimple"]();
            expect(component["gameName"]).toEqual("");
        });

        it("Devrait appeller la fonction open du service dialog", () => {
            component["openDialogSimple"]();
            expect(mockMatDialog.open).toHaveBeenCalled();
        });
    });

    describe("Fonction openDialogWithData", () => {
        it("Devrait appelle la fonction open du service dialog", () => {
            component["openDialogWithData"]("un message");
            expect(mockMatDialog.open).toHaveBeenCalled();
        });
    });

    describe("Fonction openDialogMultiple", () => {
        it("Devrait assigner une chaine de caractere vide a l'attribut gameName", () => {
            component["openDialogMultiple"]();
            expect(component["gameName"]).toEqual("");
        });

        it("Devrait appeller la fonction open du service dialog", () => {
            component["openDialogMultiple"]();
            expect(mockMatDialog.open).toHaveBeenCalled();
        });
    });

    describe("Fonction initSocket", () => {
        it("Devrait appeler la fonction on deux fois du service socket", () => {
            const nbAppels: number = 2;
            const spySocketOn: jasmine.Spy = spyOn(component.socketClientService.socket, "on");

            component["initSocket"]();

            expect(spySocketOn).toHaveBeenCalledTimes(nbAppels);
        });
    });
});
