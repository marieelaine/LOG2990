import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChronoComponent } from './chrono.component';

describe('ChronoComponent', () => {
  let component: ChronoComponent;
  let fixture: ComponentFixture<ChronoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChronoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChronoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it ("should return value 0", () => {
    expect(component.getTime()).toBe(0);
  });

  it ("should return value 0", () => {
    component.startTimer();
    setTimeout(expect(component.getTime()).toBe(0), 5000);

  });
});
