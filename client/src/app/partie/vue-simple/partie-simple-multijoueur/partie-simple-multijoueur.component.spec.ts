import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartieSimpleMultijoueurComponent } from './partie-simple-multijoueur.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatCardModule } from '@angular/material';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

describe('PartieSimpleMultijoueurComponent', () => {
    let component: PartieSimpleMultijoueurComponent;
    let fixture: ComponentFixture<PartieSimpleMultijoueurComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [PartieSimpleMultijoueurComponent],
            imports: [
                MatCardModule,
                HttpClientTestingModule,
                RouterTestingModule,
            ],
            providers: [],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        });

        fixture = TestBed.createComponent(PartieSimpleMultijoueurComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
