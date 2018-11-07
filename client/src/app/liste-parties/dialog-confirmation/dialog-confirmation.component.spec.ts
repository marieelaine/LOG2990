import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogConfirmationComponent } from './dialog-confirmation.component';
import { MatDividerModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserService } from 'src/app/vue-initiale/user.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('DialogConfirmationComponent', () => {
    let component: DialogConfirmationComponent;
    let fixture: ComponentFixture<DialogConfirmationComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [DialogConfirmationComponent],
            imports: [
                MatDividerModule,
                HttpClientTestingModule,
                RouterTestingModule,
            ],
            providers: [
                { provide: MatDialogRef, useValue: {} },
                { provide: MAT_DIALOG_DATA, useValue: {} },
            ]
        });

        fixture = TestBed.createComponent(DialogConfirmationComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
