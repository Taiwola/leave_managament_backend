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
exports.delete_relieve = exports.update_relieve = exports.find_one_relieve = exports.find_all_relieve = exports.createRelive = void 0;
var service_1 = require("../service");
var uuid_1 = require("uuid");
var validateUuid = function (Id) {
    var isValid = (0, uuid_1.validate)(Id);
    return isValid;
};
var createRelive = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, requestingOfficerId, leaveId, relievingOfficerId, requestingUser, relievinguser, leave, create_relieve, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, requestingOfficerId = _a.requestingOfficerId, leaveId = _a.leaveId, relievingOfficerId = _a.relievingOfficerId;
                return [4 /*yield*/, (0, service_1.getOne)(requestingOfficerId)];
            case 1:
                requestingUser = _b.sent();
                return [4 /*yield*/, (0, service_1.getOne)(relievingOfficerId)];
            case 2:
                relievinguser = _b.sent();
                if (!requestingUser || !relievinguser) {
                    return [2 /*return*/, res.status(400).json({
                            success: false,
                            message: 'user does not exist'
                        })];
                }
                ;
                return [4 /*yield*/, (0, service_1.getOneLeave)(leaveId)];
            case 3:
                leave = _b.sent();
                if (!leave) {
                    return [2 /*return*/, res.status(400).json({
                            success: false,
                            message: 'leave does not exist'
                        })];
                }
                _b.label = 4;
            case 4:
                _b.trys.push([4, 6, , 7]);
                return [4 /*yield*/, (0, service_1.createRequest)(requestingUser, relievinguser, leave)];
            case 5:
                create_relieve = _b.sent();
                res.status(200).json({
                    message: 'request successful',
                    create_relieve: create_relieve
                });
                return [3 /*break*/, 7];
            case 6:
                error_1 = _b.sent();
                console.log(error_1);
                res.status(500).json({ message: 'internal server error', error: error_1.message, success: false });
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.createRelive = createRelive;
var find_all_relieve = function (request, res) { return __awaiter(void 0, void 0, void 0, function () {
    var relieve;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, service_1.findAllRelieve)()];
            case 1:
                relieve = _a.sent();
                return [2 /*return*/, relieve];
        }
    });
}); };
exports.find_all_relieve = find_all_relieve;
var find_one_relieve = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var relieveId, validId, relieve;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                relieveId = req.params.relieveId;
                validId = validateUuid(relieveId);
                if (!validId) {
                    return [2 /*return*/, res.status(400).json({ message: "Invalid Id" })];
                }
                return [4 /*yield*/, (0, service_1.findOneRelieve)(relieveId)];
            case 1:
                relieve = _a.sent();
                if (!relieve) {
                    return [2 /*return*/, res.status(400).json({
                            message: 'Request does not exist'
                        })];
                }
                return [2 /*return*/, res.status(200).json({
                        message: 'Request successfull',
                        relieve: relieve
                    })];
        }
    });
}); };
exports.find_one_relieve = find_one_relieve;
var update_relieve = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var partialRelieveData, reliveId, updatedRelieve, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                partialRelieveData = req.body.partialRelieveData;
                reliveId = req.params.reliveId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, service_1.updateRelieve)(partialRelieveData, reliveId)];
            case 2:
                updatedRelieve = _a.sent();
                return [2 /*return*/, res.status(200).json({
                        message: 'update successful',
                        updateRelieve: service_1.updateRelieve,
                        success: true
                    })];
            case 3:
                error_2 = _a.sent();
                console.log(error_2);
                res.status(500).json({
                    message: 'Internal server error',
                    error: error_2.message
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.update_relieve = update_relieve;
var delete_relieve = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var relieveId, validId, relieve;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                relieveId = req.params.relieveId;
                validId = validateUuid(relieveId);
                if (!validId) {
                    return [2 /*return*/, res.status(400).json({ message: "Invalid Id" })];
                }
                return [4 /*yield*/, (0, service_1.deleteRelieve)(relieveId)];
            case 1:
                relieve = _a.sent();
                return [2 /*return*/, res.status(200).json({
                        messsage: "request successfull",
                    })];
        }
    });
}); };
exports.delete_relieve = delete_relieve;
//# sourceMappingURL=relieving_officer_controller.js.map