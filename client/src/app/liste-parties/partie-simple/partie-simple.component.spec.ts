import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartieSimpleComponent } from './partie-simple.component';
import { MatCardModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';

describe('PartieSimpleComponent', () => {
  let component: PartieSimpleComponent;
  let fixture: ComponentFixture<PartieSimpleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ PartieSimpleComponent ],
      imports: [MatCardModule, RouterTestingModule]
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
