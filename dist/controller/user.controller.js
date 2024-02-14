"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.updateDeptm = exports.updatePassword = exports.deleteUser = exports.updateUser = exports.findOne = exports.getAll = exports.validateUuid = void 0;
var service_1 = require("../service");
var uuid_1 = require("uuid");
var bcrypt = __importStar(require("bcryptjs"));
var user_1 = require("../database/entity/user");
var validateUuid = function (Id) {
    var isValid = (0, uuid_1.validate)(Id);
    return isValid;
};
exports.validateUuid = validateUuid;
var getAll = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, service_1.findAll)()];
            case 1:
                users = _a.sent();
                return [2 /*return*/, res.status(200).json(users)];
        }
    });
}); };
exports.getAll = getAll;
var findOne = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var Id, validUuid, user, err_1;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                Id = req.params.Id;
                if (!((_a = req.params) === null || _a === void 0 ? void 0 : _a.Id)) {
                    return [2 /*return*/, res.status(400).json({
                            message: "No id provided"
                        })];
                }
                validUuid = (0, exports.validateUuid)(Id);
                if (!validUuid) {
                    return [2 /*return*/, res.status(400).json({ message: "Invalid Id" })];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, service_1.getOne)(Id)];
            case 2:
                user = _b.sent();
                if (!user) {
                    return [2 /*return*/, res.status(404).json({ message: 'User not found' })];
                }
                return [2 /*return*/, res.status(200).json({ data: user })];
            case 3:
                err_1 = _b.sent();
                console.log(err_1);
                return [2 /*return*/, res.status(500).json({
                        message: "Error while fetching the data"
                    })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.findOne = findOne;
var updateUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var Id, validUuid, _a, firstname, lastname, email, status, gradeLevel, enumValues, user, updatedUser, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                Id = req.params.Id;
                validUuid = (0, exports.validateUuid)(Id);
                if (!validUuid) {
                    return [2 /*return*/, res.status(400).send({ error: "Invalid Id" })];
                }
                _a = req.body, firstname = _a.firstname, lastname = _a.lastname, email = _a.email, status = _a.status, gradeLevel = _a.gradeLevel;
                enumValues = Object.values(user_1.UserStatus);
                if (status) {
                    if (!enumValues.includes(status)) {
                        console.log("here");
                        return [2 /*return*/, res.status(406).json({ message: "not a valid enum type" })];
                    }
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                user = {
                    firstname: firstname,
                    lastname: lastname,
                    email: email,
                    status: status,
                    gradeLevel: gradeLevel
                };
                return [4 /*yield*/, (0, service_1.update)(Id, user)];
            case 2:
                updatedUser = _b.sent();
                if (!updatedUser) {
                    return [2 /*return*/, res.status(404).json({ message: 'User not found' })];
                }
                console.log(updatedUser);
                return [2 /*return*/, res.status(201).json({ message: 'user updated', data: updatedUser })];
            case 3:
                error_1 = _b.sent();
                console.log('update error', error_1);
                return [2 /*return*/, res.status(500).json({
                        message: "Error while updating the data",
                    })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updateUser = updateUser;
var deleteUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var Id, validUuid, deletedUser, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                Id = req.params.Id;
                validUuid = (0, exports.validateUuid)(Id);
                if (!validUuid) {
                    return [2 /*return*/, res.status(400).send({ error: "Invalid Id" })];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, service_1.del)(Id)];
            case 2:
                deletedUser = _a.sent();
                if (!deletedUser) {
                    return [2 /*return*/, res.status(404).json({ message: 'User not found' })];
                }
                return [2 /*return*/, res.status(200).json({ message: 'user deleted', data: deletedUser })];
            case 3:
                error_2 = _a.sent();
                console.log("delete user error: ", error_2);
                return [2 /*return*/, res.status(500).json({
                        message: "Error while deleting the data",
                    })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deleteUser = deleteUser;
var updatePassword = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var password, id, validUuid, hashedPassword, updatePassword_1, user, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                password = req.body.password;
                if (!password) {
                    return [2 /*return*/, res.status(400).json({ message: "Password is required" })];
                }
                id = req.params.id;
                validUuid = (0, exports.validateUuid)(id);
                if (!validUuid) {
                    return [2 /*return*/, res.status(400).send({ error: "Invalid Id" })];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                return [4 /*yield*/, bcrypt.hash(password, 10)];
            case 2:
                hashedPassword = _a.sent();
                return [4 /*yield*/, (0, service_1.updatePass)(id, hashedPassword)];
            case 3:
                updatePassword_1 = _a.sent();
                if (!updatePassword_1) {
                    return [2 /*return*/, res.status(404).json({ message: 'User not found' })];
                }
                return [4 /*yield*/, (0, service_1.getOne)(id)];
            case 4:
                user = _a.sent();
                return [2 /*return*/, res.status(200).json({
                        message: "password updated",
                        user: user
                    })];
            case 5:
                err_2 = _a.sent();
                return [2 /*return*/, res.status(500).json({ message: 'Internal server error' })];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.updatePassword = updatePassword;
var updateDeptm = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var deptId, Id, validId, dept, updateUserDept, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                deptId = req.body.deptId;
                Id = req.params.Id;
                if (!deptId) {
                    return [2 /*return*/, res.status(400).json({
                            message: "input field missing"
                        })];
                }
                ;
                validId = (0, uuid_1.validate)(Id);
                if (!validId) {
                    return [2 /*return*/, res.status(400).json({ message: "Invalid Id" })];
                }
                ;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, (0, service_1.findOne_dept)(deptId)];
            case 2:
                dept = _a.sent();
                if (!dept) {
                    return [2 /*return*/, res.status(400).json({ message: "request does not exist" })];
                }
                return [4 /*yield*/, (0, service_1.updateDept)(Id, dept)];
            case 3:
                updateUserDept = _a.sent();
                return [2 /*return*/, res.status(200).json({
                        message: "Request successful"
                    })];
            case 4:
                error_3 = _a.sent();
                console.log(error_3);
                return [2 /*return*/, res.status(500).json({
                        message: "internal server error"
                    })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.updateDeptm = updateDeptm;
//# sourceMappingURL=user.controller.js.map