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
exports.deleteEntitledLeave = exports.updateEntitledLeave = exports.getOneEntitledLeave = exports.getEntitledLeaveByGradeLevel = exports.getEntitledLeave = exports.createEntitledLeave = void 0;
var entity_1 = require("../database/entity/entity");
var data_source_1 = require("../database/data-source");
var entitled_leave_Repo = data_source_1.connectionSource.getRepository(entity_1.Entitled_Leave);
var createEntitledLeave = function (gradeLevel, no_of_days) { return __awaiter(void 0, void 0, void 0, function () {
    var entitled, save;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                entitled = entitled_leave_Repo.create({
                    gradeLevel: gradeLevel,
                    numberOfDays: no_of_days
                });
                return [4 /*yield*/, entitled_leave_Repo.save(entitled)];
            case 1:
                save = _a.sent();
                return [2 /*return*/, save];
        }
    });
}); };
exports.createEntitledLeave = createEntitledLeave;
var getEntitledLeave = function () { return __awaiter(void 0, void 0, void 0, function () {
    var entitled;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, entitled_leave_Repo.find()];
            case 1:
                entitled = _a.sent();
                return [2 /*return*/, entitled];
        }
    });
}); };
exports.getEntitledLeave = getEntitledLeave;
var getEntitledLeaveByGradeLevel = function (level) { return __awaiter(void 0, void 0, void 0, function () {
    var entitled;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, entitled_leave_Repo.findOne({
                    where: { gradeLevel: level }
                })];
            case 1:
                entitled = _a.sent();
                return [2 /*return*/, entitled];
        }
    });
}); };
exports.getEntitledLeaveByGradeLevel = getEntitledLeaveByGradeLevel;
var getOneEntitledLeave = function (Id) { return __awaiter(void 0, void 0, void 0, function () {
    var entitled;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, entitled_leave_Repo.findOne({
                    where: { id: Id }
                })];
            case 1:
                entitled = _a.sent();
                return [2 /*return*/, entitled];
        }
    });
}); };
exports.getOneEntitledLeave = getOneEntitledLeave;
var updateEntitledLeave = function (Id, gradeLevel, no_of_days) { return __awaiter(void 0, void 0, void 0, function () {
    var entitled;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, entitled_leave_Repo.update(Id, {
                    gradeLevel: gradeLevel,
                    numberOfDays: no_of_days
                })];
            case 1:
                entitled = _a.sent();
                return [2 /*return*/, entitled];
        }
    });
}); };
exports.updateEntitledLeave = updateEntitledLeave;
var deleteEntitledLeave = function (Id) { return __awaiter(void 0, void 0, void 0, function () {
    var entitled;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, entitled_leave_Repo.delete(Id)];
            case 1:
                entitled = _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.deleteEntitledLeave = deleteEntitledLeave;
//# sourceMappingURL=entitled_leave.service.js.map