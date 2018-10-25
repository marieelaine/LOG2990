import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListePartieMultipleComponent } from './liste-partie-multiple.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ListePartieServiceService } from '../liste-partie-service.service';

describe('PartieMultipleComponent', () => {
    let mockListePartieService: jasmine.SpyObj<ListePartieServiceService>;

    let component: ListePartieMultipleComponent;
    let fixture: ComponentFixture<ListePartieMultipleComponent>;

    beforeEach(() => {
        mockListePartieService = jasmine.createSpyObj([
            "deletePartieSimple",
            "reinitialiserTempsPartie"
        ]);

        TestBed.configureTestingModule({
            declarations: [
                ListePartieMultipleComponent
            ],
            imports: [
                RouterTestingModule,
                HttpClientTestingModule
            ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA
            ],
            providers: [
                { provide: ListePartieServiceService, useValue: mockListePartieService },
            ]
        });

        fixture = TestBed.createComponent(ListePartieMultipleComponent);
        component = fixture.componentInstance;
    });

    it('Devrait creer le composant', () => {
        expect(component).toBeDefined();
    });
});
