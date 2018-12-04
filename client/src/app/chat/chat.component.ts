import { Component } from "@angular/core";
import * as constantes from "../constantes";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.css"]
})
export class ChatComponent {

  public messagesChat: Array<string>;
  protected message: string;

  public constructor() {
    this.messagesChat = new Array<string>();
  }

  public ajouterMessageAuMessagesChat(msg: string): void {
    this.messagesChat.push(this.getTempsCourant() + msg);
  }

  protected envoyerMessage(): void {
    if (this.message !== "") {
      this.messagesChat.push(this.getTempsCourant() + " - " + this.message);
    }
    this.message = "";
  }

  protected getTempsCourant(): string {
    const date: Date = new Date();

    return date.getHours() + constantes.DEUX_POINTS_TEMPS_FORMAT
        + this.getMinutes(date)
        + constantes.DEUX_POINTS_TEMPS_FORMAT
        + this.getSecondes(date);
  }

  private getMinutes(date: Date): string {
    return date.getMinutes() < constantes.CONVERSION_TEMPS ?
        constantes.ZERO_STR_FORMAT + date.getMinutes().toString()
        : date.getMinutes().toString();
  }

  private getSecondes(date: Date): string {
    return date.getSeconds() < constantes.CONVERSION_TEMPS ?
        constantes.ZERO_STR_FORMAT + date.getSeconds().toString()
        : date.getSeconds().toString();
  }
}
