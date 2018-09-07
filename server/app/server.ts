import { Application } from "./app";
import * as http from "http";
import Types from "./types";
import { injectable, inject } from "inversify";
import { AddressInfo } from "net";

import * as express from "express";
import {Mongoose} from "mongoose";
// import * as bodyParser from "body-parser"

@injectable()
export class Server {

    private readonly appPort: string|number|boolean = this.normalizePort(process.env.PORT || "3000");
    private readonly baseDix: number = 10;
    private server: http.Server;

    public constructor(@inject(Types.Application) private application: Application) { }

    public init(): void {
        this.application.app.set("port", this.appPort);
        this.server = http.createServer(this.application.app);

        this.server.listen(this.appPort);
        this.server.on("error", (error: NodeJS.ErrnoException) => this.onError(error));
        this.server.on("listening", () => this.onListening());
    }

    private normalizePort(val: number | string): number | string | boolean {
        // tslint:disable-next-line:no-shadowed-variable
        const port: number = (typeof val === "string") ? parseInt(val, this.baseDix) : val;
        if (isNaN(port)) {
            return val;
        } else if (port >= 0) {
            return port;
        } else {
            return false;
        }
    }

    private onError(error: NodeJS.ErrnoException): void {
        if (error.syscall !== "listen") { throw error; }
        const bind: string = (typeof this.appPort === "string") ? "Pipe " + this.appPort : "Port " + this.appPort;
        switch (error.code) {
            case "EACCES":
                console.error(`${bind} requires elevated privileges`);
                process.exit(1);
                break;
            case "EADDRINUSE":
                console.error(`${bind} is already in use`);
                process.exit(1);
                break;
            default:
                throw error;
        }
    }

    /**
     * Se produit lorsque le serveur se met à écouter sur le port.
     */
    private  onListening(): void {
        const addr: string | AddressInfo = this.server.address();
        const bind: string = (typeof addr === "string") ? `pipe ${addr}` : `port ${addr.port}`;
        // tslint:disable-next-line:no-console
        console.log(`Listening on ${bind}`);
    }
}

// Create a new express application instance
const app: express.Application = express();
const router: express.Router = express.Router();

// Create var of Mongoose type
const mongoose: Mongoose = new Mongoose();

// Connect to mongoDB database
const mongoURL: string = "mongodb://adminlog2990:admin1@ds233212.mlab.com:33212/log";
mongoose.connect(mongoURL);

// Routing
// tslint:disable-next-line:typedef
router.get("/", (request, response) => {
    // tslint:disable-next-line:no-magic-numbers
    response.status(200).send({message: "Hello World!"});
});
// Set app to use express backend router
app.use(router);

// Configure port
const port: number = 8080;
// Listen to port
app.listen(port);
