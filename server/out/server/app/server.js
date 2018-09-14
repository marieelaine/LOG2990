"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const http = require("http");
const types_1 = require("./types");
const inversify_1 = require("inversify");
let Server = class Server {
    constructor(application) {
        this.application = application;
        this.appPort = this.normalizePort(process.env.PORT || "3000");
        this.baseDix = 10;
    }
    init() {
        this.application.app.set("port", this.appPort);
        this.server = http.createServer(this.application.app);
        this.server.listen(this.appPort);
        this.server.on("error", (error) => this.onError(error));
        this.server.on("listening", () => this.onListening());
    }
    normalizePort(val) {
        const port = (typeof val === "string") ? parseInt(val, this.baseDix) : val;
        if (isNaN(port)) {
            return val;
        }
        else if (port >= 0) {
            return port;
        }
        else {
            return false;
        }
    }
    onError(error) {
        if (error.syscall !== "listen") {
            throw error;
        }
        const bind = (typeof this.appPort === "string") ? "Pipe " + this.appPort : "Port " + this.appPort;
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
    onListening() {
        const addr = this.server.address();
        const bind = (typeof addr === "string") ? `pipe ${addr}` : `port ${addr.port}`;
        // tslint:disable-next-line:no-console
        console.log(`Listening on ${bind}`);
    }
};
Server = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.default.Application)),
    __metadata("design:paramtypes", [app_1.Application])
], Server);
exports.Server = Server;
//# sourceMappingURL=server.js.map