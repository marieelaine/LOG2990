import { Injectable } from '@angular/core';
import * as io from "socket.io-client";
import * as Rx from "rxjs";
import { environment } from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ClientSocketService {

  private socket;

  constructor() { }

  public connect(): Rx.Subject<MessageEvent> {
    this.socket = io(environment.wbUrl);

    const observable = new Rx.Observable((obs) => {
      this.socket.on("message", (data) => {
        console.log("Received data : " + data);
        obs.next(data);
      });

      return () => {
        this.socket.disconnect();
      };
    });

    const observer = {
      next: (data: Object) => {
        this.socket.emit("message", JSON.stringify(data));
      }
    };

    return Rx.Subject.create(observable, observer);
  }
}
