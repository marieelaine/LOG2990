import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {PartieMultipleSoloComponent} from './partie-multiple-solo.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MatCardModule} from '@angular/material';
import {ChatComponent} from 'src/app/chat/chat.component';
import {ActivatedRoute} from '@angular/router';
import {ActivatedRouteMock} from 'src/testing/mocks';
import {CookieService} from "ngx-cookie-service";
import {ErrorHandler} from "@angular/core";

describe('PartieMultipleSoloComponent', () => {
    let component: PartieMultipleSoloComponent;
    let fixture: ComponentFixture<PartieMultipleSoloComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PartieMultipleSoloComponent, ChatComponent],
            imports: [
                HttpClientTestingModule,
                MatCardModule
            ],
            providers: [
                {
                    provide: ActivatedRoute,
                    useClass: ActivatedRouteMock,
                },
                CookieService
            ],
        })
            .compileComponents()
            .catch(() => ErrorHandler);
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PartieMultipleSoloComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
