import { Component } from "@angular/core";
import { SocketClientService } from "./socket/socket-client.service";
import * as event from "../../../common/communication/evenementsSocket";
import { NotifierService } from "angular-notifier";

const MINUTESANDSECONDCONVERT: number = 10;
const SOLO: string = "mode solo";
const MULTIJOUEUR: string = "mode multijoueur";

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
      this.setEvenementsSockets();
     }

    public readonly title: string = "LOG2990";
    public message: string;

    private setEvenementsSockets(): void {
      this.socketClientService.socket.on(event.CONNECTION_USER, (data) => {
          this.afficherNotificationConnection(data.joueur);
      });

      this.socketClientService.socket.on(event.DECONNECTION_USER, (data) => {
        this.afficherNotificationDeconnection(data.joueur);
      });

      this.socketClientService.socket.on(event.MEILLEUR_TEMPS, (data) => {
        this.afficherNotificationMeilleurTemps(data.joueur, data.partie, data.isSolo, data.position);
      });
    }

    private afficherNotificationConnection(joueur: string): void {
      const temps: string = this.getTempsCourant();
      this.notifier.notify( "success", temps + " - " + joueur + " vient de se connecter." );
    }

    private afficherNotificationDeconnection(joueur: string): void {
      const temps: string = this.getTempsCourant();
      this.notifier.notify( "warning", temps + " - " + joueur + " vient de se déconnecter." );
    }

    private afficherNotificationMeilleurTemps(joueur: string, partie: string, isSolo: boolean, position: number): void {
      const mode: string = isSolo ? SOLO : MULTIJOUEUR;
      const temps: string = this.getTempsCourant();

      this.notifier.notify("info", temps + " - " + joueur + " obtient la position " + position +
                            " dans les meilleurs temps du jeu " + partie + " en " + mode);
    }

    public getTempsCourant(): string {
      const date: Date = new Date();

      return date.getHours() + ":" + this.getMinutes(date) + ":" + this.getSecondes(date);
  }

    private getMinutes(date: Date): string {

      return date.getMinutes() < MINUTESANDSECONDCONVERT ? "0" + date.getMinutes().toString() : date.getMinutes().toString();
}

    private getSecondes(date: Date): string {

    return date.getSeconds() < MINUTESANDSECONDCONVERT ? "0" + date.getSeconds().toString() : date.getSeconds().toString();
  }
}
