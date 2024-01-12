"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deptRoute = void 0;
var express_1 = require("express");
var route = (0, express_1.Router)();
exports.deptRoute = route;
var controller_1 = require("../controller");
var authenticate_1 = require("../middlewares/authenticate");
route.get("/department", authenticate_1.authentication, controller_1.getAll_dept);
route.get("/department/:Id", authenticate_1.authentication, controller_1.getOne_dept);
route.post("/department", authenticate_1.authentication, controller_1.createDept);
route.patch("/department/:Id", authenticate_1.authentication, controller_1.updateDept);
route.patch("/department/add/:Id", authenticate_1.authentication, controller_1.addStaff);
route.patch("/department/remove/:Id", authenticate_1.authentication, controller_1.removeStaff);
route.delete("/department/:Id", authenticate_1.authentication, controller_1.deleteDept);
//# sourceMappingURL=department.routes.js.map