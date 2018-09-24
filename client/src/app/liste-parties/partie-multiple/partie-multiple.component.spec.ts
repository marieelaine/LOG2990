import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartieMultipleFonctions } from './partie-multiple.component';

describe('PartieMultipleComponent', () => {
  let component: PartieMultipleFonctions;
  let fixture: ComponentFixture<PartieMultipleFonctions>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartieMultipleFonctions ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartieMultipleFonctions);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
