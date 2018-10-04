import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { PartieSimpleComponent } from './partie-simple.component';

describe('PartieSimpleComponent', () => {
  let component: PartieSimpleComponent;
  let fixture: ComponentFixture<PartieSimpleComponent>;

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

});
