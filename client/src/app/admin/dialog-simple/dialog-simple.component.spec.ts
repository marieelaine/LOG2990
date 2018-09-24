import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSimpleComponent } from './dialog-simple.component';
import { MatDividerModule, MatFormFieldModule, MatCardModule, MatDialogModule, MatDialogRef,
  MAT_DIALOG_DATA, MatFormFieldControl, MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DialogSimpleComponent', () => {
  let component: DialogSimpleComponent;
  let fixture: ComponentFixture<DialogSimpleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogSimpleComponent ],
      imports: [MatDividerModule, MatFormFieldModule, MatCardModule, FormsModule,
                MatDialogModule, MatInputModule, BrowserAnimationsModule, HttpClientTestingModule],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: [] }
]
})
.compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSimpleComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
