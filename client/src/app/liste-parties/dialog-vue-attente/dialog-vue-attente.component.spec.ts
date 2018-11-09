import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogVueAttenteComponent } from './dialog-vue-attente.component';
import { MatDividerModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('DialogVueAttenteComponent', () => {
  const dialogMock = {
    disableClose: true,
    close: () => { }
  };
  let component: DialogVueAttenteComponent;
  let fixture: ComponentFixture<DialogVueAttenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogVueAttenteComponent ],
      imports: [
        MatDividerModule,
        HttpClientTestingModule,
        RouterTestingModule,
    ],
      providers: [
        { provide: MatDialogRef, useValue: dialogMock },
        { provide: MAT_DIALOG_DATA, useValue: {} },
    ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogVueAttenteComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
