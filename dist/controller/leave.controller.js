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
exports.operationReject = exports.operationsApproval = exports.departmentReject = exports.departmentalApproval = exports.addLeaveCoverLetter = exports.addCommentToLeave = exports.updateStatus = exports.delete_leave = exports.get_one = exports.findAllUserLeaves = exports.pendingLeaves = exports.find_all = exports.create_leave = void 0;
var service_1 = require("../service");
var user_controller_1 = require("./user.controller");
var entity_1 = require("../database/entity/entity");
var create_leave = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user_id, _a, title, description, startDate, endDate, number_of_days, leave_type, number_of_weeks, isValid, enumValues, userExist, leave_data, created, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                user_id = req.user.id;
                _a = req.body, title = _a.title, description = _a.description, startDate = _a.startDate, endDate = _a.endDate, number_of_days = _a.number_of_days, leave_type = _a.leave_type, number_of_weeks = _a.number_of_weeks;
                isValid = (0, user_controller_1.validateUuid)(user_id);
                if (!isValid) {
                    return [2 /*return*/, res.status(400).json({ message: "Invalid Id" })];
                }
                enumValues = Object.values(entity_1.Type);
                if (!enumValues.includes(leave_type)) {
                    return [2 /*return*/, res.status(406).json({ message: "not a valid enum type" })];
                }
                if (!title || !description || !startDate || !endDate || !number_of_days || !number_of_weeks) {
                    return [2 /*return*/, res.status(400).json({ error: 'Please provide all fields.' })];
                }
                return [4 /*yield*/, (0, service_1.getOne)(user_id)];
            case 1:
                userExist = _b.sent();
                if (!userExist) {
                    return [2 /*return*/, res.status(401).json({ message: 'User not found' })];
                }
                leave_data = {
                    title: title,
                    description: description,
                    startDate: startDate,
                    endDate: endDate,
                    number_of_days: number_of_days,
                    number_of_weeks: number_of_weeks,
                    leave_type: leave_type
                };
                _b.label = 2;
            case 2:
                _b.trys.push([2, 4, , 5]);
                return [4 /*yield*/, (0, service_1.createLeave)(leave_data, userExist)];
            case 3:
                created = _b.sent();
                return [2 /*return*/, res.status(200).json({
                        message: "leave successfully created",
                        data: created
                    })];
            case 4:
                error_1 = _b.sent();
                console.log(error_1);
                return [2 /*return*/, res.status(500).json({ msg: 'Error creating a new leave request' })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.create_leave = create_leave;
var find_all = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var leaves;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, service_1.getAllLeave)()];
            case 1:
                leaves = _a.sent();
                return [2 /*return*/, res.status(200).json({
                        data: leaves
                    })];
        }
    });
}); };
exports.find_all = find_all;
var pendingLeaves = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var leave, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, service_1.getAllPendingLeaves)()];
            case 1:
                leave = _a.sent();
                return [2 /*return*/, res.status(200).json({
                        leave: leave
                    })];
            case 2:
                error_2 = _a.sent();
                console.log(error_2);
                res.status(500).json({
                    message: "internal server error"
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.pendingLeaves = pendingLeaves;
var findAllUserLeaves = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user_id, userExist, leaves;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user_id = req.user.id;
                return [4 /*yield*/, (0, service_1.getOne)(user_id)];
            case 1:
                userExist = _a.sent();
                if (!userExist) {
                    return [2 /*return*/, res.status(401).json({ message: 'User not found' })];
                }
                return [4 /*yield*/, (0, service_1.getUserLeaves)(userExist)];
            case 2:
                leaves = _a.sent();
                res.status(200).json({
                    data: leaves
                });
                return [2 /*return*/];
        }
    });
}); };
exports.findAllUserLeaves = findAllUserLeaves;
var get_one = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var Id, isValid, leave, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                Id = req.params.Id;
                isValid = (0, user_controller_1.validateUuid)(Id);
                if (!isValid) {
                    return [2 /*return*/, res.status(400).send({ error: "Invalid Id" })];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, service_1.getOneLeave)(Id)];
            case 2:
                leave = _a.sent();
                if (!leave) {
                    return [2 /*return*/, res.status(400).json({
                            message: "leave does not exist"
                        })];
                }
                return [2 /*return*/, res.status(200).json({
                        data: leave
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
exports.get_one = get_one;
var delete_leave = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var Id, isValid, relieve, deleteLeaveError_1, deleteRelieveResult, deleteError_1, error_4;
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
                _a.trys.push([1, 12, , 13]);
                return [4 /*yield*/, (0, service_1.getOneRelieveForLeave)(Id)];
            case 2:
                relieve = _a.sent();
                if (!!relieve) return [3 /*break*/, 7];
                _a.label = 3;
            case 3:
                _a.trys.push([3, 5, , 6]);
                return [4 /*yield*/, (0, service_1.deleteLeave)(Id)];
            case 4:
                _a.sent();
                return [2 /*return*/, res.status(200).json({
                        message: "Leave deleted successfully"
                    })];
            case 5:
                deleteLeaveError_1 = _a.sent();
                console.log(deleteLeaveError_1);
                return [2 /*return*/, res.status(500).json({
                        message: "Internal server error"
                    })];
            case 6: return [3 /*break*/, 11];
            case 7:
                _a.trys.push([7, 10, , 11]);
                return [4 /*yield*/, (0, service_1.deleteRelieve)(relieve.id)];
            case 8:
                deleteRelieveResult = _a.sent();
                if (deleteRelieveResult.affected <= 0) {
                    return [2 /*return*/, res.status(404).json({
                            message: "Leave not found or has already been deleted"
                        })];
                }
                return [4 /*yield*/, (0, service_1.deleteLeave)(Id)];
            case 9:
                _a.sent();
                return [2 /*return*/, res.status(200).json({
                        message: "Leave deleted successfully"
                    })];
            case 10:
                deleteError_1 = _a.sent();
                console.log(deleteError_1);
                return [2 /*return*/, res.status(500).json({
                        message: "Internal server error"
                    })];
            case 11: return [3 /*break*/, 13];
            case 12:
                error_4 = _a.sent();
                console.log(error_4);
                return [2 /*return*/, res.status(500).json({
                        message: "Internal server error"
                    })];
            case 13: return [2 /*return*/];
        }
    });
}); };
exports.delete_leave = delete_leave;
var updateStatus = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var Id, isValid, status, updatedStatus, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                Id = req.params.Id;
                isValid = (0, user_controller_1.validateUuid)(Id);
                if (!isValid) {
                    return [2 /*return*/, res.status(400).send({ message: "Invalid Id" })];
                }
                status = req.body.status;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, service_1.rejectOrApprove)(Id, status)];
            case 2:
                updatedStatus = _a.sent();
                return [2 /*return*/, res.status(200).json({
                        message: "status updated",
                        data: updatedStatus
                    })];
            case 3:
                error_5 = _a.sent();
                console.log(error_5);
                return [2 /*return*/, res.status(500).json({
                        message: "internal server error"
                    })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updateStatus = updateStatus;
var addCommentToLeave = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var Id, isValid, comment, addedComment, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                Id = req.params.Id;
                isValid = (0, user_controller_1.validateUuid)(Id);
                if (!isValid) {
                    return [2 /*return*/, res.status(400).json({ message: "Invalid Id" })];
                }
                comment = req.body.comment;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, service_1.addComment)(Id, comment)];
            case 2:
                addedComment = _a.sent();
                return [2 /*return*/, res.status(200).json({
                        message: "comment added",
                        data: addedComment
                    })];
            case 3:
                error_6 = _a.sent();
                console.log(error_6);
                return [2 /*return*/, res.status(500).json({
                        message: "internal server error"
                    })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.addCommentToLeave = addCommentToLeave;
var addLeaveCoverLetter = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var Id, isValid, leaveExist, leaveDetails;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                Id = req.params.Id;
                isValid = (0, user_controller_1.validateUuid)(Id);
                if (!isValid) {
                    return [2 /*return*/, res.status(400).json({ message: "Invalid Id" })];
                }
                return [4 /*yield*/, (0, service_1.getOneLeave)(Id)];
            case 1:
                leaveExist = _a.sent();
                if (!leaveExist) {
                    return [2 /*return*/, res.status(404).json({
                            message: "Not found"
                        })];
                }
                ;
                leaveDetails = {
                    leaveTitle: leaveExist.title,
                    firstName: leaveExist.user.firstname,
                    lastName: leaveExist.user.lastname,
                    numberOfDays: leaveExist.number_of_days,
                    startDate: leaveExist.start_date,
                    endDate: leaveExist.end_date,
                };
                // Wrap the render in a Promise to ensure it completes before Puppeteer
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        res.render('index', leaveDetails, function (err, html) {
                            if (err) {
                                reject(err);
                            }
                            else {
                                res.send(html);
                                resolve();
                            }
                        });
                    })];
            case 2:
                // Wrap the render in a Promise to ensure it completes before Puppeteer
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.addLeaveCoverLetter = addLeaveCoverLetter;
var departmentalApproval = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var Id, director_id, isValid, valid, userExist, approved, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                Id = req.params.Id;
                director_id = req.body.director_id;
                if (!director_id) {
                    return [2 /*return*/, res.status(400).json({ message: "required field missing" })];
                }
                isValid = (0, user_controller_1.validateUuid)(Id);
                valid = (0, user_controller_1.validateUuid)(director_id);
                if (!isValid || !valid) {
                    return [2 /*return*/, res.status(400).json({ message: "Invalid Id" })];
                }
                ;
                return [4 /*yield*/, (0, service_1.getOne)(director_id)];
            case 1:
                userExist = _a.sent();
                if (!userExist.directorOf) {
                    return [2 /*return*/, res.status(401).json({ message: "not authorized" })];
                }
                ;
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, (0, service_1.department_approval)(Id)];
            case 3:
                approved = _a.sent();
                return [2 /*return*/, res.status(200).json({ message: "Approved at departmental level" })];
            case 4:
                error_7 = _a.sent();
                console.log(error_7);
                return [2 /*return*/, res.status(500).json({
                        message: "internal server error"
                    })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.departmentalApproval = departmentalApproval;
var departmentReject = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var Id, director_id, isValid, valid, userExist, reject, status, error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                Id = req.params.Id;
                director_id = req.body.director_id;
                if (!director_id) {
                    return [2 /*return*/, res.status(400).json({ message: "required field missing" })];
                }
                isValid = (0, user_controller_1.validateUuid)(Id);
                valid = (0, user_controller_1.validateUuid)(director_id);
                if (!isValid || !valid) {
                    return [2 /*return*/, res.status(400).json({ message: "Invalid Id" })];
                }
                ;
                return [4 /*yield*/, (0, service_1.getOne)(director_id)];
            case 1:
                userExist = _a.sent();
                if (!userExist.directorOf) {
                    return [2 /*return*/, res.status(401).json({ message: "not authorized" })];
                }
                ;
                _a.label = 2;
            case 2:
                _a.trys.push([2, 5, , 6]);
                return [4 /*yield*/, (0, service_1.department_reject)(Id)];
            case 3:
                reject = _a.sent();
                return [4 /*yield*/, (0, service_1.rejectOrApprove)(Id, entity_1.Status.reject)];
            case 4:
                status = _a.sent();
                return [2 /*return*/, res.status(200).json({ message: "Rejected" })];
            case 5:
                error_8 = _a.sent();
                console.log(error_8);
                return [2 /*return*/, res.status(500).json({
                        message: "internal server error"
                    })];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.departmentReject = departmentReject;
var operationsApproval = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var Id, director_id, isValid, valid, userExist, approved, error_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                Id = req.params.Id;
                director_id = req.body.director_id;
                if (!director_id) {
                    return [2 /*return*/, res.status(400).json({ message: "required field missing" })];
                }
                isValid = (0, user_controller_1.validateUuid)(Id);
                valid = (0, user_controller_1.validateUuid)(director_id);
                if (!isValid || !valid) {
                    return [2 /*return*/, res.status(400).json({ message: "Invalid Id" })];
                }
                ;
                return [4 /*yield*/, (0, service_1.getOne)(director_id)];
            case 1:
                userExist = _a.sent();
                if (!userExist.directorOf) {
                    return [2 /*return*/, res.status(401).json({ message: "not authorized" })];
                }
                ;
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, (0, service_1.operations_approval)(Id)];
            case 3:
                approved = _a.sent();
                return [2 /*return*/, res.status(200).json({ message: "Approved at operation and maagement level" })];
            case 4:
                error_9 = _a.sent();
                console.log(error_9);
                return [2 /*return*/, res.status(500).json({
                        message: "internal server error"
                    })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.operationsApproval = operationsApproval;
var operationReject = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var Id, director_id, isValid, valid, userExist, reject, status, error_10;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                Id = req.params.Id;
                director_id = req.body.director_id;
                if (!director_id) {
                    return [2 /*return*/, res.status(400).json({ message: "required field missing" })];
                }
                isValid = (0, user_controller_1.validateUuid)(Id);
                valid = (0, user_controller_1.validateUuid)(director_id);
                if (!isValid || !valid) {
                    return [2 /*return*/, res.status(400).json({ message: "Invalid Id" })];
                }
                ;
                return [4 /*yield*/, (0, service_1.getOne)(director_id)];
            case 1:
                userExist = _a.sent();
                if (!userExist.directorOf) {
                    return [2 /*return*/, res.status(401).json({ message: "not authorized" })];
                }
                ;
                _a.label = 2;
            case 2:
                _a.trys.push([2, 5, , 6]);
                return [4 /*yield*/, (0, service_1.operations_reject)(Id)];
            case 3:
                reject = _a.sent();
                return [4 /*yield*/, (0, service_1.rejectOrApprove)(Id, entity_1.Status.reject)];
            case 4:
                status = _a.sent();
                return [2 /*return*/, res.status(200).json({ message: "Rejected" })];
            case 5:
                error_10 = _a.sent();
                console.log(error_10);
                return [2 /*return*/, res.status(500).json({
                        message: "internal server error"
                    })];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.operationReject = operationReject;
//# sourceMappingURL=leave.controller.js.map