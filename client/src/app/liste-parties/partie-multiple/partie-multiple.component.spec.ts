import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartieMultipleComponent } from './partie-multiple.component';

describe('PartieMultipleComponent', () => {
  let component: PartieMultipleComponent;
  let fixture: ComponentFixture<PartieMultipleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartieMultipleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartieMultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
