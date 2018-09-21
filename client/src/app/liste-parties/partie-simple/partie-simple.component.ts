import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-partie-simple',
  templateUrl: './partie-simple.component.html',
  styleUrls: ['./partie-simple.component.css']
})
export class PartieSimpleComponent implements OnInit {

  isElevatedActive = false;

  constructor() { }

  ngOnInit() {
  }

}

export class PartieSimple {
  title: String;
  imagePath: String;
}
