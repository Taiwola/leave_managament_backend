"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.coverletterRoute = void 0;
var express_1 = require("express");
var route = (0, express_1.Router)();
exports.coverletterRoute = route;
var controller_1 = require("../controller");
route.get("/reliveletter/:Id", controller_1.addRelievingOfficerCoverLetter);
route.get("/directorletter/:Id", controller_1.directorApproval);
route.get("/operationsletter/:Id", controller_1.optAndMgtApproval);
//# sourceMappingURL=coverletter.route.js.map