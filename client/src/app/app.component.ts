import { Component, OnInit } from "@angular/core";
import { Message } from "../../../common/communication/message";
import { BasicService } from "./basic.service";
import { SocketClient } from "./socket/socket-client";
import { MatDialog } from "@angular/material";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
    public constructor(private basicService: BasicService, private dialog: MatDialog) { }

    public socket: SocketClient;
    public readonly title: string = "LOG2990";
    public message: string;

    public ngOnInit(): void {
        this.basicService.basicGet().subscribe((message: Message) => this.message = message.title + message.body);
        this.socket = new SocketClient(this.dialog);
    }
}
