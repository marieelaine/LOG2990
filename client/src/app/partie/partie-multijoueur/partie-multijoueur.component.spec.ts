import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartieMultijoueurComponent } from './partie-multijoueur.component';

describe('PartieMultijoueurComponent', () => {
  let component: PartieMultijoueurComponent;
  let fixture: ComponentFixture<PartieMultijoueurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartieMultijoueurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartieMultijoueurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
