import { injectable, inject } from "inversify";
import { Router, Request, Response, NextFunction } from "express";

import { ServiceWeb } from "./serviceweb";
import Types from "./types";
import { RouteBaseDeDonnees } from "./routesBaseDeDonnees/baseDeDonnees";

@injectable()
export class RoutesBaseDeDonnees extends ServiceWeb {

    public readonly mainRoute: string = "/users";

    public constructor(@inject(Types.BaseDeDonnees) private baseDeDonnees: RouteBaseDeDonnees.BaseDeDonnees) {
        super();
    }

    public get routes(): Router {
        const router: Router = Router();

        router.get("/:id", async (req: Request, res: Response) => {
            await this.baseDeDonnees.requeteUser(req, res);
        });

        router.post("/ajouter", async (req: Request, res: Response) => {
            await this.baseDeDonnees.requeteAjouterUser(req, res);
        });

        return router;
    }
}
