import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartieAbstraiteClass } from './partie-abstraite';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

class AbstractClassInstance extends PartieAbstraiteClass {

}

describe('PartieAbstraiteComponent', () => {
  let abstractClassInstance: AbstractClassInstance;
  const bestTimesTest: number[] = [1, 2];
  const sortingTimesTest: number[] = [643, 5, 213, 1465, 1, 0];
  const titleTest: String = "NSuccess";
  const convertTimeTest: number = 547;
  const displaySecondsTest: number = 57;
  const displayMinutesTest: number = 9;

  beforeEach(() => {
    abstractClassInstance = new AbstractClassInstance();
  });

  it('should create', () => {
    expect(abstractClassInstance).toBeTruthy();
  });

  // Tests classement des meilleurs temps
  it('should return best time', () => {
    expect(abstractClassInstance["getBestTime"](bestTimesTest)).toBe("0:01");
  });

  it('should return second best time', () => {
    expect(abstractClassInstance["getSecondBestTime"](bestTimesTest)).toBe("0:02");
  });

  it('should return third best time', () => {
    expect(abstractClassInstance["getThirdBestTime"](bestTimesTest)).toBe("-");
  });

  // Test ordonnance d'un tableau de temps
  it('should return array of sorted times', () => {
    expect(abstractClassInstance["getSortedTimes"](sortingTimesTest)).toEqual([0, 1, 5, 213, 643, 1465]);
  });

  // Test remove first letter of title
  it('should return title without first letter', () => {
    expect(abstractClassInstance["getTitleWithoutFirstLetter"](titleTest)).toBe("Success");
  });

  // Test conversion en minutes et secondes
  it('should return array of sorted times', () => {
    expect(abstractClassInstance["convertSecondsToMinutes"](convertTimeTest)).toBe("9:07");
  });

  // Test retour du temps a afficher
  it('should return array of sorted times', () => {
    expect(abstractClassInstance["getDisplayTime"](displayMinutesTest, displaySecondsTest)).toBe("9:57");
  });

});
