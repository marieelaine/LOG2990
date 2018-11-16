import { injectable, inject } from "inversify";
import { ServiceWeb } from "../../serviceWeb";
import { Router, Request, Response } from "express";
import Types from "../../types";
import { SocketServerService } from "../../socket-io.service";

@injectable()
export class RoutesPartieMultipleAttente extends ServiceWeb {

    private partieMultipleAttente: string[];
    public readonly mainRoute: string = "/";

    public constructor(@inject(Types.SocketServerService) private socket: SocketServerService) {
        super();
        this.partieMultipleAttente = [];
    }

    public get routes(): Router {
        const router: Router = Router();

        router.get("/getPartieMultipleEnAttente", async (req: Request, res: Response) => {
            res.send(this.partieMultipleAttente);
        });

        router.post("/addPartieMultipleEnAttente", async (req: Request, res: Response) => {
            this.partieMultipleAttente.push(req.body.partieId);
            this.socket.envoyerPartieMultipleAttente(req.body.partieId);
            res.send(req.body.partieId);
        });

        router.delete("/deletePartieMultipleEnAttente/:id", async (req: Request, res: Response) => {
            for (let i: number = 0 ; i < this.partieMultipleAttente.length ; i++) {
                if (this.partieMultipleAttente[i] === req.params.id) {
                    this.partieMultipleAttente.splice(i, 1);
                }
            }
            this.socket.supprimerPartieMultipleAttente(req.params.id);
            res.send(req.params.id);
        });

        return router;
    }
}
