import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartieMultipleComponent } from './partie-multiple.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

describe('PartieMultipleComponent', () => {
  let component: PartieMultipleComponent;
  let fixture: ComponentFixture<PartieMultipleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartieMultipleComponent ]
      imports: [RouterTestingModule],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartieMultipleComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
