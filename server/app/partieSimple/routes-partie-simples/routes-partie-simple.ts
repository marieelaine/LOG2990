import { injectable, inject } from "inversify";
import { Router, Request, Response } from "express";
import { ServiceWeb } from "../../serviceWeb";
import Types from "../../types";
import { DBPartieSimple } from "../DB-partie-simple/DB-partie-simple";
import * as constantes from "../../constantes";

@injectable()
export class RoutesPartieSimple extends ServiceWeb {

    public readonly mainRoute: string = constantes.ROUTE_PARTIE_SIMPLE;

    public constructor(@inject(Types.PartieSimple) private partieSimple: DBPartieSimple) {
        super();
    }

    public get routes(): Router {
        const router: Router = Router();

        router.post(constantes.ROUTE_PARTIE_SIMPLE_AJOUTER, async (req: Request, res: Response) => {
            await this.partieSimple.requeteAjouterPartie(req, res);
        });

        router.put(constantes.ROUTE_PARTIE_SIMPLE_ADD_TEMPS, async (req: Request, res: Response) => {
            await this.partieSimple.requeteAjouterPartieTemps(req, res);
        });

        router.get(constantes.ROUTE_PARTIE_SIMPLE_GET_LISTE, async (req: Request, res: Response) => {
            await this.partieSimple.requeteGetListePartie(req, res);
        });

        router.put(constantes.ROUTE_PARTIE_SIMPLE_REINITIALISE, async (req: Request, res: Response) => {
            await this.partieSimple.requeteReinitialiserTemps(req, res);
        });

        router.delete(constantes.ROUTE_PARTIE_SIMPLE_DELETE, async (req: Request, res: Response) => {
            await this.partieSimple.requeteDeletePartie(req, res);
        });

        router.get(constantes.ROUTE_PARTIE_SIMPLE_GET_BY_ID, async (req: Request, res: Response) => {
            await this.partieSimple.requeteGetPartie(req, res);
        });

        router.get(constantes.ROUTE_PARTIE_SIMPLE_GET_CHANNEL, (req: Request, res: Response) => {
            this.partieSimple.requeteGetChannelId(req, res);
        });

        router.post(constantes.ROUTE_PARTIE_SIMPLE_SUPPRIMER_CHANNEL, (req: Request, res: Response) => {
            this.partieSimple.requeteSupprimerChannelId(req, res);
        });

        router.post(constantes.ROUTE_PARTIE_SIMPLE_IMAGE_CHARGEES, (req: Request, res: Response) => {
            this.partieSimple.requetePartieChargee(req, res);
        });

        return router;
    }
}
