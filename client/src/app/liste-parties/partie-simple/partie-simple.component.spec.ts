import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartieSimpleFonctions } from './partie-simple.component';

describe('PartieSimpleComponent', () => {
  let component: PartieSimpleFonctions;
  let fixture: ComponentFixture<PartieSimpleFonctions>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ PartieSimpleFonctions ]
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
