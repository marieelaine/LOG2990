import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VueInitialeComponent } from './vue-initiale.component';

describe('VueInitialeComponent', () => {
  let component: VueInitialeComponent;
  let fixture: ComponentFixture<VueInitialeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VueInitialeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VueInitialeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
