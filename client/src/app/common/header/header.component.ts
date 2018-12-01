import { Component, ErrorHandler } from "@angular/core";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { UserService } from "../../vue-initiale/user.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent {

  public constructor(
      private router: Router,
      private cookieService: CookieService,
      private userService: UserService) {
  }

  protected deconnexion(): void {
    const cookieUsername: string = this.cookieService.get("username");
    this.cookieService.deleteAll();
    this.userService["delete"](cookieUsername).catch(() => ErrorHandler);
    this.router.navigate(["/"]).catch(() => ErrorHandler);
  }

  protected surClickBanniere(): void {
    this.router.navigateByUrl("/liste-parties")
    .catch(() => ErrorHandler);
  }
}
