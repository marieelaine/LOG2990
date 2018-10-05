import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Location } from "@angular/common";
import { ListePartiesComponent } from './liste-parties.component';
import { MatCardModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';

import { ListePartieSimpleComponent } from './liste-partie-simple/liste-partie-simple.component';
import { ListePartieMultipleComponent } from './liste-partie-multiple/liste-partie-multiple.component';
import { PartieSoloComponent } from '../partie/partie-solo/partie-solo.component';

describe('ListePartiesComponent', () => {
  let component: ListePartiesComponent;
  let fixture: ComponentFixture<ListePartiesComponent>;
  let location: Location;

  const bestTimesTest: number[] = [1, 2];
  const sortingTimesTest: number[] = [643, 5, 213, 1465, 1, 0];
  const titleTest: String = "NSuccess";
  const convertTimeTest: number = 547;
  const displaySecondsTest: number = 57;
  const displayMinutesTest: number = 9;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListePartiesComponent, ListePartieSimpleComponent, ListePartieMultipleComponent, PartieSoloComponent ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
      imports: [MatCardModule, RouterTestingModule.withRoutes([
        { path: "liste-parties", component: ListePartiesComponent },
        { path: "partie-solo", component: PartieSoloComponent },
        { path: "admin", component: PartieSoloComponent },
      ]) ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    location = TestBed.get(Location);
    fixture = TestBed.createComponent(ListePartiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('click on button partie-solo redirects you to /partie-solo', fakeAsync(() => {
    const elem = fixture.debugElement;
    const button = elem.query((e) => e.name === 'button');
    expect(!!button).toBe(true);
    button.nativeElement.click();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(location.path()).toBe('/partie-solo');
    });
  }));

   // Tests classement des meilleurs temps
  it('should return best time', () => {
    expect(component["getBestTime"](bestTimesTest)).toBe("0:01");
  });

  it('should return second best time', () => {
    expect(component["getSecondBestTime"](bestTimesTest)).toBe("0:02");
  });

  it('should return third best time', () => {
    expect(component["getThirdBestTime"](bestTimesTest)).toBe("-");
  });

  // Test ordonnance d'un tableau de temps
  it('should return array of sorted times', () => {
    expect(component["getSortedTimes"](sortingTimesTest)).toEqual([0, 1, 5, 213, 643, 1465]);
  });

  // Test remove first letter of title
  it('should return title without first letter', () => {
    expect(component["getTitleWithoutFirstLetter"](titleTest)).toBe("Success");
  });

  // Test conversion en minutes et secondes
  it('should return array of sorted times', () => {
    expect(component["convertSecondsToMinutes"](convertTimeTest)).toBe("9:07");
  });

  // Test retour du temps a afficher
  it('should return array of sorted times', () => {
    expect(component["getDisplayTime"](displayMinutesTest, displaySecondsTest)).toBe("9:57");
  });
});
