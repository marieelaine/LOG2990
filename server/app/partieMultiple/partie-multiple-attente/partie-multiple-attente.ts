import { injectable, inject } from "inversify";
import { ServiceWeb } from "../../serviceWeb";
import { Router, Request, Response } from "express";
import Types from "../../types";
import { SocketServerService } from "../../socket-io.service";
import * as constantes from "../../constantes";

@injectable()
export class RoutesPartieMultipleAttente extends ServiceWeb {

    private partieMultipleAttente: string[];
    public readonly mainRoute: string = constantes.URL_SLASH_STR;

    public constructor(@inject(Types.SocketServerService) private socket: SocketServerService) {
        super();
        this.partieMultipleAttente = [];
    }

    public get routes(): Router {
        const router: Router = Router();

        router.get(constantes.URL_PARTIE_MULTIPLE_GET, async (req: Request, res: Response) => {
            res.send(this.partieMultipleAttente);
        });

        router.post(constantes.URL_PARTIE_MULTIPLE_ADD, async (req: Request, res: Response) => {
            this.partieMultipleAttente.push(req.body.partieId);
            this.socket.envoyerPartieMultipleAttente(req.body.partieId);
            res.status(constantes.HTTP_CREATED).json(req.body.partieId);
        });

        router.delete(constantes.URL_PARTIE_MULTIPLE_DELETE, async (req: Request, res: Response) => {
            for (let i: number = 0 ; i < this.partieMultipleAttente.length ; i++) {
                if (this.partieMultipleAttente[i] === req.params.id) {
                    this.partieMultipleAttente.splice(i, 1);
                }
            }
            this.socket.supprimerPartieMultipleAttente(req.params.id);
            res.status(constantes.HTTP_CREATED).json(req.params.id);
        });

        router.post(constantes.URL_PARTIE_MULTIPLE_DIALOGUE, (req: Request, res: Response) => {
            this.socket.envoyerDialogMultipleFerme();
        });

        return router;
    }
}
