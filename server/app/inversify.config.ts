import { Container } from "inversify";
import Types from "./types";
import { Server } from "./server";
import { Application } from "./app";
import { Route } from "./routes/index";
import { Routes } from "./routes";

import { RoutesBaseDeDonnees } from "./routesBaseDeDonnees";
import { RouteBaseDeDonnees } from "./routesBaseDeDonnees/baseDeDonnees";

const container: Container = new Container();

container.bind(Types.Server).to(Server);
container.bind(Types.Application).to(Application);

container.bind(Types.Routes).to(Routes);
container.bind(Types.Index).to(Route.Index);

container.bind(Types.RoutesBaseDeDonnees).to(RoutesBaseDeDonnees);
container.bind(Types.BaseDeDonnees).to(RouteBaseDeDonnees.BaseDeDonnees);

export { container };
