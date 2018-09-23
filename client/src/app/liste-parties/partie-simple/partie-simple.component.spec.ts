import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartieSimpleComponent } from './partie-simple.component';

describe('PartieSimpleComponent', () => {
  let component: PartieSimpleComponent;
  let fixture: ComponentFixture<PartieSimpleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ PartieSimpleComponent ]
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
