import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartieMultipleComponent } from './partie-multiple.component';
import { MatCardModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';

describe('PartieMultipleComponent', () => {
  let component: PartieMultipleComponent;
  let fixture: ComponentFixture<PartieMultipleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartieMultipleComponent ],
      imports: [ MatCardModule, RouterTestingModule]
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
