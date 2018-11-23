import { Component, ViewContainerRef } from "@angular/core";
import { SocketClientService } from "./socket/socket-client.service";
import * as event from "../../../common/communication/evenementsSocket";
import { NotifierService } from "angular-notifier";

const MINUTESANDSECONDCONVERT: number = 10;

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

      this.socketClientService.socket.on(event.MEILLEUR_TEMPS, (data) => {
        this.afficherNotificationMeilleurTemps(data.joueur, data.partie);
      });
    }

    private afficherNotificationConnection(joueur: string): void {
      const temps: string = this.getCurrentTime();
      this.notifier.notify( "success", temps + " - " + joueur + " s'est connecté" );
    }

    private afficherNotificationDeconnection(joueur: string): void {
      const temps: string = this.getCurrentTime();
      this.notifier.notify( "warning", temps + " - " + joueur + " s'est déconnecté" );
    }

    private afficherNotificationMeilleurTemps(joueur: string, partie: string): void {
      const temps: string = this.getCurrentTime();
      this.notifier.notify("info", temps + " - " + joueur + " s'est classé dans le tableau des meilleurs temps pour la partie " + partie);
    }

    public getCurrentTime(): string {
      const date: Date = new Date();

      return date.getHours() + ":" + this.getMinutes(date) + ":" + this.getSeconds(date);
  }

    private getMinutes(date: Date): string {

      return date.getMinutes() < MINUTESANDSECONDCONVERT ? "0" + date.getMinutes().toString() : date.getMinutes().toString();
}

    private getSeconds(date: Date): string {

    return date.getSeconds() < MINUTESANDSECONDCONVERT ? "0" + date.getSeconds().toString() : date.getSeconds().toString();
  }
}
