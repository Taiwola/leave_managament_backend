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
exports.operations_reject = exports.operations_approval = exports.department_reject = exports.department_approval = exports.addComment = exports.rejectOrApprove = exports.deleteLeave = exports.getAllLeave = exports.getOneLeave = exports.getAllPendingLeaves = exports.getUserLeaves = exports.createLeave = void 0;
var data_source_1 = require("../database/data-source");
var entity_1 = require("../database/entity/entity");
var leaveRepo = data_source_1.connectionSource.getRepository(entity_1.Leave);
var createLeave = function (data, user) { return __awaiter(void 0, void 0, void 0, function () {
    var leave, created;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                leave = leaveRepo.create({
                    title: data.title,
                    description: data.description,
                    start_date: data.startDate,
                    end_date: data.endDate,
                    user: user,
                    leave_type: data.leave_type,
                    number_of_days: data.number_of_days,
                    number_of_weeks: data.number_of_weeks
                });
                return [4 /*yield*/, leaveRepo.save(leave)];
            case 1:
                created = _a.sent();
                return [2 /*return*/, created];
        }
    });
}); };
exports.createLeave = createLeave;
var getUserLeaves = function (user) { return __awaiter(void 0, void 0, void 0, function () {
    var leave;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, leaveRepo.find({
                    where: { user: { id: user.id } },
                    relations: ['user', 'user.staff', 'relieving_officer']
                })];
            case 1:
                leave = _a.sent();
                return [2 /*return*/, leave];
        }
    });
}); };
exports.getUserLeaves = getUserLeaves;
var getAllPendingLeaves = function () { return __awaiter(void 0, void 0, void 0, function () {
    var leaves;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, leaveRepo.find({
                    where: { status: entity_1.Status.pending },
                    relations: ['user', 'user.staff']
                })];
            case 1:
                leaves = _a.sent();
                return [2 /*return*/, leaves];
        }
    });
}); };
exports.getAllPendingLeaves = getAllPendingLeaves;
var getOneLeave = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var leave;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, leaveRepo.findOne({
                    where: { id: id },
                    relations: ['user', 'user.staff', 'relieving_officer']
                })];
            case 1:
                leave = _a.sent();
                return [2 /*return*/, leave];
        }
    });
}); };
exports.getOneLeave = getOneLeave;
var getAllLeave = function () { return __awaiter(void 0, void 0, void 0, function () {
    var leave;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, leaveRepo.find({
                    relations: ['user', 'user.staff', 'relieving_officer'],
                    order: { createdAt: 'desc' }
                })];
            case 1:
                leave = _a.sent();
                return [2 /*return*/, leave];
        }
    });
}); };
exports.getAllLeave = getAllLeave;
var deleteLeave = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var deleted;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, leaveRepo.delete({ id: id })];
            case 1:
                deleted = _a.sent();
                return [2 /*return*/, deleted];
        }
    });
}); };
exports.deleteLeave = deleteLeave;
var rejectOrApprove = function (id, status) { return __awaiter(void 0, void 0, void 0, function () {
    var leave;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, leaveRepo.update({ id: id }, {
                    status: status
                })];
            case 1:
                leave = _a.sent();
                return [2 /*return*/, leave];
        }
    });
}); };
exports.rejectOrApprove = rejectOrApprove;
var addComment = function (id, comment) { return __awaiter(void 0, void 0, void 0, function () {
    var leave;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, leaveRepo.update({ id: id }, { comment: comment })];
            case 1:
                leave = _a.sent();
                return [2 /*return*/, leave];
        }
    });
}); };
exports.addComment = addComment;
var department_approval = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var dept;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, leaveRepo.update(id, {
                    departmental_approval: entity_1.Approval_type.reviewed
                })];
            case 1:
                dept = _a.sent();
                return [2 /*return*/, dept];
        }
    });
}); };
exports.department_approval = department_approval;
var department_reject = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var dept;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, leaveRepo.update(id, {
                    departmental_approval: entity_1.Approval_type.rejected
                })];
            case 1:
                dept = _a.sent();
                return [2 /*return*/, dept];
        }
    });
}); };
exports.department_reject = department_reject;
var operations_approval = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var dept;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, leaveRepo.update(id, {
                    operation_management_approval: entity_1.Approval_type.reviewed
                })];
            case 1:
                dept = _a.sent();
                return [2 /*return*/, dept];
        }
    });
}); };
exports.operations_approval = operations_approval;
var operations_reject = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var dept;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, leaveRepo.update(id, {
                    operation_management_approval: entity_1.Approval_type.rejected
                })];
            case 1:
                dept = _a.sent();
                return [2 /*return*/, dept];
        }
    });
}); };
exports.operations_reject = operations_reject;
//# sourceMappingURL=leave.services.js.map