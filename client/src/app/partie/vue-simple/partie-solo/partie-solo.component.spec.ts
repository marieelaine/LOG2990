import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PartieSoloComponent } from './partie-solo.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatCardModule } from '@angular/material';
import { ErrorHandler } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActivatedRouteMock } from 'src/testing/mocks';
import { ChatComponent } from 'src/app/chat/chat.component';

describe('PartieSoloComponent', () => {
    let component: PartieSoloComponent;
    let fixture: ComponentFixture<PartieSoloComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PartieSoloComponent, ChatComponent],
            imports: [
                HttpClientTestingModule,
                MatCardModule
            ],
            providers: [
                {
                    provide: ActivatedRoute,
                    useClass: ActivatedRouteMock
                },
            ]
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
