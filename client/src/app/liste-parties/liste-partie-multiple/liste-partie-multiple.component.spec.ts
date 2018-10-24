import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListePartieMultipleComponent } from './liste-partie-multiple.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PartieMultipleComponent', () => {
  let component: ListePartieMultipleComponent;
  let fixture: ComponentFixture<ListePartieMultipleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListePartieMultipleComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListePartieMultipleComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
