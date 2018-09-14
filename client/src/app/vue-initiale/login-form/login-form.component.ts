import { Component, OnInit } from "@angular/core";
import { User } from "../login-form/user";
declare var particlesJS: any;

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.css"]
})
export class LoginFormComponent implements OnInit {

  public constructor() { }
  
  model = new User("");

  submitted = false;

  onSubmit() { this.submitted = true; }

  // TODO: Remove this when we"re done
  get diagnostic() { return JSON.stringify(this.model); }

  public newUser() {
    this.model = new User("");
  }

  // tslint:disable-next-line:typedef
  public ngOnInit() {
    particlesJS.load("particles-js", "assets/particles.json", null);
  }

}
