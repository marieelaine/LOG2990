import { ComponentFixture, TestBed } from "@angular/core/testing";
import { VueMultipleComponent } from "./vue-multiple.component";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { MatCardModule, MatDialog } from "@angular/material";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { CookieService } from "ngx-cookie-service";
import { SocketClientService } from "src/app/socket/socket-client.service";

describe("VueMultipleComponent", () => {
  let component: VueMultipleComponent;
  let fixture: ComponentFixture<VueMultipleComponent>;
  let mockMatDialog: jasmine.SpyObj<MatDialog>;
  let mockCookieService: jasmine.SpyObj<CookieService>;

  beforeEach(() => {
    mockMatDialog = jasmine.createSpyObj([
      "open"
    ]);
    mockCookieService = jasmine.createSpyObj(["get"]);

    TestBed.configureTestingModule({
      declarations: [ VueMultipleComponent ],
      imports: [
          MatCardModule,
          HttpClientTestingModule,
          RouterTestingModule,
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
      ],
      providers: [
        { provide: CookieService, useValue: mockCookieService },
        { provide: MatDialog, useValue: mockMatDialog },
        SocketClientService
      ]
    });

    fixture = TestBed.createComponent(VueMultipleComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
