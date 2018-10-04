import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Location } from "@angular/common";
import { ListePartiesComponent } from './liste-parties.component';
import { MatCardHeader, MatCardModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';

import { ListePartieSimpleComponent } from './liste-partie-simple/liste-partie-simple.component';
import { ListePartieMultipleComponent } from './liste-partie-multiple/liste-partie-multiple.component';
import { PartieSoloComponent } from '../partie/partie-solo/partie-solo.component';

describe('ListePartiesComponent', () => {
  let component: ListePartiesComponent;
  let fixture: ComponentFixture<ListePartiesComponent>;
  let location: Location;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListePartiesComponent, ListePartieSimpleComponent, ListePartieMultipleComponent, PartieSoloComponent ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
      imports: [MatCardModule, RouterTestingModule.withRoutes([
        { path: "liste-parties", component: ListePartiesComponent },
        { path: "partie-solo", component: PartieSoloComponent },
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
});
