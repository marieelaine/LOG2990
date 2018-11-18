import { SocketClientService } from "src/app/socket/socket-client.service";
import * as event from "../../../../../common/communication/evenementsSocket";
import { _MatTabHeaderMixinBase } from "@angular/material/tabs/typings/tab-header";

export class Multijoueur {

    public constructor(private socketClientService: SocketClientService) {
        this.setSocketEvents();
    }

    public differenceTrouvee(): void {
        this.socketClientService.socket.emit(event.DIFFERENCE_TROUVEE_MULTIJOUEUR);
    }

    private setSocketEvents(): void {
        this.socketClientService.socket.on(event.DIFFERENCE_TROUVEE_MULTIJOUEUR, () => {

        });
    }
}
