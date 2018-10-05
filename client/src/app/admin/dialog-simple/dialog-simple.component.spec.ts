import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSimpleComponent } from './dialog-simple.component';
import { MatDividerModule, MatFormFieldModule, MatCardModule, MatDialogModule, MatDialogRef,
  MAT_DIALOG_DATA, MatFormFieldControl, MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { createMockImageFile, createMockBmpFile } from '../../../testing/file-creator';
import { By } from '@angular/platform-browser';

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

  it('should set outOfBoundNameLengthMessage if name does not meet requierments', () => {
    component.data.simpleGameName = "aaaaaaaaaaaaaaaaaaaaa"; // Nom plus long que vingt caractères
    component.setOutOfBoundNameLengthMessage();  // Cette fonction teste aussi checkIfOutOfBoundNameLength()
    expect(component.outOfBoundNameLengthMessage).toEqual("*Le nom du jeu doit être entre 3 et 20 charactères.");
  });

  it('should not set outOfBoundNameLengthMessage if name meet requierments', () => {
    component.data.simpleGameName = "Nissan Patrol"; // Nom correct
    component.setOutOfBoundNameLengthMessage();  // Cette fonction teste aussi checkIfOutOfBoundNameLength()
    expect(component.outOfBoundNameLengthMessage).toEqual("");
  });

  it('should set wrongNumberOfImagesMessage if there are less than two images', () => {
    component.selectedFiles[0] = createMockImageFile(true);
    component.setWrongNumberOfImagesMessage();  // Cette fonction teste aussi checkIfWrongNumberOfImages()
    expect(component.wrongNumberOfImagesMessage).toEqual('*Vous devez entrer deux images.');
  });

  it('should not set wrongNumberOfImagesMessage if there are two images', () => {
    component.selectedFiles[0] = createMockImageFile(true);
    component.selectedFiles[1] = createMockImageFile(true);
    component.setWrongNumberOfImagesMessage();  // Cette fonction teste aussi checkIfWrongNumberOfImages()
    expect(component.wrongNumberOfImagesMessage).toEqual('');
  });

  it('should call onFileSelectedImage when an image is uploaded', () => {
  const uploadImage1 = fixture.debugElement.query(By.css('#uploadImage1')).nativeElement;

  spyOn(component, 'onFileSelectedImage');
  uploadImage1.dispatchEvent(new Event('change'));
  expect(component.onFileSelectedImage).toHaveBeenCalled();
  });

  it('should close the dialog if cancel button is clicked', () => {
    const onNoClickButton = fixture.debugElement.query(By.css('#onNoClickButton')).nativeElement;

    spyOn(component, 'onNoClick');
    onNoClickButton.dispatchEvent(new Event('click'));

    expect(component.onNoClick).toHaveBeenCalled();
  });

  it('should call onAddSimpleGameClick when an add game button is clicked', () => {
    const onAddClickButton = fixture.debugElement.query(By.css('#onAddClickButton')).nativeElement;

    spyOn(component, 'onAddSimpleGameClick');
    onAddClickButton.dispatchEvent(new Event('click'));

    expect(component.onAddSimpleGameClick).toHaveBeenCalled();
  });

  it('should set wrongImageSizeOrTypeMessage image does not respect good size', () => {
    const imageInfo = { "size": 64, "width": 1080, "height": 480 };
    component.selectedFiles[0] = createMockImageFile(true);  // isBMP = true
    component.setWrongImageSizeOrTypeMessage(imageInfo);  // Cette fonction teste aussi checkIfWrongImageSize() et checkIfWrongImageType
    expect(component.wrongImageSizeOrTypeMessage).toEqual("*L'image doit être de format BMP 24 bits et de taille 640 x 480 pixels");
  });

  it('should set wrongImageSizeOrTypeMessage image does not respect good type', () => {
    const imageInfo = { "size": 24, "width": 640, "height": 480 };
    component.currentImageNumber = 0;
    component.selectedFiles[0] = createMockImageFile(false);  // isBMP = false
    component.setWrongImageSizeOrTypeMessage(imageInfo);  // Cette fonction teste aussi checkIfWrongImageSize() et checkIfWrongImageType
    expect(component.wrongImageSizeOrTypeMessage).toEqual("*L'image doit être de format BMP 24 bits et de taille 640 x 480 pixels");
  });

  it('should not set wrongImageSizeOrTypeMessage image respect good type and size', () => {
    const imageInfo = { "size": 24, "width": 640, "height": 480 };
    component.selectedFiles[0] = createMockImageFile(true);  // isBMP = true
    component.setWrongImageSizeOrTypeMessage(imageInfo);  // Cette fonction teste aussi checkIfWrongImageSize() et checkIfWrongImageType
    expect(component.wrongImageSizeOrTypeMessage).toEqual("");
  });

  // it('should add new game to simple games list', () => {
  //   const expectedNumberOfGames = component.listeParties.listePartiesSimples.length + 1;
  //   component.createNewSimpleGameCardAndAddToList();  // Cette fonction teste aussi addNewSimpleGameCardToList()

  //   expect(component.listeParties.listePartiesSimples.length).toEqual(expectedNumberOfGames);
  // });
});
