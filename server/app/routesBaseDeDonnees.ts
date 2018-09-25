import { injectable, inject } from "inversify";
import { Router, Request, Response } from "express";

import { ServiceWeb } from "./serviceWeb";
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
            await this.baseDeDonnees.requeteUserId(req, res);
        });

        router.post("/ajouter", async (req: Request, res: Response) => {
            await this.baseDeDonnees.requeteAjouterUser(req, res);
        });

        router.delete("/delete", async (req: Request, res: Response) => {
            await this.baseDeDonnees.requeteDeleteUser(req, res);
        });

        return router;
    }
}
