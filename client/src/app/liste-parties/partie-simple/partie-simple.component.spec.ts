import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { PartieSimpleComponent } from './partie-simple.component';

describe('PartieSimpleComponent', () => {
  let component: PartieSimpleComponent;
  let fixture: ComponentFixture<PartieSimpleComponent>;
  const bestTimesTest: number[] = [1, 2];
  const sortingTimesTest: number[] = [643, 5, 213, 1465, 1, 0];
  const titleTest: String = "NSuccess";
  const convertTimeTest: number = 547;
  const displaySecondsTest: number = 57;
  const displayMinutesTest: number = 9;
  

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ PartieSimpleComponent ],
      imports: [RouterTestingModule],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartieSimpleComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Tests classement des meilleurs temps
  it('should return best time', () => {
    expect(component.getBestTime(bestTimesTest)).toBe("0:01");
  });

  it('should return second best time', () => {
    expect(component.getSecondBestTime(bestTimesTest)).toBe("0:02");
  });

  it('should return third best time', () => {
    expect(component.getThirdBestTime(bestTimesTest)).toBe("-");
  });

  // Test ordonnance d'un tableau de temps
  it('should return array of sorted times', () => {
    expect(component.getSortedTimes(sortingTimesTest)).toEqual([0, 1, 5, 213, 643, 1465]);
  });

  // Test remove first letter of title
  it('should return title without first letter', () => {
    expect(component.getTitleWithoutFirstLetter(titleTest)).toBe("Success");
  });

  // Test conversion en minutes et secondes
  it('should return array of sorted times', () => {
    expect(component.convertSecondsToMinutes(convertTimeTest)).toBe("9:07");
  });

  // Test retour du temps a afficher
  it('should return array of sorted times', () => {
    expect(component.getDisplayTime(displayMinutesTest, displaySecondsTest)).toBe("9:57");
  });
});
