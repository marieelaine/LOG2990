import { injectable, inject } from "inversify";
import { Router, Request, Response } from "express";

import { ServiceWeb } from "../serviceWeb";
import Types from "../types";
import { DBUser } from "./DB-user";

@injectable()
export class RoutesUser extends ServiceWeb {

    public readonly mainRoute: string = "/users";

    public constructor(@inject(Types.DBUser) private user: DBUser) {
        super();
    }

    public get routes(): Router {
        const router: Router = Router();

        router.post("/ajouter", async (req: Request, res: Response) => {
            await this.user.requeteAjouterUser(req, res);
        });

        router.delete("/delete/:id", async (req: Request, res: Response) => {
            await this.user.requeteSupprimerUser(req, res);
        });

        router.get("/:id", async (req: Request, res: Response) => {
            await this.user.requeteUserId(req, res);
        });

        return router;
    }
}
