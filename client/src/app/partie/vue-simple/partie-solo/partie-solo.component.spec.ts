import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';

import { PartieSoloComponent } from './partie-solo.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { ChronoComponent } from '../../chrono/chrono.component';

describe('PartieSoloComponent', () => {
  let component: PartieSoloComponent;
  let fixture: ComponentFixture<PartieSoloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartieSoloComponent ],
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
