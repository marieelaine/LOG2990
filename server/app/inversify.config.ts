import { Container } from "inversify";
import Types from "./types";
import { Server } from "./server";
import { Application } from "./app";
import { Route } from "./routes/index";
import { Routes } from "./routes";

import { RoutesUser } from "./routesUser";
import { RouteUser } from "./routesUser/user";

import { RoutesPartieSimple } from "./routesPartieSimple";
import { RoutePartieSimple } from "./routesPartieSimple/partie-simple";
import { BaseDeDonnees } from "./baseDeDonnees/baseDeDonnees";

const container: Container = new Container();

container.bind(Types.Server).to(Server);
container.bind(Types.Application).to(Application);

container.bind(Types.Routes).to(Routes);
container.bind(Types.Index).to(Route.Index);

container.bind(Types.BaseDeDonnees).to(BaseDeDonnees);

container.bind(Types.RoutesUser).to(RoutesUser);
container.bind(Types.User).to(RouteUser.User);

container.bind(Types.RoutesPartieSimple).to(RoutesPartieSimple);
container.bind(Types.PartieSimple).to(RoutePartieSimple);

export { container };
