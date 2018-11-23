import * as express from "express";
import * as path from "path";
import * as logger from "morgan";
import * as cookieParser from "cookie-parser";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import Types from "./types";
import { injectable, inject } from "inversify";

import { ServiceWeb } from "./serviceWeb";
import { RoutesPartieMultiple } from "./partieMultiple/routes-partie-multiple/route-partie-multiple";
import { RoutesPartieSimple } from "./partieSimple/routes-partie-simples/routes-partie-simple";
import { RoutesPartieSimpleAttente } from "./partieSimple/partie-simple-attente/partie-simple-attente";
import { RoutesUser } from "./user/routes-user";
import { RoutesPartieMultipleAttente } from "./partieMultiple/partie-multiple-attente/partie-multiple-attente";
import { PartieSimpleMultijoueur } from "./partieSimple/partie-simple-multijoueur/partie-simple-multijoueur";
import { PartieMultipleMultijoueur } from "./partieMultiple/partie-multiple-multijoueur/partie-multiple-multijoueur";

@injectable()
export class Application {

    private readonly internalError: number = 500;
    public app: express.Application;

    public constructor(@inject(Types.RoutesPartieSimple) private partieSimple: RoutesPartieSimple,
                       @inject(Types.RoutesPartieMultiple) private partieMultiple: RoutesPartieMultiple,
                       @inject(Types.RoutesPartieSimpleAttente) private partieSimpleAttente: RoutesPartieSimpleAttente,
                       @inject(Types.RoutesPartieMultipleAttente) private partieMultipleAttente: RoutesPartieMultipleAttente,
                       @inject(Types.PartieSimpleMultijoueur) private partieSimpleMultijoueur: PartieSimpleMultijoueur,
                       @inject(Types.PartieMultipleMultijoueur) private partieMultipleMultijoueur: PartieMultipleMultijoueur,
                       @inject(Types.RoutesUser) private routeDbUser: RoutesUser) {
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
        this.ajouterService(this.partieSimple);
        this.ajouterService(this.partieMultiple);
        this.ajouterService(this.partieSimpleAttente);
        this.ajouterService(this.partieMultipleAttente);
        this.ajouterService(this.partieSimpleMultijoueur);
        this.ajouterService(this.partieMultipleMultijoueur);
        this.ajouterService(this.routeDbUser);

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
