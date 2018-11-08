import { Component } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {

  public messagesChat: Array<string>;

  constructor() {
    this.messagesChat = new Array<string>();
  }

  public addMessageToMessagesChat(msg: string): void {
    this.messagesChat.push(msg);
  }
}
