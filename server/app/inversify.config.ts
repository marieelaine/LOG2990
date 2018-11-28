import { Container } from "inversify";
import Types from "./types";
import { Server } from "./server";
import { Application } from "./app";

import { RoutesPartieMultiple } from "./partieMultiple/routes-partie-multiple/route-partie-multiple";
import { BaseDeDonnees } from "./baseDeDonnees/baseDeDonnees";
import { DBPartieMultiple } from "./partieMultiple/DB-partie-multiple/DB-partie-multiple";
import { SocketServerService } from "./socket-io.service";
import { DBPartieSimple } from "./partieSimple/DB-partie-simple/DB-partie-simple";
import { RoutesPartieSimple } from "./partieSimple/routes-partie-simples/routes-partie-simple";
import { RoutesPartieSimpleAttente } from "./partieSimple/partie-simple-attente/partie-simple-attente";
import { RoutesUser } from "./user/routes-user";
import { DBUser } from "./user/DB-user";
import { RoutesPartieMultipleAttente } from "./partieMultiple/partie-multiple-attente/partie-multiple-attente";
import { PartieMultipleMultijoueur } from "./partieMultiple/partie-multiple-multijoueur/partie-multiple-multijoueur";
import { PartieSimpleMultijoueur } from "./partieSimple/partie-simple-multijoueur/partie-simple-multijoueur";

const container: Container = new Container();

container.bind(Types.Server).to(Server);
container.bind(Types.Application).to(Application);

container.bind(Types.BaseDeDonnees).to(BaseDeDonnees);

container.bind(Types.RoutesPartieSimple).to(RoutesPartieSimple);
container.bind(Types.RoutesPartieSimpleAttente).to(RoutesPartieSimpleAttente);
container.bind(Types.RoutesPartieMultipleAttente).to(RoutesPartieMultipleAttente);
container.bind(Types.PartieSimple).to(DBPartieSimple);

container.bind(Types.RoutesPartieMultiple).to(RoutesPartieMultiple);
container.bind(Types.PartieMultiple).to(DBPartieMultiple);

container.bind(Types.PartieMultipleMultijoueur).to(PartieMultipleMultijoueur);
container.bind(Types.PartieSimpleMultijoueur).to(PartieSimpleMultijoueur);

container.bind(Types.RoutesUser).to(RoutesUser);

container.bind(Types.DBUser).to(DBUser);

container.bind(Types.SocketServerService).to(SocketServerService).inSingletonScope();

export { container };
