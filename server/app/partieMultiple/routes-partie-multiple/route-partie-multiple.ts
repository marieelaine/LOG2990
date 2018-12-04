import { injectable, inject } from "inversify";
import { Router, Request, Response } from "express";
import { ServiceWeb } from "../../serviceWeb";
import Types from "../../types";
import { DBPartieMultiple } from "../DB-partie-multiple/DB-partie-multiple";
import * as constantes from "../../constantes";

@injectable()
export class RoutesPartieMultiple extends ServiceWeb {

    public readonly mainRoute: string = constantes.ROUTE_PARTIE_MULTIPLE;

    public constructor(@inject(Types.PartieMultiple) private partieMultiple: DBPartieMultiple) {
        super();
    }

    public get routes(): Router {
        const router: Router = Router();

        router.post(constantes.ROUTE_PARTIE_MULTIPLE_AJOUTER, async (req: Request, res: Response) => {
            await this.partieMultiple.requeteAjouterPartie(req, res);
        });

        router.put(constantes.ROUTE_PARTIE_MULTIPLE_ADD_TEMPS, async (req: Request, res: Response) => {
            await this.partieMultiple.requeteAjouterPartieTemps(req, res);
        });

        router.get(constantes.ROUTE_PARTIE_MULTIPLE_GET_LISTE, async (req: Request, res: Response) => {
            await this.partieMultiple.requeteGetListePartie(req, res);
        });

        router.put(constantes.ROUTE_PARTIE_MULTIPLE_REINITIALISE, async (req: Request, res: Response) => {
            await this.partieMultiple.requeteReinitialiserTemps(req, res);
        });

        router.delete(constantes.ROUTE_PARTIE_MULTIPLE_DELETE, async (req: Request, res: Response) => {
            await this.partieMultiple.requeteDeletePartie(req, res);
        });

        router.get(constantes.ROUTE_PARTIE_MULTIPLE_GET_BY_ID, async (req: Request, res: Response) => {
            await this.partieMultiple.requeteGetPartie(req, res);
        });

        router.get(constantes.ROUTE_PARTIE_MULTIPLE__GET_CHANNEL, (req: Request, res: Response) => {
            this.partieMultiple.requeteGetChannelId(req, res);
        });

        router.post(constantes.ROUTE_PARTIE_MULTIPLE_SUPPRIMER_CHANNEL, (req: Request, res: Response) => {
            this.partieMultiple.requeteSupprimerChannelId(req, res);
        });

        router.post(constantes.ROUTE_PARTIE_MULTIPLE_IMAGE_CHARGEES, (req: Request, res: Response) => {
            this.partieMultiple.requetePartieChargee(req, res);
        });

        return router;
    }
}
