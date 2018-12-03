import { ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing";
import { Location } from "@angular/common";
import { ListePartiesComponent } from "../../liste-parties/liste-parties.component";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { HeaderComponent } from "./header.component";
import { MatToolbarModule, MatIconModule } from "@angular/material";
import { RouterTestingModule } from "@angular/router/testing";
import { CookieService } from "ngx-cookie-service";
import { UserService } from "../../vue-initiale/user.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe("HeaderComponent", () => {
    let mockUserService: jasmine.SpyObj<UserService>;
    let mockCookieService: jasmine.SpyObj<CookieService>;

    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;
    let location: Location;

    beforeEach(() => {
        mockUserService = jasmine.createSpyObj(["delete"]);
        mockCookieService = jasmine.createSpyObj(["get", "deleteAll"]);

        TestBed.configureTestingModule({
            declarations: [
                HeaderComponent,
                ListePartiesComponent,
            ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
            ],
            imports: [
                MatToolbarModule, MatIconModule,
                RouterTestingModule.withRoutes([
                    { path: "liste-parties", component: ListePartiesComponent },
                    { path: "header", component: HeaderComponent },
                ]),
                HttpClientTestingModule
            ],
            providers: [
                { provide: CookieService, useValue: mockCookieService },
                { provide: UserService, useValue: mockUserService },
            ]
        });

        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        location = TestBed.get(Location);
    });

    it("Devrait etre construit", () => {
        expect(component).toBeDefined();
    });

    describe("fonction surClickBanniere", () => {
        it("Devrait naviguer a la router '/liste-parties'", fakeAsync(() => {
            const spy: jasmine.Spy = spyOn(component["router"], "navigateByUrl");
            spy.and.callThrough();

            component["surClickBanniere"]();
            tick();

            expect(location.path()).toBe("/liste-parties");
        }));
    });
});
