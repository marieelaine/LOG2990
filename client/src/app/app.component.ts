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
      this.socketClientService.socket.on(event.CONNECTION_USER, (data) => {
          this.afficherNotificationConnection(data.joueur);
      });

      this.socketClientService.socket.on(event.DECONNECTION_USER, (data) => {
        this.afficherNotificationDeconnection(data.joueur);
      });

    }

    private afficherNotificationConnection(joueur: string): void {
      this.notifier.notify( "success", joueur + " s'est connecté" );
    }

    private afficherNotificationDeconnection(joueur: string): void {
      this.notifier.notify( "warning", joueur + " s'est déconnecté" );
    }
}
