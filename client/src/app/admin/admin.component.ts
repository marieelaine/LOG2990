import { Component, OnInit } from "@angular/core";
import { NgbModal, NgbModalConfig } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-admin',
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"]
})

export class AdminComponent implements OnInit {

  selectedFile: File;
  // MongoClient = require('mongodb').MongoClient;

  constructor(config: NgbModalConfig, private modalService: NgbModal) {
    config.backdrop = "static";
    config.keyboard = false;
  }

  onOpenModal(content) {
    this.modalService.open(content);
  }

  insertDB() {
  // var MongoClient = require('mongodb').MongoClient;

  /*var DB_USER = "olivierND";
  var DB_PASSWORD = "ol1v13rn";
  var DB_DB = "projet2";
  var DB_HOST = "ds157742.mlab.com";
  var DB_PORT = "57742";

  var DB_URL = "mongodb://" + DB_USER + ":" + DB_PASSWORD + "@" + DB_HOST + ":" + DB_PORT + "/" + DB_DB;

  MongoClient.connect(DB_URL,{useNewUrlParser : true}, function(err,client){
      var db = client.db(DB_DB);
      var cours = db.collection("cours");

      var log2990 = { sigle : "LOG2990", credits : 3};
      cours.insertOne(log2990,function(error,res){
          if (err) throw err;
      console.log("document inserée");
      })
      client.close();
  })*/
}

  onFileSelected(event) {
    this.selectedFile = this.selectedFile = event.target.files[0] as File;
    // this.insertItemInDBCollection('Images', this.selectedFile);
  }

  // tslint:disable-next-line:typedef
  public ngOnInit() {
  }

}
