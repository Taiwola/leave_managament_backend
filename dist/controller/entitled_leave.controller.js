"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.delete_entitled_leave = exports.get_one_entitled = exports.get_all_entitled = exports.create_entitled_leave = void 0;
var service_1 = require("../service");
var user_controller_1 = require("./user.controller");
var create_entitled_leave = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, gradeLevel, no_of_days, entitled, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, gradeLevel = _a.gradeLevel, no_of_days = _a.no_of_days;
                if (!gradeLevel || !no_of_days) {
                    return [2 /*return*/, res.status(400).json({
                            message: "missing field required"
                        })];
                }
                ;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, service_1.createEntitledLeave)(+gradeLevel, +no_of_days)];
            case 2:
                entitled = _b.sent();
                return [2 /*return*/, res.status(201).json({
                        message: "Request was successful",
                        data: entitled
                    })];
            case 3:
                error_1 = _b.sent();
                console.log(error_1);
                return [2 /*return*/, res.status(500).json({
                        message: "internal server error"
                    })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.create_entitled_leave = create_entitled_leave;
var get_all_entitled = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var entitled;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, service_1.getEntitledLeave)()];
            case 1:
                entitled = _a.sent();
                res.status(200).json({
                    message: "success",
                    data: entitled
                });
                return [2 /*return*/];
        }
    });
}); };
exports.get_all_entitled = get_all_entitled;
var get_one_entitled = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var Id, validId, entitled, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                Id = req.params.Id;
                validId = (0, user_controller_1.validateUuid)(Id);
                if (!validId) {
                    return [2 /*return*/, res.status(400).json({
                            message: 'Invalid Id'
                        })];
                }
                ;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, service_1.getOneEntitledLeave)(Id)];
            case 2:
                entitled = _a.sent();
                if (!entitled) {
                    return [2 /*return*/, res.status(404).json({
                            message: 'No Request found with this ID!'
                        })];
                }
                ;
                res.status(200).json({
                    message: 'Success',
                    data: entitled
                });
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                console.log(error_2);
                return [2 /*return*/, res.status(500).json({
                        message: "internal server error"
                    })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.get_one_entitled = get_one_entitled;
var delete_entitled_leave = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var Id, validId, del, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                Id = req.params.Id;
                validId = (0, user_controller_1.validateUuid)(Id);
                if (!validId) {
                    return [2 /*return*/, res.status(400).json({
                            message: 'Invalid Id'
                        })];
                }
                ;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, service_1.deleteEntitledLeave)(Id)];
            case 2:
                del = _a.sent();
                return [2 /*return*/, res.status(200).json({
                        message: "Delete Successful",
                    })];
            case 3:
                error_3 = _a.sent();
                console.log(error_3);
                return [2 /*return*/, res.status(500).json({
                        message: "internal server error"
                    })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.delete_entitled_leave = delete_entitled_leave;
//# sourceMappingURL=entitled_leave.controller.js.map