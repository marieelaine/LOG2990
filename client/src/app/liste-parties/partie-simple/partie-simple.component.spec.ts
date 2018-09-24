import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartieSimpleFonctions } from './partie-simple.component';

describe('PartieSimpleComponent', () => {
  let component: PartieSimpleFonctions;
  let fixture: ComponentFixture<PartieSimpleFonctions>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartieSimpleFonctions ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartieSimpleFonctions);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
