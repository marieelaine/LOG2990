"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
require("reflect-metadata");
const inversify_config_1 = require("./inversify.config");
const socket_io_1 = require("./socket-io");
const server = inversify_config_1.container.get(types_1.default.Server);
server.init();
exports.socketServer = new socket_io_1.SocketServer(server.server);
exports.socketServer.init();
//# sourceMappingURL=www.js.map