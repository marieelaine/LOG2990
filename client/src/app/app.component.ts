import { Component, ViewContainerRef } from "@angular/core";
import { SocketClientService } from "./socket/socket-client.service";
import * as event from "../../../common/communication/evenementsSocket";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
    public constructor(
      protected socketClientService: SocketClientService,
      ) {
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
      // tslint:disable-next-line:no-console
      console.log("hey");
    }
}
