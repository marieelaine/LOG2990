"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
require("reflect-metadata");
const inversify_config_1 = require("./inversify.config");
const server = inversify_config_1.container.get(types_1.default.Server);
server.init();
//# sourceMappingURL=www.js.map