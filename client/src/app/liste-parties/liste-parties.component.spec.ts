import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListePartiesComponent } from './liste-parties.component';
import { PartieSimpleComponent } from './partie-simple/partie-simple.component';
import { PartieMultipleComponent } from './partie-multiple/partie-multiple.component';
import { MatCardHeader, MatCardModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';

describe('ListePartiesComponent', () => {
  let component: ListePartiesComponent;
  let fixture: ComponentFixture<ListePartiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListePartiesComponent, PartieSimpleComponent, PartieMultipleComponent ],
      imports: [MatCardModule, RouterTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListePartiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
