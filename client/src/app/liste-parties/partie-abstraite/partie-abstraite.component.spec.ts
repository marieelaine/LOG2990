import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartieAbstraiteComponent } from './partie-abstraite.component';

describe('PartieAbstraiteComponent', () => {
  let component: PartieAbstraiteComponent;
  let fixture: ComponentFixture<PartieAbstraiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartieAbstraiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartieAbstraiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
