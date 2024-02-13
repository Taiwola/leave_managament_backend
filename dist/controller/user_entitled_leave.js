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
exports.deleteUserEntitledLeave = exports.get_by_user = exports.get_one_user_entitled_leave = exports.get_all_user_entitled_leave = exports.create_user_entitled_leave = void 0;
var service_1 = require("../service");
var uuid_1 = require("uuid");
var create_user_entitled_leave = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, userExist, entitledNumbOfDays, number_of_days, currentYear, createUserEntitledLeave, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.user.id;
                return [4 /*yield*/, (0, service_1.getOne)(userId)];
            case 1:
                userExist = _a.sent();
                if (!userExist) {
                    return [2 /*return*/, res.status(400).json({
                            message: "Request does not exist"
                        })];
                }
                ;
                _a.label = 2;
            case 2:
                _a.trys.push([2, 5, , 6]);
                return [4 /*yield*/, (0, service_1.getEntitledLeaveByGradeLevel)(userExist.gradeLevel)];
            case 3:
                entitledNumbOfDays = _a.sent();
                if (!entitledNumbOfDays) {
                    return [2 /*return*/, res.status(400).json({
                            message: "Request was unsuccessful"
                        })];
                }
                number_of_days = entitledNumbOfDays.numberOfDays;
                currentYear = new Date().getFullYear();
                return [4 /*yield*/, (0, service_1.createEntitledUserLeave)(currentYear, userExist, number_of_days)];
            case 4:
                createUserEntitledLeave = _a.sent();
                return [2 /*return*/, res.status(200).json({
                        message: "request was successful",
                        data: createUserEntitledLeave
                    })];
            case 5:
                error_1 = _a.sent();
                console.log(error_1);
                return [2 /*return*/, res.status(500).json({
                        message: "internal server error"
                    })];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.create_user_entitled_leave = create_user_entitled_leave;
var get_all_user_entitled_leave = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var entitled;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, service_1.getAllUserEntitledLeave)()];
            case 1:
                entitled = _a.sent();
                res.status(200).json({
                    message: "request successful",
                    data: entitled
                });
                return [2 /*return*/];
        }
    });
}); };
exports.get_all_user_entitled_leave = get_all_user_entitled_leave;
// export const get_one_user_entitled_leave = async (req: Request, res: Response) => {
//     const {Id} = req.params;
//     const validId = validate(Id);
//     if (!validId) {
//         return res.status(400).json({
//             message: "request invalid"
//         });
//     };
//     try {
//         const entitled = await getOneUserEntitledLeave(Id)
//         return res.status(200).json({
//             message: "request successful",
//             data: entitled
//         });
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             message: "internal server error"
//         })
//     }
// };
var get_one_user_entitled_leave = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var Id, userId, validId, user, entitled, current, entitledNumbOfDays, updateUserEntitled, updatedEntitled, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                Id = req.params.Id;
                userId = req.user.id;
                validId = (0, uuid_1.validate)(Id);
                if (!validId) {
                    return [2 /*return*/, res.status(400).json({
                            message: "request invalid"
                        })];
                }
                ;
                return [4 /*yield*/, (0, service_1.getOne)(userId)];
            case 1:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, res.status(400).json({
                            message: "request does not exist"
                        })];
                }
                return [4 /*yield*/, (0, service_1.getOneUserEntitledLeave)(Id)];
            case 2:
                entitled = _a.sent();
                current = new Date().getFullYear();
                if (!(entitled.currentYear !== current)) return [3 /*break*/, 9];
                _a.label = 3;
            case 3:
                _a.trys.push([3, 7, , 8]);
                return [4 /*yield*/, (0, service_1.getEntitledLeaveByGradeLevel)(user.gradeLevel)];
            case 4:
                entitledNumbOfDays = _a.sent();
                return [4 /*yield*/, (0, service_1.updateEntitledUserLeave)(Id, entitledNumbOfDays.numberOfDays, current)];
            case 5:
                updateUserEntitled = _a.sent();
                return [4 /*yield*/, (0, service_1.getOneUserEntitledLeave)(Id)];
            case 6:
                updatedEntitled = _a.sent();
                return [2 /*return*/, res.status(200).json({
                        message: "Number of days resetted",
                        data: updatedEntitled
                    })];
            case 7:
                error_2 = _a.sent();
                console.log(error_2);
                return [2 /*return*/, res.status(500).json({
                        message: "internal server error"
                    })];
            case 8: return [3 /*break*/, 10];
            case 9:
                try {
                    return [2 /*return*/, res.status(200).json({
                            message: "Request successful",
                            data: entitled
                        })];
                }
                catch (error) {
                    console.log(error);
                    return [2 /*return*/, res.status(500).json({
                            message: "internal server error"
                        })];
                }
                _a.label = 10;
            case 10: return [2 /*return*/];
        }
    });
}); };
exports.get_one_user_entitled_leave = get_one_user_entitled_leave;
var get_by_user = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var usrId, user, getEntitled, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                usrId = req.user.id;
                return [4 /*yield*/, (0, service_1.getOne)(usrId)];
            case 1:
                user = _a.sent();
                return [4 /*yield*/, (0, service_1.getOneByUser)(user)];
            case 2:
                getEntitled = _a.sent();
                return [2 /*return*/, res.status(200).json({
                        data: getEntitled
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
exports.get_by_user = get_by_user;
var deleteUserEntitledLeave = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var Id, validId, del, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                Id = req.params.Id;
                validId = (0, uuid_1.validate)(Id);
                if (!validId) {
                    return [2 /*return*/, res.status(400).json({
                            message: "request invalid"
                        })];
                }
                ;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, service_1.delUserEntitledLeave)(Id)];
            case 2:
                del = _a.sent();
                return [2 /*return*/, res.status(200).json({
                        message: "Request successful"
                    })];
            case 3:
                error_4 = _a.sent();
                console.log(error_4);
                return [2 /*return*/, res.status(500).json({
                        message: "Internal server error"
                    })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deleteUserEntitledLeave = deleteUserEntitledLeave;
//# sourceMappingURL=user_entitled_leave.js.map