"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoute = void 0;
var express_1 = require("express");
var route = (0, express_1.Router)();
exports.authRoute = route;
var controller_1 = require("../controller");
var authenticate_1 = require("../middlewares/authenticate");
route.post('/auth/register', controller_1.registerUser);
route.post('/auth/signin', controller_1.signIn);
route.post('/auth/logout', authenticate_1.authentication, controller_1.logUserOut);
//# sourceMappingURL=auth.routes.js.map