"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
var express_1 = require("express");
var controller_1 = require("../controller");
var authenticate_1 = require("../middlewares/authenticate");
var route = (0, express_1.Router)();
exports.userRoute = route;
route.get('/user/all', authenticate_1.authentication, controller_1.getAll);
route.get('/user/:Id', authenticate_1.authentication, controller_1.findOne);
route.patch("/user/:Id", authenticate_1.authentication, controller_1.updateUser);
route.patch("/user/password/:id", authenticate_1.authentication, controller_1.updatePassword);
route.patch("/user/change/:Id", authenticate_1.authentication, controller_1.updateDeptm);
route.delete("/user/:Id", authenticate_1.authentication, controller_1.deleteUser);
//# sourceMappingURL=user.routes.js.map