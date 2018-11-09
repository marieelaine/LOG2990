import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PartieSimpleMultijoueurComponent } from './partie-multijoueur.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatCardModule } from '@angular/material';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ChatComponent } from 'src/app/chat/chat.component';
import { ActivatedRoute } from '@angular/router';
import { ActivatedRouteMock } from 'src/testing/mocks';

describe('PartieMultijoueurComponent', () => {
    let component: PartieSimpleMultijoueurComponent;
    let fixture: ComponentFixture<PartieSimpleMultijoueurComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [PartieSimpleMultijoueurComponent, ChatComponent],
            imports: [
                HttpClientTestingModule,
                MatCardModule
            ],
            providers: [
                {
                    provide: ActivatedRoute,
                    useClass: ActivatedRouteMock
                },
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        });

        fixture = TestBed.createComponent(PartieSimpleMultijoueurComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
