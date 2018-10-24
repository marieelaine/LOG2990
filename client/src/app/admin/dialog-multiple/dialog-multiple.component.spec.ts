import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogMultipleComponent } from './dialog-multiple.component';
import { MatDividerModule, MatFormFieldModule, MatCardModule, MatDialogModule, MatDialogRef,
         MAT_DIALOG_DATA, MatFormFieldControl, MatInputModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('DialogMultipleComponent', () => {
  let component: DialogMultipleComponent;
  let fixture: ComponentFixture<DialogMultipleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DialogMultipleComponent],
      imports: [MatDividerModule, MatFormFieldModule, MatCardModule, FormsModule,
                MatDialogModule, MatInputModule, BrowserAnimationsModule],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: [] }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogMultipleComponent);
    component = fixture.componentInstance;
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
