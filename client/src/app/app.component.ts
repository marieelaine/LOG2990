import { Component } from "@angular/core";
import { SocketClientService } from "./socket/socket-client.service";
import * as event from "../../../common/communication/evenementsSocket";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
    public constructor(protected socketClientService: SocketClientService) {
      this.setSocketEvents();
     }

    public readonly title: string = "LOG2990";
    public message: string;

    private setSocketEvents(): void {
      this.socketClientService.socket.on(event.DIFFERENCE_TROUVEE_MULTIJOUEUR_SIMPLE, (data) => {
          this.afficherNotification(data.diff, data.joueur);
      });
    }

    private afficherNotification(): void {
      
    }
}
