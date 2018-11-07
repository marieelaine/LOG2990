import { injectable, inject } from "inversify";
import { Router, Request, Response } from "express";
import { ServiceWeb } from "../../serviceWeb";
import Types from "../../types";
import { DBPartieMultiple } from "../DB-partie-multiple/DB-partie-multiple";

@injectable()
export class RoutesPartieMultiple extends ServiceWeb {

    public readonly mainRoute: string = "/partieMultiple";

    public constructor(@inject(Types.PartieMultiple) private partieMultiple: DBPartieMultiple) {
        super();
    }

    public get routes(): Router {
        const router: Router = Router();

        router.post("/ajouter", async (req: Request, res: Response) => {
            await this.partieMultiple.requeteAjouterPartie(req, res);
        });

        router.get("/getListePartieMultiple", async (req: Request, res: Response) => {
            await this.partieMultiple.requeteGetListePartie(req, res);
        });

        router.put("/reinitialiseTemps/:id", async (req: Request, res: Response) => {
            await this.partieMultiple.requeteReinitialiserTemps(req, res);
        });

        router.delete("/delete/:id", async (req: Request, res: Response) => {
            await this.partieMultiple.requeteDeletePartie(req, res);
        });

        router.get("/:id", async (req: Request, res: Response) => {
            await this.partieMultiple.requetePartieMultipleId(req, res);
        });

        router.get("/getPartieMultiple/:id", async (req: Request, res: Response) => {
            await this.partieMultiple.requeteGetPartieMultiple(req, res);
        });

        return router;
    }
}
