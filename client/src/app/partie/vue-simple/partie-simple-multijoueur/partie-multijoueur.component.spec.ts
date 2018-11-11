import { ComponentFixture, TestBed } from "@angular/core/testing";
import { PartieSimpleMultijoueurComponent } from "./partie-multijoueur.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { MatCardModule } from "@angular/material";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ChatComponent } from "src/app/chat/chat.component";
import { ActivatedRoute } from "@angular/router";
import { ActivatedRouteMock } from "src/testing/mocks";
import { CookieService } from "ngx-cookie-service";

describe("PartieMultijoueurComponent", () => {
    let mockCookieService: jasmine.SpyObj<CookieService>;

    let component: PartieSimpleMultijoueurComponent;
    let fixture: ComponentFixture<PartieSimpleMultijoueurComponent>;

    beforeEach(() => {
        mockCookieService = jasmine.createSpyObj([""]);

        TestBed.configureTestingModule({
            declarations: [
                PartieSimpleMultijoueurComponent,
                ChatComponent
            ],
            imports: [
                HttpClientTestingModule,
                MatCardModule
            ],
            providers: [
                { provide: ActivatedRoute, useClass: ActivatedRouteMock },
                { provide: CookieService, useValue: mockCookieService },
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        });

        fixture = TestBed.createComponent(PartieSimpleMultijoueurComponent);
        component = fixture.componentInstance;
    });

    it("Should create", () => {
        expect(component).toBeTruthy();
    });

    it("Should be defined", () => {
        expect(component).toBeDefined();
    });
});
