import { injectable, inject } from "inversify";
import { Router, Request, Response } from "express";

import { ServiceWeb } from "./serviceWeb";
import Types from "./types";
import { RouteImage } from "./routesImage/image";

@injectable()
export class RoutesImage extends ServiceWeb {

    public readonly mainRoute: string = "/images";

    public constructor(@inject(Types.Image) private image: RouteImage.Image = new RouteImage.Image()) {
        super();
    }

    public get routes(): Router {
        const router: Router = Router();

        router.get("/:id", async (req: Request, res: Response) => {
            await this.image.requeteImageId(req, res);
        });

        router.post("/ajouter", async (req: Request, res: Response) => {
            await this.image.requeteAjouterImage(req, res);
        });

        router.delete("/delete/:id", async (req: Request, res: Response) => {
            await this.image.requeteDeleteImage(req, res);
        });

        return router;
    }
}
