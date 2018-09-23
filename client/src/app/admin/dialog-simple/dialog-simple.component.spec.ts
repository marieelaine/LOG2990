import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSimpleComponent } from './dialog-simple.component';

describe('DialogSimpleComponent', () => {
  let component: DialogSimpleComponent;
  let fixture: ComponentFixture<DialogSimpleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogSimpleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
