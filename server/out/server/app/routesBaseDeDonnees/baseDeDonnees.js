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
let BaseDeDonnees = class BaseDeDonnees {
    constructor() {
        this.mongoURL = "mongodb://admin:admin1@ds239692.mlab.com:39692/log2990-05";
        this.mongoose = new mongoose_1.Mongoose();
        this.mongoose.set("useCreateIndex", true);
        this.seConnecter();
    }
    assurerConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.mongoose.connection.readyState !== 1) {
                yield this.seConnecter();
            }
        });
    }
    seConnecter() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.mongoose.connect(this.mongoURL, { useNewUrlParser: true });
        });
    }
};
BaseDeDonnees = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], BaseDeDonnees);
exports.BaseDeDonnees = BaseDeDonnees;
//# sourceMappingURL=baseDeDonnees.js.map