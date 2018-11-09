import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PartieSimpleSoloComponent } from './partie-simple-solo.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatCardModule } from '@angular/material';
import { ErrorHandler } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActivatedRouteMock } from 'src/testing/mocks';
import { ChatComponent } from 'src/app/chat/chat.component';

describe('PartieSoloComponent', () => {
    let component: PartieSimpleSoloComponent;
    let fixture: ComponentFixture<PartieSimpleSoloComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PartieSimpleSoloComponent, ChatComponent],
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
        fixture = TestBed.createComponent(PartieSimpleSoloComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
