import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartieSoloComponent } from './partie-solo.component';

describe('PartieSoloComponent', () => {
  let component: PartieSoloComponent;
  let fixture: ComponentFixture<PartieSoloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartieSoloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartieSoloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
