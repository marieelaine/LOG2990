import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { LoginFormComponent } from "./login-form.component";
import { FormsModule, ReactiveFormsModule, ValidationErrors, AbstractControl } from "@angular/forms";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { ParticlesModule } from "angular-particle";
import { CookieService } from "ngx-cookie-service";
import { ErrorHandler } from "@angular/core";

describe("LoginFormComponent", () => {
let component: LoginFormComponent;
let fixture: ComponentFixture<LoginFormComponent>;

beforeEach(async(() => {
    TestBed.configureTestingModule({
    declarations: [ LoginFormComponent ],
    imports: [FormsModule, ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule, ParticlesModule ],
    providers: [CookieService]
    })
    .compileComponents()
    .catch(() => ErrorHandler);
}));

beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
});

it("should create", () => {
    expect(component).toBeTruthy();
});

it("form invalid when empty", () => {
    expect(component["loginForm"].valid).toBeFalsy();
});

it("username field validity", () => {
    let errors: ValidationErrors = {};
    const username: AbstractControl  = component["loginForm"].controls["username"];
    expect(username.valid).toBeFalsy();

    errors = username.errors || {};
    expect(errors["required"]).toBeTruthy();

    username.setValue("tEst10-;");
    errors = username.errors || {};
    expect(errors["required"]).toBeFalsy();
    expect(errors["pattern"]).toBeTruthy();

    username.setValue("tE");
    errors = username.errors || {};
    expect(errors["required"]).toBeFalsy();
    expect(errors["minlength"]).toBeTruthy();

    username.setValue("tEst10000000000");
    errors = username.errors || {};
    expect(errors["required"]).toBeFalsy();
    expect(errors["maxlength"]).toBeTruthy();

    username.setValue("admiN1");
    errors = username.errors || {};
    expect(errors["required"]).toBeFalsy();
    expect(errors["minlength"]).toBeFalsy();
    expect(errors["maxlength"]).toBeFalsy();
    expect(errors["pattern"]).toBeFalsy();
});

});
