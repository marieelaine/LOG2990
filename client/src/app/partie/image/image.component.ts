import {Component, Input} from '@angular/core';

export interface ImageInterface {
    path: string;
}

@Component({
    selector: 'app-image',
    templateUrl: './image.component.html',
    styleUrls: ['./image.component.css']
})

export class ImageComponent {
    constructor() {
    }
}
