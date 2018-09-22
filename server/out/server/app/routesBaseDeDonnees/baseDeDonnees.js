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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
require("reflect-metadata");
const mongoose_1 = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const user_1 = require("../../../client/src/app/vue-initiale/login-form/user");
var RouteBaseDeDonnees;
(function (RouteBaseDeDonnees) {
    let BaseDeDonnees = class BaseDeDonnees {
        constructor() {
            this.mongoURL = "mongodb://admin:admin1@ds239692.mlab.com:39692/log2990-05";
            this.mongoose = new mongoose_1.Mongoose();
            this.schema = new mongoose_1.Schema({
                username: {
                    type: String,
                    required: true,
                    unique: true
                }
            });
            this.schema.plugin(uniqueValidator);
            this.modelUser = this.mongoose.model("users", this.schema);
            this.seConnecter();
        }
        seConnecter() {
            return __awaiter(this, void 0, void 0, function* () {
                yield this.mongoose.connect(this.mongoURL);
            });
        }
        ajouterUser(usagerJson, res) {
            return __awaiter(this, void 0, void 0, function* () {
                const usager = new this.modelUser(usagerJson);
                try {
                    yield usager.save();
                    return res.status(201).json(usager);
                }
                catch (err) {
                    return res.status(501).json(err);
                }
            });
        }
        obtenirUserId(identifiant) {
            return __awaiter(this, void 0, void 0, function* () {
                let usager = new user_1.User();
                yield this.modelUser.findById(identifiant)
                    .then((res) => { usager = res.toObject(); })
                    .catch(() => { });
                return usager;
            });
        }
        requeteAjouterUser(req, res) {
            return __awaiter(this, void 0, void 0, function* () {
                res.send(yield this.ajouterUser(req.body, res));
            });
        }
        requeteUserId(req, res) {
            return __awaiter(this, void 0, void 0, function* () {
                res.send(yield this.obtenirUserId(req.params.id));
            });
        }
    };
    BaseDeDonnees = __decorate([
        inversify_1.injectable(),
        __metadata("design:paramtypes", [])
    ], BaseDeDonnees);
    RouteBaseDeDonnees.BaseDeDonnees = BaseDeDonnees;
})(RouteBaseDeDonnees = exports.RouteBaseDeDonnees || (exports.RouteBaseDeDonnees = {}));
//# sourceMappingURL=baseDeDonnees.js.map