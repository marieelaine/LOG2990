import { injectable, inject } from "inversify";
import { Router, Request, Response } from "express";
import { ServiceWeb } from "../../serviceWeb";
import Types from "../../types";
import { DBPartieSimple } from "../DB-partie-simple/DB-partie-simple";

@injectable()
export class RoutesPartieSimple extends ServiceWeb {

    public readonly mainRoute: string = "/partieSimple";

    public constructor(@inject(Types.PartieSimple) private partieSimple: DBPartieSimple) {
        super();
    }

    public get routes(): Router {
        const router: Router = Router();

        router.post("/ajouter", async (req: Request, res: Response) => {
            await this.partieSimple.requeteAjouterPartie(req, res);
        });

        router.put("/addTempsPartieSimple/:id", async (req: Request, res: Response) => {
            await this.partieSimple.requeteAjouterPartieTemps(req, res);
        });

        router.get("/getListePartieSimple", async (req: Request, res: Response) => {
            await this.partieSimple.requeteGetListePartie(req, res);
        });

        router.put("/reinitialiseTemps/:id", async (req: Request, res: Response) => {
            await this.partieSimple.requeteReinitialiserTemps(req, res);
        });

        router.delete("/delete/:id", async (req: Request, res: Response) => {
            await this.partieSimple.requeteDeletePartie(req, res);
        });

        // router.get("/:id", async (req: Request, res: Response) => {
        //     await this.partieSimple.requetePartieId(req, res);
        // });

        router.get("/getPartieSimple/:id", async (req: Request, res: Response) => {
            await this.partieSimple.requeteGetPartie(req, res);
        });

        router.get("/getChannelIdSimple", (req: Request, res: Response) => {
            this.partieSimple.requeteGetChannelId(req, res);
        });

        router.post("/addChannelMultijoueurSimple", (req: Request, res: Response) => {
            this.partieSimple.requeteAjouterChannelMultijoueur(req, res);
        });

        return router;
    }
}
