import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { ErrorHandler } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { RouterTestingModule } from "@angular/router/testing";
import { Data } from "@angular/router";
import { DialogFinPartieComponent } from "./dialog-fin-partie.component";

describe("DialogFinPartieComponent", () => {
  let component: DialogFinPartieComponent;
  let fixture: ComponentFixture<DialogFinPartieComponent>;
  let mockMatDialogRef: jasmine.SpyObj<MatDialogRef<DialogFinPartieComponent>>;
  let mockMatDialogData: jasmine.SpyObj<Data>;

  beforeEach(async(() => {
    mockMatDialogRef = jasmine.createSpyObj([
      "open"
    ]);

    mockMatDialogData = jasmine.createSpyObj([
      ""
    ]);

    TestBed.configureTestingModule({
      declarations: [ DialogFinPartieComponent ],
      imports: [
        RouterTestingModule
      ],
      providers : [
        { provide: MatDialogRef, useValue: mockMatDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: mockMatDialogData }
      ]
    })
    .compileComponents().catch(() => ErrorHandler);
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
