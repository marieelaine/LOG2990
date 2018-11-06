import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartieSoloMultijoueurComponent } from './partie-solo-multijoueur.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatCardModule } from '@angular/material';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

describe('PartieMultijoueurComponent', () => {
    let component: PartieSoloMultijoueurComponent;
    let fixture: ComponentFixture<PartieSoloMultijoueurComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [PartieSoloMultijoueurComponent],
            imports: [
                MatCardModule,
                HttpClientTestingModule,
                RouterTestingModule,
            ],
            providers: [],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        });

        fixture = TestBed.createComponent(PartieSoloMultijoueurComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
