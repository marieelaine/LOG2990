import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartieSoloComponent } from './partie-solo.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatCardModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { ErrorHandler } from '@angular/core';
// import { ChronoComponent } from '../../chrono/chrono.component';

describe('PartieSoloComponent', () => {
    let component: PartieSoloComponent;
    let fixture: ComponentFixture<PartieSoloComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PartieSoloComponent],
            imports: [
                HttpClientTestingModule,
                RouterTestingModule,
                MatCardModule
            ],
        })
            .compileComponents()
            .catch(() => ErrorHandler);
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PartieSoloComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

});
