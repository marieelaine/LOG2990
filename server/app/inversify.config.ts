import { Container } from "inversify";
import Types from "./types";
import { Server } from "./server";
import { Application } from "./app";
import { Route } from "./routes/index";
import { Routes } from "./routes";

import { RoutesUser } from "./routesUser";
import { DBUser } from "./User/user";

import { RoutesPartieSimple } from "./routesPartieSimple";
import { RoutesPartieMultiple } from "./routesPartieMultiple";
import { BaseDeDonnees } from "./baseDeDonnees/baseDeDonnees";
import { DBPartieSimple } from "./partieSimple/partie-simple";
import { DBPartieMultiple } from "./partieMultiple/partie-multiple";
import { SocketServerService } from "./socket-io.service";

const container: Container = new Container();

container.bind(Types.Server).to(Server);
container.bind(Types.Application).to(Application);

container.bind(Types.Routes).to(Routes);
container.bind(Types.Index).to(Route.Index);

container.bind(Types.BaseDeDonnees).to(BaseDeDonnees);

container.bind(Types.RoutesUser).to(RoutesUser);
container.bind(Types.User).to(DBUser.User);

container.bind(Types.RoutesPartieSimple).to(RoutesPartieSimple);
container.bind(Types.PartieSimple).to(DBPartieSimple);

container.bind(Types.RoutesPartieMultiple).to(RoutesPartieMultiple);
container.bind(Types.PartieMultiple).to(DBPartieMultiple);

container.bind(Types.SocketServerService).to(SocketServerService).inSingletonScope();

export { container };
