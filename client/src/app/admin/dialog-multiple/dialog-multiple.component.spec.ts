import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogMultipleComponent } from './dialog-multiple.component';

describe('DialogMultipleComponent', () => {
  let component: DialogMultipleComponent;
  let fixture: ComponentFixture<DialogMultipleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogMultipleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogMultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
