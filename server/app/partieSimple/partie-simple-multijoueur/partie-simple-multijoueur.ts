import { Router, Request, Response } from "express";
import * as constantes from "../../constantes";
import { inject } from "inversify";
import Types from "../../types";
import { SocketServerService } from "../../socket-io.service";
import { ServiceWeb } from "../../serviceWeb";

export class PartieSimpleMultijoueur extends ServiceWeb {

    public readonly mainRoute: string = "/partieSimple";

    public constructor(@inject(Types.SocketServerService) private socket: SocketServerService) {
        super();
    }

    public get routes(): Router {
        const router: Router = Router();

        router.post(constantes.URL_PARTIE_SIMPLE_MULTIJOUEUR_DIFF_TROUVEE, (req: Request, res: Response) => {
            this.requeteEnvoyerDiffTrouveeSimple(req, res);
        });

        router.post(constantes.URL_PARTIE_SIMPLE_MULTIJOUEUR_JOINDRE, (req: Request, res: Response) => {
            this.requeteEnvoyerJoindreSimple(req, res);
        });

        router.post(constantes.URL_PARTIE_SIMPLE_MULTIJOUEUR_PARTIE_TERMINEE, (req: Request, res: Response) => {
            this.requeteEnvoyerPartieSimpleTerminee(req, res);
        });

        router.post(constantes.URL_PARTIE_SIMPLE_MULTIJOUEUR_ERREUR, (req: Request, res: Response) => {
            this.requeteErreurSimple(req, res);
        });

        return router;
    }

    private requeteEnvoyerDiffTrouveeSimple(req: Request, res: Response): void {
        try {
            this.socket.envoyerDiffPartieSimple(req.body.channelId, req.body.diff, req.body.joueur);
            res.status(constantes.HTTP_CREATED).json(req.body.channelId);
        } catch (err) {
            res.status(constantes.HTTP_NOT_IMPLEMENTED).json(err);
        }
    }

    private requeteEnvoyerJoindreSimple(req: Request, res: Response): void {
        try {
            this.socket.envoyerJoindreSimple(req.body.partieId, req.body.channelId);
            res.status(constantes.HTTP_CREATED).json(req.body.channelId);
        } catch (err) {
            res.status(constantes.HTTP_NOT_IMPLEMENTED).json(err);
        }
    }

    private requeteEnvoyerPartieSimpleTerminee(req: Request, res: Response): void {
        try {
            this.socket.envoyerPartieSimpleTerminee(req.body.channelId, req.body.joueur);
            res.status(constantes.HTTP_CREATED).json(req.body.channelId);
        } catch (err) {
            res.status(constantes.HTTP_NOT_IMPLEMENTED).json(err);
        }
    }

    private requeteErreurSimple(req: Request, res: Response): void {
        try {
            this.socket.erreurSimple(req.body.channelId, req.body.joueur, req.body.ev);
            res.status(constantes.HTTP_CREATED).json(req.body.channelId);
        } catch (err) {
            res.status(constantes.HTTP_NOT_IMPLEMENTED).json(err);
        }
    }
}
