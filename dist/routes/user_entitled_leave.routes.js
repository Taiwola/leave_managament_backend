"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userEntitledLeaveRoutes = void 0;
var express_1 = require("express");
var router = (0, express_1.Router)();
exports.userEntitledLeaveRoutes = router;
var controller_1 = require("../controller");
var authenticate_1 = require("../middlewares/authenticate");
router.get("/user_entitled", authenticate_1.authentication, controller_1.get_all_user_entitled_leave);
router.get("/user_entitled/:Id", authenticate_1.authentication, controller_1.get_one_user_entitled_leave);
router.get("/entitled_user", authenticate_1.authentication, controller_1.get_by_user);
router.post('/user_entitled', authenticate_1.authentication, controller_1.create_user_entitled_leave);
router.delete("/user_entitled/:Id", authenticate_1.authentication, controller_1.deleteUserEntitledLeave);
//# sourceMappingURL=user_entitled_leave.routes.js.map