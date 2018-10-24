import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogMultipleComponent } from './dialog-multiple.component';
import {
    MatDividerModule, MatFormFieldModule, MatCardModule, MatDialogModule, MatDialogRef,
    MAT_DIALOG_DATA, MatInputModule, MatRadioModule
} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PartieMultipleService } from '../partie-multiple.service';

describe('DialogMultipleComponent', () => {
    let mockPartieMultipleService: jasmine.SpyObj<PartieMultipleService>;
    let component: DialogMultipleComponent;
    let fixture: ComponentFixture<DialogMultipleComponent>;

    beforeEach(() => {
        mockPartieMultipleService = jasmine.createSpyObj(["register"]);

        TestBed.configureTestingModule({
            declarations: [DialogMultipleComponent],
            imports: [
                MatDividerModule,
                MatFormFieldModule,
                MatCardModule,
                FormsModule,
                MatDialogModule,
                MatInputModule,
                BrowserAnimationsModule,
                MatRadioModule,
                HttpClientTestingModule
            ],
            providers: [
                { provide: MatDialogRef, useValue: {} },
                { provide: MAT_DIALOG_DATA, useValue: {} },
                { provide: PartieMultipleService, useValue: mockPartieMultipleService },
            ]
        });

        fixture = TestBed.createComponent(DialogMultipleComponent);
        component = fixture.componentInstance;
    });

    it('Composant devrait être créé', () => {
        expect(component).toBeTruthy();
    });

    // describe("Fonction onClickAjouterPartie", () => {
    //     it("Devrait appeller la fonction setOutOfBoundNameLengthMessage", () => {
    //         // Arrange
    //         const spy: jasmine.Spy = spyOn<any>(component, "setOutOfBoundNameLengthMessage");

    //         // Act
    //         component["onClickAjouterPartie"]();

    //         // Assert
    //         expect(spy).toHaveBeenCalled();
    //     });
    // });
});
