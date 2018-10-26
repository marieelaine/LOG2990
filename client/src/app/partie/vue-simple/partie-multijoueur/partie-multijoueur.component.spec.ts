import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartieMultijoueurComponent } from './partie-multijoueur.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatCardModule } from '@angular/material';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

describe('PartieMultijoueurComponent', () => {
    let component: PartieMultijoueurComponent;
    let fixture: ComponentFixture<PartieMultijoueurComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [PartieMultijoueurComponent],
            imports: [
                MatCardModule,
                HttpClientTestingModule,
                RouterTestingModule,
            ],
            providers: [],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        });

        fixture = TestBed.createComponent(PartieMultijoueurComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
