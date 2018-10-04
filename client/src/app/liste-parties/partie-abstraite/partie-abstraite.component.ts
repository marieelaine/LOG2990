import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-partie-abstraite',
  templateUrl: './partie-abstraite.component.html',
  styleUrls: ['./partie-abstraite.component.css']
})
export abstract class PartieAbstraiteComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
