import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { AdminComponent } from "./admin.component";
import { MatMenuModule, MatToolbarModule, MatCardModule, MatDialogModule } from "@angular/material";
import { ListePartiesComponent } from "../liste-parties/liste-parties.component";
import { PartieSimpleFonctions } from "../liste-parties/partie-simple/partie-simple.component";
import { PartieMultipleFonctions } from "../liste-parties/partie-multiple/partie-multiple.component";
import { RouterTestingModule } from "@angular/router/testing";

describe("AdminComponent", () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminComponent, ListePartiesComponent, PartieSimpleFonctions, PartieMultipleFonctions ],
      imports: [MatMenuModule, MatToolbarModule, MatCardModule, RouterTestingModule, MatDialogModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
