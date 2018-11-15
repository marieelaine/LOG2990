import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
    public constructor() { }

    public readonly title: string = "LOG2990";
    public message: string;

}
