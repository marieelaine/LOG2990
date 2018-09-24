import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartieSoloComponent } from './partie-solo.component';
import { ChronoComponent } from '../chrono/chrono.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PartieSoloComponent', () => {
  let component: PartieSoloComponent;
  let fixture: ComponentFixture<PartieSoloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartieSoloComponent, ChronoComponent ],
      imports: [ HttpClientTestingModule]
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
