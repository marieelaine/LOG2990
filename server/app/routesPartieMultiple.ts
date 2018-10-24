import { injectable, inject } from "inversify";
import { Router, Request, Response } from "express";

import { ServiceWeb } from "./serviceWeb";
import Types from "./types";
import { DBPartieMultiple } from "./partieMultiple/partie-multiple";

@injectable()
export class RoutesPartieMultiple extends ServiceWeb {

    public readonly mainRoute: string = "/partieMultiple";

    public constructor(@inject(Types.PartieMultiple)
    private partieMultiple: DBPartieMultiple = new DBPartieMultiple()) {
        super();
    }

    public get routes(): Router {
        const router: Router = Router();

        router.post("/ajouter", async (req: Request, res: Response) => {
            // tslint:disable-next-line:no-console
            console.log("allo de la route");
            await this.partieMultiple.requeteAjouterPartie(req, res);
        });

        // router.get("/getPartieSimple", async (req: Request, res: Response) => {
        //     await this.partieSimple.requeteGetListePartie(req, res);
        // });

        // router.delete("/delete/:id", async (req: Request, res: Response) => {
        //     await this.partieSimple.requeteDeletePartieSimple(req, res);
        // });

        // router.get("/:id", async (req: Request, res: Response) => {
        //     await this.partieSimple.requetePartieSimpleId(req, res);
        // });

        return router;
    }
}
