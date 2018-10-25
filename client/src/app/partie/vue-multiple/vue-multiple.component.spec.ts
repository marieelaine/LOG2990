import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { VueMultipleComponent } from './vue-multiple.component';

describe('VueMultipleComponent', () => {
  let component: VueMultipleComponent;
  let fixture: ComponentFixture<VueMultipleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VueMultipleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VueMultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
