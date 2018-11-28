// tslint:disable:no-any les attributs sont des types any
// tslint:disable:no-floating-promises pour le before each
import { TestBed, ComponentFixture } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { BasicService } from "./basic.service";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterTestingModule } from "@angular/router/testing";
import { HeaderComponent } from "./common/header/header.component";
import { MatToolbarModule, MatDialogModule } from "@angular/material";
import { CookieService } from "ngx-cookie-service";
import { UserService } from "./vue-initiale/user.service";
import { NotifierService } from "angular-notifier";
import { SocketClientService } from "src/app/socket/socket-client.service";

describe("AppComponent", () => {
  let mockNotifier: jasmine.SpyObj<NotifierService>;

  beforeEach(() => {
    mockNotifier = jasmine.createSpyObj([""]);

    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HeaderComponent
      ],
      imports: [HttpClientModule, RouterTestingModule, MatToolbarModule, MatDialogModule],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
      ],
      providers: [BasicService, CookieService, UserService, SocketClientService,
                  { provide: NotifierService, useValue: mockNotifier},
      ]
    }).compileComponents();
  });

  it("should create the app", () => {
    const fixture: ComponentFixture<AppComponent> = TestBed.createComponent(AppComponent);
    const app: any = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it("should have as title 'client'", () => {
    const fixture: ComponentFixture<AppComponent> = TestBed.createComponent(AppComponent);
    const app: any = fixture.debugElement.componentInstance;
    expect(app.title).toEqual("LOG2990");
  });
});
