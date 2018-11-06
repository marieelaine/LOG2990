import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogVueAttenteComponent } from './dialog-vue-attente.component';

describe('DialogVueAttenteComponent', () => {
  let component: DialogVueAttenteComponent;
  let fixture: ComponentFixture<DialogVueAttenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogVueAttenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogVueAttenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
