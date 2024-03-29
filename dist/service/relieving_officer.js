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
exports.deleteRelieve = exports.updateRelieve = exports.getOneRelieveForLeave = exports.findOneRelieve = exports.findAllRelieve = exports.findRelievingOfficer = exports.createRequest = void 0;
var data_source_1 = require("../database/data-source");
var entity_1 = require("../database/entity/entity");
var Relieving_officer_repo = data_source_1.connectionSource.getRepository(entity_1.Relieving_officer);
// const addRelievingOfficerToLeave = async (Id: string) => {
//         const reliveId = await findOneRelieve(Id);
//         if (!reliveId) {
//             return false
//         };
//         const findLeave = await getOneLeave(reliveId.relieve_leave.id);
//         const updateLeave = await upda
// }
var createRequest = function (requestingUser, relieving_user, leave) { return __awaiter(void 0, void 0, void 0, function () {
    var officer, relieve;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                officer = Relieving_officer_repo.create({
                    relieve_leave: leave,
                    relieving_officer: relieving_user,
                    requesting_officer: requestingUser
                });
                return [4 /*yield*/, Relieving_officer_repo.save(officer)];
            case 1:
                relieve = _a.sent();
                return [2 /*return*/, relieve];
        }
    });
}); };
exports.createRequest = createRequest;
var findRelievingOfficer = function (relievingUser) { return __awaiter(void 0, void 0, void 0, function () {
    var relieving_officers;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Relieving_officer_repo.find({
                    where: { relieving_officer: { id: relievingUser.id } }
                })];
            case 1:
                relieving_officers = _a.sent();
                return [2 /*return*/, relieving_officers];
        }
    });
}); };
exports.findRelievingOfficer = findRelievingOfficer;
var findAllRelieve = function () { return __awaiter(void 0, void 0, void 0, function () {
    var relieve;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Relieving_officer_repo.find({
                    relations: ['relieve_leave', 'relieving_officer', 'requesting_officer']
                })];
            case 1:
                relieve = _a.sent();
                return [2 /*return*/, relieve];
        }
    });
}); };
exports.findAllRelieve = findAllRelieve;
var findOneRelieve = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var relive;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Relieving_officer_repo.findOne({
                    where: { id: id },
                    relations: ['relieving_officer', 'relieve_leave', 'requesting_officer']
                })];
            case 1:
                relive = _a.sent();
                return [2 /*return*/, relive];
        }
    });
}); };
exports.findOneRelieve = findOneRelieve;
var getOneRelieveForLeave = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var relieve;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Relieving_officer_repo.findOne({
                    where: { relieve_leave: { id: id } }
                })];
            case 1:
                relieve = _a.sent();
                return [2 /*return*/, relieve];
        }
    });
}); };
exports.getOneRelieveForLeave = getOneRelieveForLeave;
var updateRelieve = function (relieveData, relieveId) { return __awaiter(void 0, void 0, void 0, function () {
    var currentDate, formattedDate, date, updateResult, updatedRelieveOfficer;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                currentDate = new Date();
                formattedDate = new Intl.DateTimeFormat('en-GB', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                }).format(currentDate);
                date = relieveData.accept_relieve === true ? formattedDate : null;
                return [4 /*yield*/, Relieving_officer_repo
                        .createQueryBuilder()
                        .update() // Replace with your actual repository name
                        .set({
                        is_viewed: relieveData.is_viewed,
                        accept_relieve: relieveData.accept_relieve,
                        acceptance_date: date,
                    }) // Specify the updated values
                        .where("id = :id", { id: relieveId })
                        .execute()];
            case 1:
                updateResult = _a.sent();
                // Check if any rows were affected
                if (updateResult.affected === 0) {
                    throw new Error("No rows were updated. Check if the relieveId is valid.");
                }
                return [4 /*yield*/, Relieving_officer_repo.findOne({ where: { id: relieveId } })];
            case 2:
                updatedRelieveOfficer = _a.sent();
                console.log(updatedRelieveOfficer);
                return [2 /*return*/, updatedRelieveOfficer];
        }
    });
}); };
exports.updateRelieve = updateRelieve;
var deleteRelieve = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var relieve_officer;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Relieving_officer_repo.delete(id)];
            case 1:
                relieve_officer = _a.sent();
                return [2 /*return*/, relieve_officer];
        }
    });
}); };
exports.deleteRelieve = deleteRelieve;
//# sourceMappingURL=relieving_officer.js.map