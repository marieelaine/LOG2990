"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const types_1 = require("./types");
const server_1 = require("./server");
const app_1 = require("./app");
const index_1 = require("./routes/index");
const routes_1 = require("./routes");
const container = new inversify_1.Container();
exports.container = container;
container.bind(types_1.default.Server).to(server_1.Server);
container.bind(types_1.default.Application).to(app_1.Application);
container.bind(types_1.default.Routes).to(routes_1.Routes);
container.bind(types_1.default.Index).to(index_1.Route.Index);
//# sourceMappingURL=inversify.config.js.map