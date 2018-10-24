import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartieMultijoueurComponent } from './partie-multijoueur.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PartieMultijoueurComponent', () => {
  let component: PartieMultijoueurComponent;
  let fixture: ComponentFixture<PartieMultijoueurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ PartieMultijoueurComponent ],
      imports: [],
      providers: [HttpClientTestingModule]
    });

    fixture = TestBed.createComponent(PartieMultijoueurComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
