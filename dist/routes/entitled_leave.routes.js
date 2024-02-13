"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.entitled_leaveRoute = void 0;
var express_1 = require("express");
var controller_1 = require("../controller");
var router = (0, express_1.Router)();
exports.entitled_leaveRoute = router;
var authenticate_1 = require("../middlewares/authenticate");
router.get("/entitled_leave", authenticate_1.authentication, controller_1.get_all_entitled);
router.get("/entitled_leave/:Id", authenticate_1.authentication, controller_1.get_one_entitled);
// @desc    Create a new entitled leave request
// @route   POST /api/v1/entitlements/leaves
// @access  Private (Authenticated users)
router.post('/entitled_leave', authenticate_1.authentication, controller_1.create_entitled_leave);
router.delete("/entitled_leave/:Id", authenticate_1.authentication, controller_1.delete_entitled_leave);
//# sourceMappingURL=entitled_leave.routes.js.map