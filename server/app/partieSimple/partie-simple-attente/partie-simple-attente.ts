import { injectable, inject } from "inversify";
import { ServiceWeb } from "../../serviceWeb";
import { Router, Request, Response } from "express";
import Types from "../../types";
import { SocketServerService } from "../../socket-io.service";

@injectable()
export class RoutesPartieSimpleAttente extends ServiceWeb {

    private partieSimpleAttente: string[];
    public readonly mainRoute: string = "/";

    public constructor(@inject(Types.SocketServerService) private socket: SocketServerService) {
        super();
        this.partieSimpleAttente = [];
    }

    public get routes(): Router {
        const router: Router = Router();

        router.get("/getPartieSimpleEnAttente", async (req: Request, res: Response) => {
            res.send(this.partieSimpleAttente);
        });

        router.post("/addPartieSimpleEnAttente", async (req: Request, res: Response) => {
            this.partieSimpleAttente.push(req.body.partieId);
            this.socket.envoyerPartieSimpleAttente(req.body.partieId);
            res.send();
        });

        router.delete("/deletePartieSimpleEnAttente/:id", async (req: Request, res: Response) => {
            for (let i: number = 0 ; i < this.partieSimpleAttente.length ; i++) {
                if (this.partieSimpleAttente[i] === req.params.id) {
                    this.partieSimpleAttente.splice(i, 1);
                }
            }
            this.socket.supprimerPartieSimpleAttente(req.params.id);
            res.send();
        });

        return router;
    }
}
