import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PartieSimpleFonctions } from './partie-simple.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('PartieSimpleComponent', () => {
  let component: PartieSimpleFonctions;
  let fixture: ComponentFixture<PartieSimpleFonctions>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ PartieSimpleFonctions ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartieSimpleFonctions);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
