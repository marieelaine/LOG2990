import { Component } from '@angular/core';

@Component({
  selector: 'app-partie-simple',
  templateUrl: './partie-simple.component.html',
  styleUrls: ['./partie-simple.component.css']
})
export class PartieSimpleComponent {

  title: String;
  imagePath: String;
  times: number[];
  isElevatedActive = false;

  constructor() {
  }

}
