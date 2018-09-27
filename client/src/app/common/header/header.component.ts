import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { UserService } from "../../vue-initiale/user.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {

  public constructor(private router: Router, private cookieService: CookieService, private userService: UserService) { }

  // tslint:disable-next-line:typedef
  public ngOnInit() {
  }

  public OnHeaderTitleClick() {
    this.router.navigateByUrl("/liste-parties");
  }

  public onLogout(): void {
    // TODO
    console.log("clicked");

    // this.cookieService.delete();
    // delete dans la db
    this.userService.delete();
  }

}
