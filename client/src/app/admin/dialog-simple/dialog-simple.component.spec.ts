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

  it('should return true if all error messages are null', () => {
    component.outOfBoundNameLengthMessage = "";
    component.wrongImageSizeOrTypeMessage = "";
    component.wrongNumberOfImagesMessage = "";
    expect(component.checkIfNoErrorMessage()).toBe(true);
  });

  it('should return false if at least one error message is not null', () => {
    component.outOfBoundNameLengthMessage = "Error message";
    expect(component.checkIfNoErrorMessage()).toBe(false);
  });

  it('should set outOfBoundNameLengthMessage if name does not meet requierments', () => {
    component.data.simpleGameName = "A"; // Nom plus court que trois caractères
    component.setOutOfBoundNameLengthMessage();  // Cette fonction teste aussi checkIfOutOfBoundNameLength()
    expect(component.outOfBoundNameLengthMessage).toEqual("*Le nom du jeu doit être entre 3 et 20 charactères.");
  });

  it('should not set outOfBoundNameLengthMessage if name meet requierments', () => {
    component.data.simpleGameName = "Nissan Patrol"; // Nom plus court que trois caractères
    component.setOutOfBoundNameLengthMessage();  // Cette fonction teste aussi checkIfOutOfBoundNameLength()
    expect(component.outOfBoundNameLengthMessage).toEqual("");
  });

  it('should set wrongNumberOfImagesMessage if there are less than two images', () => {
    component.setWrongNumberOfImagesMessage();  // Cette fonction teste aussi checkIfWrongNumberOfImages()
    expect(component.wrongNumberOfImagesMessage).toEqual('*Vous devez entrer deux images.');
  });

  it('should set wrongNumberOfImagesMessage if there are less than two images', () => {
    const content = "Test image";
    const data = new Blob([content], { type: 'image' });
    const arrayOfBlob = new Array<Blob>();
    arrayOfBlob.push(data);
    component.selectedFiles[0] = new File(arrayOfBlob, "MockFile");
    component.selectedFiles[1] = new File(arrayOfBlob, "MockFile");
    component.setWrongNumberOfImagesMessage();  // Cette fonction teste aussi checkIfWrongNumberOfImages()
    expect(component.wrongNumberOfImagesMessage).toEqual('');
  });
});
