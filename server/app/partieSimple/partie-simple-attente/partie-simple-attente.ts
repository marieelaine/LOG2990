import { injectable, inject } from "inversify";
import { ServiceWeb } from "../../serviceWeb";
import { Router, Request, Response } from "express";

@injectable()
export class RoutesPartieSimple extends ServiceWeb {

    public readonly mainRoute: string = "";
    private partieSimpleAttente: Array<string>;

    public constructor() {
        super();
        this.partieSimpleAttente = [];
    }

    public get routes(): Router {
        const router: Router = Router();

        router.get("/getPartieSimpleEnAttente", async (req: Request, res: Response) => {
            res.send(this.partieSimpleAttente);
        });

        router.post("/addPartieSimpleEnAttente", async (req: Request, res: Response) => {
            this.partieSimpleAttente.push(req.body);
        });

        router.delete("/deletePartieSimpleEnAttente", async (req: Request, res: Response) => {
            for (let i: number = 0 ; i < this.partieSimpleAttente.length ; i++) {
                if (this.partieSimpleAttente[i] === req.body) {
                    this.partieSimpleAttente.splice(i, 1);
                }
            }
        });

        return router;
    }
}
