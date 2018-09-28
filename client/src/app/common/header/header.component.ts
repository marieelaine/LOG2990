import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { UserService } from "../../vue-initiale/user.service";
// import { Subscription } from "rxjs"; // Pour le prochain sprint.

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit, OnDestroy {
  // private subscriptionUsername: Subscription;  // Sera utilise dans le prochain sprint.
  private usernameCourant: string;

  public constructor(
      private router: Router,
      private cookieService: CookieService,
      private userService: UserService) {
    this.usernameCourant = "";
  }

  public ngOnInit() {
    // Pour le prochain sprint.
    // this.subscriptionUsername = this.userService.recevoirNouveauUser().subscribe((username: string) => {
    //   this.usernameCourant = username;
    // });
  }

  ngOnDestroy(): void {
    // Pour le prochain sprint.
    // if (this.subscriptionUsername) {
    //   this.subscriptionUsername.unsubscribe();
    //  }
  }

  public OnHeaderTitleClick() {
    this.router.navigateByUrl("/liste-parties");
  }

  public onLogout(): void {
    const cookieUsername: string = this.cookieService.get("username");
    this.cookieService.delete(cookieUsername);
    this.userService.delete(cookieUsername);
    this.router.navigate(["/"]);
  }
}
