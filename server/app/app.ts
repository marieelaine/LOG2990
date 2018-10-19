import * as express from "express";
import * as path from "path";
import * as logger from "morgan";
import * as cookieParser from "cookie-parser";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import Types from "./types";
import { injectable, inject } from "inversify";

import { ServiceWeb } from "./serviceWeb";
import { Routes } from "./routes";
import { RoutesBaseDeDonnees } from "./routesBaseDeDonnees";
import { RoutesUser } from "./routesUser";
import { RoutesPartieSimple } from "./routesPartieSimple";

@injectable()
export class Application {

    private readonly internalError: number = 500;
    public app: express.Application;

    public constructor(@inject(Types.Routes) private index: Routes,
                       @inject(Types.RoutesUser) private user: RoutesUser,
                       @inject(Types.RoutesPartieSimple) private partieSimple: RoutesPartieSimple,
                       @inject(Types.RoutesBaseDeDonnees) private baseDonnees: RoutesBaseDeDonnees) {
        this.app = express();

        this.config();

        this.routes();
    }

    private config(): void {
        // Middlewares configuration
        this.app.use(logger("dev"));
        this.app.use(bodyParser.json({limit: "100mb"}));
        this.app.use(bodyParser.urlencoded({extended: true,
                                            limit: "100mb"}));
        this.app.use(cookieParser());
        this.app.use(express.static(path.join(__dirname, "../client")));
        this.app.use(cors());
    }

    public routes(): void {
        this.ajouterService(this.index);
        this.ajouterService(this.baseDonnees);
        this.ajouterService(this.user);
        this.ajouterService(this.partieSimple);

        this.errorHandeling();
    }

    private ajouterService(service: ServiceWeb): void {
        this.app.use(service.mainRoute, service.routes);
    }

    private errorHandeling(): void {
        // Gestion des erreurs
        this.app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
            const err: Error = new Error("Not Found");
            next(err);
        });

        // development error handler
        // will print stacktrace
        if (this.app.get("env") === "development") {
            // tslint:disable-next-line:no-any
            this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
                res.status(err.status || this.internalError);
                res.send({
                    message: err.message,
                    error: err
                });
            });
        }

        // production error handler
        // no stacktraces leaked to user (in production env only)
        // tslint:disable-next-line:no-any
        this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
            res.status(err.status || this.internalError);
            res.send({
                message: err.message,
                error: {}
            });
        });
    }
}
