import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { AdminComponent } from "./admin.component";
import { MatMenuModule, MatToolbarModule, MatCardModule, MatDialogModule, MatMenuTrigger } from "@angular/material";
import { ListePartiesComponent } from "../liste-parties/liste-parties.component";
import { RouterTestingModule } from "@angular/router/testing";
import { By } from "@angular/platform-browser";
import { ListePartieMultipleComponent } from "../liste-parties/liste-partie-multiple/liste-partie-multiple.component";
import { ListePartieSimpleComponent } from "../liste-parties/liste-partie-simple/liste-partie-simple.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";

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
        });

        fixture = TestBed.createComponent(AdminComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should have a menu with 2 options (native click), one simple dialog window and one multiple dialog window", async () => {
        const elem = fixture.debugElement;
        const button = elem.query((e) => e.name === "button");
        expect(!!button).toBe(true);

        button.nativeElement.click();
        fixture.detectChanges();
        expect(fixture.debugElement.queryAll(By.css(".menu-item")).length).toEqual(2);

        const buttonSimple = fixture.debugElement.query(By.css("#simpleDialog")).nativeElement;
        const buttonMultiple = fixture.debugElement.query(By.css("#multipleDialog")).nativeElement;

        // const spySimple: jasmine.Spy = spyOn(component, "openDialogSimple");
        // buttonSimple.dispatchEvent(new Event("click"));

        // fixture.detectChanges();
        // expect(spySimple).toHaveBeenCalled();

        // const spyMultiple: jasmine.Spy = spyOn(component, "openDialogMultiple");
        // buttonMultiple.dispatchEvent(new Event("click"));

        // fixture.detectChanges();
        // expect(spyMultiple).toHaveBeenCalled();
    });

});
