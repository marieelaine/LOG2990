import { injectable, inject } from "inversify";
import { ServiceWeb } from "../../serviceWeb";
import { Router, Request, Response } from "express";
import Types from "../../types";
import { SocketServerService } from "../../socket-io.service";
import * as constantes from "../../constantes";

@injectable()
export class RoutesPartieSimpleAttente extends ServiceWeb {

    private partieSimpleAttente: string[];
    public readonly mainRoute: string = "/";

    public constructor(@inject(Types.SocketServerService) private socket: SocketServerService) {
        super();
        this.partieSimpleAttente = [];
    }

    public get routes(): Router {
        const router: Router = Router();

        router.get(constantes.URL_PARTIE_SIMPLE_GET, async (req: Request, res: Response) => {
            await this.getPartieSimpleEnAttente(req, res);
        });

        router.post(constantes.URL_PARTIE_SIMPLE_ADD, async (req: Request, res: Response) => {
           await this.ajouterPartieSimpleEnAttente(req, res);
        });

        router.delete(constantes.URL_PARTIE_SIMPLE_DELETE, async (req: Request, res: Response) => {
            await this.supprimerPartieSimpleEnAttente(req, res);
        });

        router.post(constantes.URL_PARTIE_SIMPLE_DIALOGUE, async (req: Request, res: Response) => {
            await this.fermerDialogPartieAttenteSimple(req, res);
        });

        return router;
    }

    public async getPartieSimpleEnAttente(req: Request, res: Response): Promise<void> {
        res.send(this.partieSimpleAttente);
    }

    public async ajouterPartieSimpleEnAttente(req: Request, res: Response): Promise<void> {
        this.partieSimpleAttente.push(req.body.partieId);
        this.socket.envoyerPartieSimpleAttente(req.body.partieId);
        res.status(constantes.HTTP_CREATED).json(req.body.partieId);
    }

    public async supprimerPartieSimpleEnAttente(req: Request, res: Response): Promise<void> {
        for (let i: number = 0 ; i < this.partieSimpleAttente.length ; i++) {
            if (this.partieSimpleAttente[i] === req.params.id) {
                this.partieSimpleAttente.splice(i, 1);
            }
        }
        this.socket.supprimerPartieSimpleAttente(req.params.id);
        res.status(constantes.HTTP_CREATED).json(req.params.id);
    }

    public async fermerDialogPartieAttenteSimple(req: Request, res: Response): Promise<void> {
        this.socket.envoyerDialogSimpleFerme();
    }
}
