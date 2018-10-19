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
const express = require("express");
const path = require("path");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const types_1 = require("./types");
const inversify_1 = require("inversify");
const routes_1 = require("./routes");
const routesBaseDeDonnees_1 = require("./routesBaseDeDonnees");
const routesUser_1 = require("./routesUser");
const routesPartieSimple_1 = require("./routesPartieSimple");
let Application = class Application {
    constructor(index, user, partieSimple, baseDonnees) {
        this.index = index;
        this.user = user;
        this.partieSimple = partieSimple;
        this.baseDonnees = baseDonnees;
        this.internalError = 500;
        this.app = express();
        this.config();
        this.routes();
    }
    config() {
        // Middlewares configuration
        this.app.use(logger("dev"));
        this.app.use(bodyParser.json({ limit: "100mb" }));
        this.app.use(bodyParser.urlencoded({ extended: true,
            limit: "100mb" }));
        this.app.use(cookieParser());
        this.app.use(express.static(path.join(__dirname, "../client")));
        this.app.use(cors());
    }
    routes() {
        this.ajouterService(this.index);
        this.ajouterService(this.baseDonnees);
        this.ajouterService(this.user);
        this.ajouterService(this.partieSimple);
        this.errorHandeling();
    }
    ajouterService(service) {
        this.app.use(service.mainRoute, service.routes);
    }
    errorHandeling() {
        // Gestion des erreurs
        this.app.use((req, res, next) => {
            const err = new Error("Not Found");
            next(err);
        });
        // development error handler
        // will print stacktrace
        if (this.app.get("env") === "development") {
            // tslint:disable-next-line:no-any
            this.app.use((err, req, res, next) => {
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
        this.app.use((err, req, res, next) => {
            res.status(err.status || this.internalError);
            res.send({
                message: err.message,
                error: {}
            });
        });
    }
};
Application = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.default.Routes)),
    __param(1, inversify_1.inject(types_1.default.RoutesUser)),
    __param(2, inversify_1.inject(types_1.default.RoutesPartieSimple)),
    __param(3, inversify_1.inject(types_1.default.RoutesBaseDeDonnees)),
    __metadata("design:paramtypes", [routes_1.Routes,
        routesUser_1.RoutesUser,
        routesPartieSimple_1.RoutesPartieSimple,
        routesBaseDeDonnees_1.RoutesBaseDeDonnees])
], Application);
exports.Application = Application;
//# sourceMappingURL=app.js.map