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
exports.delete_dept = exports.findOne_dept = exports.findAll_dept = exports.remove_staff = exports.add_staff = exports.update_dept = exports.create_dept = void 0;
var data_source_1 = require("../database/data-source");
var entity_1 = require("../database/entity/entity");
var user_1 = require("../database/entity/user");
var departmentRepo = data_source_1.connectionSource.getRepository(entity_1.Department);
var userRepository = data_source_1.connectionSource.getRepository(user_1.User);
var create_dept = function (name) { return __awaiter(void 0, void 0, void 0, function () {
    var dept, saved;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                dept = departmentRepo.create({
                    name: name,
                });
                return [4 /*yield*/, departmentRepo.save(dept)];
            case 1:
                saved = _a.sent();
                return [2 /*return*/, saved];
        }
    });
}); };
exports.create_dept = create_dept;
var update_dept = function (id, user, name) { return __awaiter(void 0, void 0, void 0, function () {
    var dept;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, departmentRepo.update(id, {
                    name: name,
                    director: user,
                })];
            case 1:
                dept = _a.sent();
                return [2 /*return*/, dept];
        }
    });
}); };
exports.update_dept = update_dept;
var add_staff = function (id, user) { return __awaiter(void 0, void 0, void 0, function () {
    var findDept, addStaff;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, exports.findOne_dept)(id)];
            case 1:
                findDept = _a.sent();
                return [4 /*yield*/, userRepository.update(user.id, {
                        staff: findDept
                    })];
            case 2:
                addStaff = _a.sent();
                return [2 /*return*/, addStaff];
        }
    });
}); };
exports.add_staff = add_staff;
var remove_staff = function (user) { return __awaiter(void 0, void 0, void 0, function () {
    var removeStaff;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, userRepository.update(user.id, {
                    staff: null
                })];
            case 1:
                removeStaff = _a.sent();
                return [2 /*return*/, removeStaff];
        }
    });
}); };
exports.remove_staff = remove_staff;
var findAll_dept = function () { return __awaiter(void 0, void 0, void 0, function () {
    var dept;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, departmentRepo.find({
                    relations: ['staff', 'director']
                })];
            case 1:
                dept = _a.sent();
                return [2 /*return*/, dept];
        }
    });
}); };
exports.findAll_dept = findAll_dept;
var findOne_dept = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var dept;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, departmentRepo.findOne({
                    where: { id: id },
                    relations: ['staff', 'director']
                })];
            case 1:
                dept = _a.sent();
                return [2 /*return*/, dept];
        }
    });
}); };
exports.findOne_dept = findOne_dept;
var delete_dept = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var dept;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, departmentRepo.delete(id)];
            case 1:
                dept = _a.sent();
                return [2 /*return*/, dept];
        }
    });
}); };
exports.delete_dept = delete_dept;
//# sourceMappingURL=department.service.js.map