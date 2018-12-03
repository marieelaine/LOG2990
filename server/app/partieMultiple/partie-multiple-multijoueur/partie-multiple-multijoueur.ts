import { inject } from "inversify";
import Types from "../../types";
import { SocketServerService } from "../../socket-io.service";
import { Request, Response, Router} from "express";
import * as constantes from "../../constantes";
import { ServiceWeb } from "../../serviceWeb";

export class PartieMultipleMultijoueur extends ServiceWeb {

    public readonly mainRoute: string = "/partieMultiple";

    public constructor(@inject(Types.SocketServerService) private socket: SocketServerService) {
        super();
    }

    public get routes(): Router {
        const router: Router = Router();

        router.post(constantes.URL_PARTIE_MULTIPLE_MULTIJOUEUR_JOINDRE, (req: Request, res: Response) => {
            this.requeteEnvoyerJoindreMultiple(req, res);
        });

        router.post(constantes.URL_PARTIE_MULTIPLE_MULTIJOUEUR_DIFF_TROUVEE, (req: Request, res: Response) => {
            this.requeteEnvoyerDiffTrouveeMultiple(req, res);
        });

        router.post(constantes.URL_PARTIE_MULTIPLE_MULTIJOUEUR_PARTIE_TERMINEE, (req: Request, res: Response) => {
            this.requeteEnvoyerPartieMultipleTerminee(req, res);
        });

        router.post(constantes.URL_PARTIE_MULTIPLE_MULTIJOUEUR_ERREUR, (req: Request, res: Response) => {
            this.requeteErreurMultiple(req, res);
        });

        return router;
    }

    public requeteEnvoyerJoindreMultiple(req: Request, res: Response): void {
        try {
            this.socket.envoyerJoindreMultiple(req.body.partieId, req.body.channelId);
            res.status(constantes.HTTP_CREATED).json(req.body.channelId);
        } catch (err) {
            res.status(constantes.HTTP_NOT_IMPLEMENTED).json(err);
        }
    }

    public requeteEnvoyerDiffTrouveeMultiple(req: Request, res: Response): void {
        try {
            this.socket.envoyerDiffPartieMultiple(req.body.channelId, req.body.diff, req.body.source, req.body.joueur);
            res.status(constantes.HTTP_CREATED).json(req.body.channelId);
        } catch (err) {
            res.status(constantes.HTTP_NOT_IMPLEMENTED).json(err);
        }
    }

    public requeteEnvoyerPartieMultipleTerminee(req: Request, res: Response): void {
        try {
            this.socket.envoyerPartieMultipleTerminee(req.body.channelId, req.body.joueur);
            res.status(constantes.HTTP_CREATED).json(req.body.channelId);
        } catch (err) {
            res.status(constantes.HTTP_NOT_IMPLEMENTED).json(err);
        }
    }

    public requeteErreurMultiple(req: Request, res: Response): void {
        try {
            this.socket.erreurMultiple(req.body.channelId, req.body.joueur, req.body.ev);
            res.status(constantes.HTTP_CREATED).json(req.body.channelId);
        } catch (err) {
            res.status(constantes.HTTP_NOT_IMPLEMENTED).json(err);
        }
    }
}
