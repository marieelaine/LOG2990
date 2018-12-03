import { ComponentFixture, TestBed } from "@angular/core/testing";

import { VueInitialeComponent } from "./vue-initiale.component";
import { HeaderComponent } from "../common/header/header.component";
import { LoginFormComponent } from "./login-form/login-form.component";
import { MatToolbarModule, MatIconModule } from "@angular/material";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ParticlesModule } from "angular-particle";
import { CookieService } from "ngx-cookie-service";
import { UserService } from "./user.service";

describe("VueInitialeComponent", () => {
    let component: VueInitialeComponent;
    let fixture: ComponentFixture<VueInitialeComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [VueInitialeComponent, HeaderComponent, LoginFormComponent],
            imports: [MatToolbarModule, FormsModule, ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule, ParticlesModule,
                      MatIconModule],
            providers: [CookieService, UserService]
        });
        fixture = TestBed.createComponent(VueInitialeComponent);
        component = fixture.componentInstance;
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
