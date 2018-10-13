import { Component } from '@angular/core';

@Component({
    selector: 'app-image',
    templateUrl: './image.component.html',
    styleUrls: ['./image.component.css']
})

export class ImageComponent {

    imagePath: string;

    constructor(path: string) {
        this.imagePath = path;
    }
}
