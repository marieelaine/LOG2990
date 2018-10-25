import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Location } from "@angular/common";
import { ListePartiesComponent } from '../../liste-parties/liste-parties.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HeaderComponent } from './header.component';
import { MatToolbarModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../../vue-initiale/user.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('HeaderComponent', () => {
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
                ListePartiesComponent
            ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA
            ],
            imports: [
                MatToolbarModule,
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

    it('Devrait etre construit', () => {
        expect(component).toBeDefined();
    });

    describe("fonction onLogout", () => {
        it("Devrait appeller les fonctions du cookieService et du userService", () => {
            const unNomUsager: string = "un nom dusager";
            mockCookieService.get.and.returnValue(unNomUsager);

            component["onLogout"]();

            expect(mockCookieService.get).toHaveBeenCalledWith("username");
            expect(mockCookieService.deleteAll).toHaveBeenCalledTimes(1);
            expect(mockUserService.delete).toHaveBeenCalledWith(unNomUsager);
        });
        it("Devrait naviguer à la route principal '/'", fakeAsync(() => {
            component["onLogout"]();
            tick();

            expect(location.path()).toBe("/");
        }));
    });

    describe("fonction onHeaderTitleClick", () => {
        it("Devrait naviguer a la router '/liste-parties'", fakeAsync(() => {
            component["OnHeaderTitleClick"]();
            tick();

            expect(location.path()).toBe("/liste-parties");
        }));
    });
});
