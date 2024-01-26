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
exports.optAndMgtApproval = exports.directorApproval = exports.addRelievingOfficerCoverLetter = void 0;
var user_controller_1 = require("./user.controller");
var service_1 = require("../service");
function getCurrentDateTime() {
    var currentDate = new Date();
    var year = currentDate.getFullYear();
    var month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    var day = String(currentDate.getDate()).padStart(2, '0');
    var hours = String(currentDate.getHours()).padStart(2, '0');
    var minutes = String(currentDate.getMinutes()).padStart(2, '0');
    var seconds = String(currentDate.getSeconds()).padStart(2, '0');
    var formattedDateTime = "".concat(year, "-").concat(month, "-").concat(day, " ").concat(hours, ":").concat(minutes, ":").concat(seconds);
    return formattedDateTime;
}
var addRelievingOfficerCoverLetter = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var Id, isValid, relieveId, dataDetails;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                Id = req.params.Id;
                isValid = (0, user_controller_1.validateUuid)(Id);
                if (!isValid) {
                    return [2 /*return*/, res.status(400).json({ message: "Invalid Id" })];
                }
                return [4 /*yield*/, (0, service_1.findOneRelieve)(Id)];
            case 1:
                relieveId = _a.sent();
                if (!relieveId) {
                    return [2 /*return*/, res.status(400).json({
                            message: "request does not exist"
                        })];
                }
                ;
                if (relieveId.accept_relieve === false || relieveId.accept_relieve === null) {
                    return [2 /*return*/, res.status(403).json({ message: "Your request is not yet approved" })];
                }
                dataDetails = {
                    relivingOfficerName: relieveId.relieving_officer.firstname + " " + relieveId.relieving_officer.lastname,
                    requestingOfficerName: relieveId.requesting_officer.firstname + " " + relieveId.requesting_officer.lastname,
                    leaveStartDate: relieveId.relieve_leave.start_date,
                    leaveEndDate: relieveId.relieve_leave.end_date,
                    acceptanceDate: relieveId.acceptance_date,
                };
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        res.render('relieve', dataDetails, function (err, html) {
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
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.addRelievingOfficerCoverLetter = addRelievingOfficerCoverLetter;
var directorApproval = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var Id, isValid, leave, dataDetails;
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
                leave = _a.sent();
                if (!leave) {
                    return [2 /*return*/, res.status(404).json({ message: 'Requested leave does not exist' })];
                }
                ;
                dataDetails = {
                    requestingOfficerName: leave.user.firstname + " " + leave.user.lastname,
                    date: 11 - 2 - 2024
                };
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        res.render('director', dataDetails, function (err, html) {
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
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.directorApproval = directorApproval;
var optAndMgtApproval = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var Id, isValid, relieve, department, deptOfOptAndMgt, requesting_officer, directorSignature, dataDetails, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                Id = req.params.Id;
                isValid = (0, user_controller_1.validateUuid)(Id);
                if (!isValid) {
                    return [2 /*return*/, res.status(400).json({ message: "Invalid Id" })];
                }
                return [4 /*yield*/, (0, service_1.findOneRelieve)(Id)];
            case 1:
                relieve = _a.sent();
                if (!relieve) {
                    return [2 /*return*/, res.status(404).json({ message: 'Requested leave does not exist' })];
                }
                ;
                return [4 /*yield*/, (0, service_1.findAll_dept)()];
            case 2:
                department = _a.sent();
                deptOfOptAndMgt = department.filter(function (dept) { return dept.name === 'operation and management'; }).flat().map(function (dept) {
                    return dept.director.signature;
                });
                requesting_officer = relieve.requesting_officer.firstname + ' ' + relieve.requesting_officer.lastname;
                directorSignature = deptOfOptAndMgt[0];
                dataDetails = {
                    requestingOfficerName: requesting_officer,
                    startDate: relieve.relieve_leave.start_date,
                    endDate: relieve.relieve_leave.end_date,
                    date: getCurrentDateTime(),
                    leaveYear: 2024,
                    leaveInstallment: 1,
                    approvalDate: relieve.acceptance_date
                };
                _a.label = 3;
            case 3:
                _a.trys.push([3, 5, , 6]);
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        res.render('operation', dataDetails, function (err, html) {
                            if (err) {
                                reject(err);
                            }
                            else {
                                res.send(html);
                                resolve();
                            }
                        });
                    })];
            case 4:
                _a.sent();
                return [3 /*break*/, 6];
            case 5:
                error_1 = _a.sent();
                console.log(error_1);
                res.status(500).json({
                    message: 'internal server error'
                });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.optAndMgtApproval = optAndMgtApproval;
//# sourceMappingURL=coverletter.controller.js.map