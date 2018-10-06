import { injectable, inject } from "inversify";
import { Router, Request, Response } from "express";

import { ServiceWeb } from "./serviceWeb";
import Types from "./types";
import { RoutePartieSimple } from "./routesPartieSimple/partie-simple";

@injectable()
export class RoutesPartieSimple extends ServiceWeb {

    public readonly mainRoute: string = "/images";

    public constructor(@inject(Types.PartieSimple)
    private partieSimple: RoutePartieSimple.PartieSimple = new RoutePartieSimple.PartieSimple()) {
        super();
    }

    public get routes(): Router {
        const router: Router = Router();

        router.get("/:id", async (req: Request, res: Response) => {
            await this.partieSimple.requetePartieSimpleId(req, res);
        });

        router.post("/ajouter", async (req: Request, res: Response) => {
            await this.partieSimple.requeteAjouterPartieSimple(req, res);
        });

        router.delete("/delete/:id", async (req: Request, res: Response) => {
            await this.partieSimple.requeteDeletePartieSimple(req, res);
        });

        return router;
    }
}
