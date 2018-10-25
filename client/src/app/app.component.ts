import { Component, OnInit } from "@angular/core";
import { Message } from "../../../common/communication/message";
import { BasicService } from "./basic.service";
import * as io from "socket.io-client";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
    public constructor(private basicService: BasicService) { }

    public readonly title: string = "LOG2990";
    public message: string;

    public ngOnInit(): void {
        this.basicService.basicGet().subscribe((message: Message) => this.message = message.title + message.body);
        // io.connect("localhost:4200");
    }
}
