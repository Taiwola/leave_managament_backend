"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.relieveRoute = void 0;
var express_1 = require("express");
var route = (0, express_1.Router)();
exports.relieveRoute = route;
// import controller
var controller_1 = require("../controller");
var authenticate_1 = require("../middlewares/authenticate");
route.get('/relieving_officer', authenticate_1.authentication, controller_1.find_all_relieve);
route.get('/relieving_officer/:relieveId', authenticate_1.authentication, controller_1.find_one_relieve);
route.post('/relieving_officer', authenticate_1.authentication, controller_1.createRelive);
route.patch('/relieving_officer/:relieveId', authenticate_1.authentication, controller_1.update_relieve);
route.delete('/relieving_officer/:relieveId', authenticate_1.authentication, controller_1.delete_relieve);
//# sourceMappingURL=relieve_officer_routes.js.map