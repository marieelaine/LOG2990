import { ComponentFixture, TestBed } from "@angular/core/testing";
import { PartieSimpleSoloComponent } from "./partie-simple-solo.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { MatCardModule } from "@angular/material";
import { ActivatedRoute } from "@angular/router";
import { ActivatedRouteMock } from "src/testing/mocks";
import { ChatComponent } from "src/app/chat/chat.component";
import { CookieService } from "ngx-cookie-service";

describe("PartieSoloComponent", () => {
    let mockCookieService: jasmine.SpyObj<CookieService>;

    let component: PartieSimpleSoloComponent;
    let fixture: ComponentFixture<PartieSimpleSoloComponent>;

    beforeEach(() => {
        mockCookieService = jasmine.createSpyObj([""]);

        TestBed.configureTestingModule({
            declarations: [
                PartieSimpleSoloComponent,
                ChatComponent
            ],
            imports: [
                HttpClientTestingModule,
                MatCardModule
            ],
            providers: [
                { provide: ActivatedRoute, useClass: ActivatedRouteMock },
                { provide: CookieService, useValue: mockCookieService },
            ]
        });

        fixture = TestBed.createComponent(PartieSimpleSoloComponent);
        component = fixture.componentInstance;
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
