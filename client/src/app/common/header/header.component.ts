import { Component, ErrorHandler } from "@angular/core";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { UserService } from "../../vue-initiale/user.service";

const USERNAME: string = "username";
const URL_LISTE_PATIE: string = "/liste-parties";
const URL_SLASH: string = "/";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent {

  protected joueur: string;

  public constructor(
      private router: Router,
      private cookieService: CookieService,
      private userService: UserService) {  }

  protected deconnexion(): void {
    const cookieUsername: string = this.cookieService.get(USERNAME);
    this.cookieService.deleteAll();
    this.userService.supprimer(cookieUsername).catch(() => ErrorHandler);
    this.router.navigate([URL_SLASH]).catch(() => ErrorHandler);
  }

  protected surClickBanniere(): void {
    this.router.navigateByUrl(URL_LISTE_PATIE)
    .catch(() => ErrorHandler);
  }
}
