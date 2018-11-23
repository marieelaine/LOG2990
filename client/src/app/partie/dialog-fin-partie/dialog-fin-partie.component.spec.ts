import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { DialogFinPartieComponent } from "./dialog-fin-partie.component";

describe("DialogFinPartieComponent", () => {
  let component: DialogFinPartieComponent;
  let fixture: ComponentFixture<DialogFinPartieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogFinPartieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogFinPartieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
