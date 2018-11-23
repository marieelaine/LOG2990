import { MatDialog } from "@angular/material";
import { Overlay, OverlayContainer } from "@angular/cdk/overlay";
import { Injector } from "@angular/core";
import { Location } from "@angular/common";

export class MatDialogMock extends MatDialog {
    public constructor() {
        super({} as Overlay, {} as Injector, {} as Location, {}, {}, {} as MatDialog, {} as OverlayContainer);
    }
}
