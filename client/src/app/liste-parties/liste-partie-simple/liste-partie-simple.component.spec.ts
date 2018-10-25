import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { ListePartieSimpleComponent } from './liste-partie-simple.component';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PartieSimpleComponent', () => {
  let component: ListePartieSimpleComponent;
  let fixture: ComponentFixture<ListePartieSimpleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ ListePartieSimpleComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListePartieSimpleComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should call onJouerOuReinitialiserClick when click on "Jouer" or "Reinitialiser" button', () => {
  //   const button = fixture.debugElement.query(By.css('#boutonJouerOurReinitialiser')).nativeElement;

  //   spyOn(component, 'onJouerOuReinitialiserClick');
  //   button.dispatchEvent(new Event('click'));

  //   expect(component.onJouerOuReinitialiserClick).toHaveBeenCalled();
  // });

});
