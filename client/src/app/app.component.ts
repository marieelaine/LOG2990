import { Component, ViewContainerRef } from "@angular/core";
import { SocketClientService } from "./socket/socket-client.service";
import * as event from "../../../common/communication/evenementsSocket";
import { NotifierService } from "angular-notifier";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
    private readonly notifier: NotifierService;

    public constructor(
      protected socketClientService: SocketClientService,
      notifier: NotifierService
      ) {
      this.notifier = notifier;
      this.setSocketEvents();
     }

    public readonly title: string = "LOG2990";
    public message: string;

    private setSocketEvents(): void {
      this.socketClientService.socket.on(event.ENVOYER_PARTIE_SIMPLE_ATTENTE, (data) => {
          this.afficherNotification();
      });
    }

    private afficherNotification(): void {
      this.notifier.notify( "success", "You are awesome! I mean it!" );
      // tslint:disable-next-line:no-console
      console.log("hey");
    }
}
