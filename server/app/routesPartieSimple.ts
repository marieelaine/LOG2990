import { injectable, inject } from "inversify";
import { Router, Request, Response } from "express";

import { ServiceWeb } from "./serviceWeb";
import Types from "./types";
import { DBPartieSimple } from "./partieSimple/partie-simple";

@injectable()
export class RoutesPartieSimple extends ServiceWeb {

    public readonly mainRoute: string = "/partieSimple";

    public constructor(@inject(Types.PartieSimple)
    private partieSimple: DBPartieSimple = new DBPartieSimple()) {
        super();
    }

    public get routes(): Router {
        const router: Router = Router();

        router.post("/ajouter", async (req: Request, res: Response) => {
            await this.partieSimple.requeteAjouterPartieSimple(req, res);
        });

        router.get("/getPartieSimple", async (req: Request, res: Response) => {
            await this.partieSimple.requeteGetListePartie(req, res);
        });

        router.get("/reinitialiseTemps/:id", async (req: Request, res: Response) => {
            await this.partieSimple.requeteGetListePartie(req, res);
        });

        router.delete("/delete/:id", async (req: Request, res: Response) => {
            await this.partieSimple.requeteDeletePartieSimple(req, res);
        });

        router.get("/:id", async (req: Request, res: Response) => {
            await this.partieSimple.requetePartieSimpleId(req, res);
        });

        return router;
    }
}
