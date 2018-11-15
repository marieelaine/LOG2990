import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { AdminComponent } from "./admin.component";
import { MatMenuModule, MatToolbarModule, MatCardModule, MatDialogModule } from "@angular/material";
import { ListePartiesComponent } from "../liste-parties/liste-parties.component";
import { RouterTestingModule } from "@angular/router/testing";
import { By } from "@angular/platform-browser";
import { ListePartieMultipleComponent } from "../liste-parties/liste-partie-multiple/liste-partie-multiple.component";
import { ListePartieSimpleComponent } from "../liste-parties/liste-partie-simple/liste-partie-simple.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { SocketClientService } from "../socket/socket-client.service";

describe("AdminComponent", () => {
    let component: AdminComponent;
    let fixture: ComponentFixture<AdminComponent>;

    beforeEach(() => {
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
            providers : [
                SocketClientService
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
        const elem = fixture.debugElement;
        const button = elem.query((e) => e.name === "button");
        expect(!!button).toBe(true);

        button.nativeElement.click();
        fixture.detectChanges();
        expect(fixture.debugElement.queryAll(By.css(".menu-item")).length).toEqual(2);

        const buttonSimple = fixture.debugElement.query(By.css("#simpleDialog")).nativeElement;
        const buttonMultiple = fixture.debugElement.query(By.css("#multipleDialog")).nativeElement;

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
});
