import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ChatComponent } from "./chat.component";
import { FormsModule } from "@angular/forms";

describe("ChatComponent", () => {
    let component: ChatComponent;
    let fixture: ComponentFixture<ChatComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                ChatComponent
            ],
            imports: [
                FormsModule
            ]
        });

        fixture = TestBed.createComponent(ChatComponent);
        component = fixture.componentInstance;
    });

    it("Devrait créer", () => {
        expect(component).toBeTruthy();
    });

    it("Devrait définir l'attribut messagesChat", () => {
        expect(component["messagesChat"]).toBeDefined();
    });

    it("ajouterMessageAuMessagesChat devrait ajouter un message au tableau messagesChat", () => {
        const msg: string = "Hello World";
        component["ajouterMessageAuMessagesChat"](msg);

        expect(component["messagesChat"]).toContain(component["getTempsCourant"]() + msg);
    });
});
