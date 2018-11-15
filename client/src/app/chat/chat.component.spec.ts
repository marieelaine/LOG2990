import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ChatComponent} from './chat.component';
import {ErrorHandler} from "@angular/core";

describe('ChatComponent', () => {
    let component: ChatComponent;
    let fixture: ComponentFixture<ChatComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ChatComponent]
        })
            .compileComponents()
            .catch(() => ErrorHandler);
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ChatComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it("addMessageToMessagesChat devrait ajouter un message au tableau messagesChat", () => {
        const msg: string = "Hello World";
        component["addMessageToMessagesChat"](msg);

        expect(component["messagesChat"]).toContain(msg);
    });
});
