import { injectable } from "inversify";
import { Router } from "express";

import { ServiceWeb } from "./serviceWeb";

@injectable()
export class RoutesBaseDeDonnees extends ServiceWeb {

    public readonly mainRoute: string = "/users";

    public constructor() {
        super();
    }

    public get routes(): Router {
        return Router();
    }
}
