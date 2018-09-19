import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {

  public constructor(private router: Router) { }

  // tslint:disable-next-line:typedef
  public ngOnInit() {
  }

  public OnHeaderTitleClick() {
    this.router.navigateByUrl("/liste-parties");
  }

}
