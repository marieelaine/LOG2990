import { async, ComponentFixture, TestBed, tick, fakeAsync } from "@angular/core/testing";

import { ChronoComponent } from "./chrono.component";
import { ErrorHandler } from "@angular/core";

describe("ChronoComponent", () => {
  let component: ChronoComponent;
  let fixture: ComponentFixture<ChronoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChronoComponent ]
    })
    .compileComponents()
    .catch(() => ErrorHandler);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChronoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it ("should return value 0", () => {
    expect(component.getTime()).toBe(0);
  });

  it ("should return value 5", fakeAsync(() => {
    component.startTimer();
    tick(5000);
    component.stopTimer();
    expect(component.getTime()).toBe(5);
  }));

  it ("should return string \'05\' for minute and second", fakeAsync(() => {
    component.startTimer();
    tick(305000);
    expect(component.getSecondsSrtring()).toBe("05");
    expect(component.getMinutesString()).toBe("05");
    component.stopTimer();
  }));
});
