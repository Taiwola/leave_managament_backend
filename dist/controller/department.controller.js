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
exports.deleteDept = exports.getAll_dept = exports.getOne_dept = exports.removeStaff = exports.addStaff = exports.updateDept = exports.createDept = void 0;
var service_1 = require("../service");
var user_controller_1 = require("./user.controller");
var createDept = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var name, dept, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                name = req.body.name;
                if (!name) {
                    return [2 /*return*/, res.status(404).json({
                            message: "required input missing"
                        })];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, service_1.create_dept)(name)];
            case 2:
                dept = _a.sent();
                return [2 /*return*/, res.status(200).json({
                        message: "department created"
                    })];
            case 3:
                error_1 = _a.sent();
                console.log(error_1);
                return [2 /*return*/, res.status(500).json({
                        message: "Internal server error"
                    })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.createDept = createDept;
var updateDept = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, id, dept_Id, isValid, valid, user, dept, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, name = _a.name, id = _a.id;
                dept_Id = req.params.Id;
                isValid = (0, user_controller_1.validateUuid)(id);
                if (!isValid) {
                    return [2 /*return*/, res.status(400).json({ message: "Invalid Id" })];
                }
                valid = (0, user_controller_1.validateUuid)(dept_Id);
                if (!isValid) {
                    return [2 /*return*/, res.status(400).json({ message: "Invalid Id" })];
                }
                return [4 /*yield*/, (0, service_1.getOne)(id)];
            case 1:
                user = _b.sent();
                if (!user) {
                    return [2 /*return*/, res.status(404).json({
                            message: "user does not exist"
                        })];
                }
                ;
                _b.label = 2;
            case 2:
                _b.trys.push([2, 4, , 5]);
                return [4 /*yield*/, (0, service_1.update_dept)(dept_Id, user, name)];
            case 3:
                dept = _b.sent();
                return [2 /*return*/, res.status(200).json({
                        message: "department updated"
                    })];
            case 4:
                error_2 = _b.sent();
                console.log(error_2);
                return [2 /*return*/, res.status(500).json({
                        message: "Internal server error"
                    })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.updateDept = updateDept;
var addStaff = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, Id, isValid, validId, deptExist, user, dept, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.body.id;
                Id = req.params.Id;
                isValid = (0, user_controller_1.validateUuid)(id);
                validId = (0, user_controller_1.validateUuid)(Id);
                if (!isValid || !validId) {
                    return [2 /*return*/, res.status(400).json({ message: "Invalid Id" })];
                }
                return [4 /*yield*/, (0, service_1.findOne_dept)(Id)];
            case 1:
                deptExist = _a.sent();
                if (!deptExist) {
                    return [2 /*return*/, res.status(404).json({
                            message: "Not found"
                        })];
                }
                return [4 /*yield*/, (0, service_1.getOne)(id)];
            case 2:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, res.status(404).json({
                            message: "user does not exist"
                        })];
                }
                ;
                _a.label = 3;
            case 3:
                _a.trys.push([3, 5, , 6]);
                return [4 /*yield*/, (0, service_1.add_staff)(Id, user)];
            case 4:
                dept = _a.sent();
                return [2 /*return*/, res.status(200).json({
                        message: "staff added"
                    })];
            case 5:
                error_3 = _a.sent();
                console.log(error_3);
                return [2 /*return*/, res.status(500).json({
                        message: "internal server error"
                    })];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.addStaff = addStaff;
var removeStaff = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, Id, isValid, validId, deptExist, user, dept, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.body.id;
                Id = req.params.Id;
                isValid = (0, user_controller_1.validateUuid)(id);
                validId = (0, user_controller_1.validateUuid)(Id);
                if (!isValid || !validId) {
                    return [2 /*return*/, res.status(400).json({ message: "Invalid Id" })];
                }
                return [4 /*yield*/, (0, service_1.findOne_dept)(Id)];
            case 1:
                deptExist = _a.sent();
                if (!deptExist) {
                    return [2 /*return*/, res.status(404).json({
                            message: "Not found"
                        })];
                }
                return [4 /*yield*/, (0, service_1.getOne)(id)];
            case 2:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, res.status(404).json({
                            message: "user does not exist"
                        })];
                }
                ;
                _a.label = 3;
            case 3:
                _a.trys.push([3, 5, , 6]);
                return [4 /*yield*/, (0, service_1.remove_staff)(user)];
            case 4:
                dept = _a.sent();
                return [2 /*return*/, res.status(200).json({
                        message: "staff removed"
                    })];
            case 5:
                error_4 = _a.sent();
                console.log(error_4);
                return [2 /*return*/, res.status(500).json({
                        message: "internal server error"
                    })];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.removeStaff = removeStaff;
var getOne_dept = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var Id, isValid, dept;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                Id = req.params.Id;
                isValid = (0, user_controller_1.validateUuid)(Id);
                if (!isValid) {
                    return [2 /*return*/, res.status(400).json({ message: "Invalid Id" })];
                }
                ;
                return [4 /*yield*/, (0, service_1.findOne_dept)(Id)];
            case 1:
                dept = _a.sent();
                if (!dept) {
                    return [2 /*return*/, res.status(404).json({
                            message: "Not found"
                        })];
                }
                ;
                return [2 /*return*/, res.status(200).json({
                        data: dept
                    })];
        }
    });
}); };
exports.getOne_dept = getOne_dept;
var getAll_dept = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var dept;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, service_1.findAll_dept)()];
            case 1:
                dept = _a.sent();
                return [2 /*return*/, res.status(200).json({
                        message: "success",
                        data: dept
                    })];
        }
    });
}); };
exports.getAll_dept = getAll_dept;
var deleteDept = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var Id, isValid, dept, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                Id = req.params.Id;
                isValid = (0, user_controller_1.validateUuid)(Id);
                if (!isValid) {
                    return [2 /*return*/, res.status(400).json({ message: "Invalid Id" })];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, service_1.delete_dept)(Id)];
            case 2:
                dept = _a.sent();
                return [2 /*return*/, res.status(200).json({
                        message: "department deleted successfully"
                    })];
            case 3:
                error_5 = _a.sent();
                console.log(error_5);
                return [2 /*return*/, res.status(500).json({
                        message: "Internal server error"
                    })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deleteDept = deleteDept;
//# sourceMappingURL=department.controller.js.map