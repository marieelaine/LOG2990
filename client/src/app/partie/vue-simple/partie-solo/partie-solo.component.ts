import { Component, OnInit} from '@angular/core';
import { PartieAbstraiteClass } from '../../partie-abstraite-class';
import { ActivatedRoute} from "@angular/router";
import { PartieSimple} from "../../../admin/dialog-simple/partie-simple";
import { PartieSimpleService} from "../../partie-simple.service";

@Component({
    selector: 'app-partie-solo',
    templateUrl: './partie-solo.component.html',
    styleUrls: ['./partie-solo.component.css'],
    providers: [PartieSimpleService]
})

export class PartieSoloComponent extends PartieAbstraiteClass {

    public constructor(private route: ActivatedRoute,
                       protected partieSimpleService: PartieSimpleService
    ) {
        super();
        this.getID();
        this.getPartie();
    }

    protected partieID: string;
    protected partie: PartieSimple;
    protected image1: Blob;
    protected image2: Blob;

    protected getID(): void {
        // this.partieID = this.route.snapshot.paramMap.get('idPartie');
        this.partieID = "5bcfeab96b82573740791a99" +
            "";
    }

    protected getPartie(): void {
        this.partieSimpleService.getPartieSimple(this.partieID).subscribe((res: PartieSimple) => {
            this.partie = res;
            this.setup();
        });
    }

    protected setup(): void {

      // const a = this.partie._image1;
      // const b = this.partie._image2;

      // let enc = new TextEncoder();
      // console.log(a);
      // console.log(b);

        this.image1 = new Blob([/*Array*/], {type : "image/bmp"});
    }
}
