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
exports.delUserEntitledLeave = exports.updateEntitledUserLeave = exports.getOneByUser = exports.getOneUserEntitledLeave = exports.getAllUserEntitledLeave = exports.createEntitledUserLeave = void 0;
var data_source_1 = require("../database/data-source");
var entity_1 = require("../database/entity/entity");
var entitledLeaveRepo = data_source_1.connectionSource.getRepository(entity_1.User_Entitled_Leave);
var createEntitledUserLeave = function (currentYear, user, numberOfDays) { return __awaiter(void 0, void 0, void 0, function () {
    var userEntitled, entitled;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userEntitled = entitledLeaveRepo.create({
                    currentYear: new Date().getFullYear(),
                    numberOfDays: numberOfDays,
                    user: user,
                    gradeLevel: user.gradeLevel
                });
                return [4 /*yield*/, entitledLeaveRepo.save(userEntitled)];
            case 1:
                entitled = _a.sent();
                return [2 /*return*/, entitled];
        }
    });
}); };
exports.createEntitledUserLeave = createEntitledUserLeave;
var getAllUserEntitledLeave = function () { return __awaiter(void 0, void 0, void 0, function () {
    var entitled;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, entitledLeaveRepo.find({
                    relations: ['user']
                })];
            case 1:
                entitled = _a.sent();
                return [2 /*return*/, entitled];
        }
    });
}); };
exports.getAllUserEntitledLeave = getAllUserEntitledLeave;
var getOneUserEntitledLeave = function (Id) { return __awaiter(void 0, void 0, void 0, function () {
    var entitled;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, entitledLeaveRepo.findOne({
                    where: { id: Id },
                    relations: ['user']
                })];
            case 1:
                entitled = _a.sent();
                return [2 /*return*/, entitled];
        }
    });
}); };
exports.getOneUserEntitledLeave = getOneUserEntitledLeave;
var getOneByUser = function (user) { return __awaiter(void 0, void 0, void 0, function () {
    var entitled;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, entitledLeaveRepo.findOne({
                    where: { userId: user.id },
                    relations: ['user']
                })];
            case 1:
                entitled = _a.sent();
                return [2 /*return*/, entitled];
        }
    });
}); };
exports.getOneByUser = getOneByUser;
var updateEntitledUserLeave = function (Id, updatedNumberOfDays, gradedlevel, updatedYear) { return __awaiter(void 0, void 0, void 0, function () {
    var entitled;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, entitledLeaveRepo.update(Id, {
                    numberOfDays: updatedNumberOfDays,
                    currentYear: updatedYear,
                    gradeLevel: gradedlevel
                })];
            case 1:
                entitled = _a.sent();
                return [2 /*return*/, entitled];
        }
    });
}); };
exports.updateEntitledUserLeave = updateEntitledUserLeave;
var delUserEntitledLeave = function (Id) { return __awaiter(void 0, void 0, void 0, function () {
    var entitled;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, entitledLeaveRepo.delete(Id)];
            case 1:
                entitled = _a.sent();
                return [2 /*return*/, entitled];
        }
    });
}); };
exports.delUserEntitledLeave = delUserEntitledLeave;
//# sourceMappingURL=user_entitled_leave.js.map