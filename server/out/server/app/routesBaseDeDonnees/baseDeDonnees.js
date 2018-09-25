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
var RouteBaseDeDonnees;
(function (RouteBaseDeDonnees) {
    let BaseDeDonnees = class BaseDeDonnees {
        constructor() {
            this.mongoURL = "mongodb://admin:admin1@ds239692.mlab.com:39692/log2990-05";
            this.mongoose = new mongoose_1.Mongoose();
            this.mongoose.set("useCreateIndex", true);
            this.schema = new mongoose_1.Schema({
                // _id : String,
                _username: {
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
                yield this.mongoose.connect(this.mongoURL, { useNewUrlParser: true });
            });
        }
        ajouterUser(user, res) {
            return __awaiter(this, void 0, void 0, function* () {
                const usager = new this.modelUser(user);
                // tslint:disable-next-line:no-console
                console.log(usager);
                try {
                    yield usager.save();
                    // tslint:disable-next-line:no-magic-numbers
                    return res.status(201).json(usager);
                }
                catch (err) {
                    // tslint:disable-next-line:no-magic-numbers
                    return res.status(501).json(err);
                }
            });
        }
        deleteUser(username, res) {
            return __awaiter(this, void 0, void 0, function* () {
                // const userId: String = this.obtenirUserId(username)["id"];
                // try {
                //     await this.modelUser.findByIdAndDelete(userId);
                //     // tslint:disable-next-line:no-magic-numbers
                //     return res.status(201).json();
                // } catch (err) {
                // // tslint:disable-next-line:no-magic-numbers
                // return res.status(501).json(err);
                // }
                // tslint:disable-next-line:no-magic-numbers
                return res.status(201).json();
            });
        }
        obtenirUserId(username) {
            return __awaiter(this, void 0, void 0, function* () {
                const usager = yield this.modelUser.findOne(username)
                    .then((res) => res.toObject())
                    // tslint:disable-next-line:no-empty
                    .catch(() => { });
                return usager.id;
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
        requeteDeleteUser(req, res) {
            return __awaiter(this, void 0, void 0, function* () {
                res.send(yield this.deleteUser(req.body, res));
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