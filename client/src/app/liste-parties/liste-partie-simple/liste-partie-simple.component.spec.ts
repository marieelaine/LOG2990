import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { ListePartieSimpleComponent } from './liste-partie-simple.component';

describe('PartieSimpleComponent', () => {
  let component: ListePartieSimpleComponent;
  let fixture: ComponentFixture<ListePartieSimpleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ ListePartieSimpleComponent ],
      imports: [RouterTestingModule],
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

});
