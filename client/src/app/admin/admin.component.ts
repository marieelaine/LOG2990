import { Component, OnInit } from "@angular/core";
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"]
})

export class AdminComponent implements OnInit {

  public constructor(config: NgbModalConfig, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  openModal(content) {
    this.modalService.open(content);
  }
  // tslint:disable-next-line:typedef
  public ngOnInit()
  {
  }

}
