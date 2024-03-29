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
exports.logUserOut = exports.signIn = exports.registerUser = void 0;
var service_1 = require("../service");
var bcrypt = __importStar(require("bcryptjs"));
var jwt_1 = require("../config/jwt");
var user_1 = require("../database/entity/user");
var registerUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, firstname, lastname, email, password, status, userExist, hashPassword, newUser, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, firstname = _a.firstname, lastname = _a.lastname, email = _a.email, password = _a.password;
                status = user_1.UserStatus.user;
                return [4 /*yield*/, (0, service_1.getUserEmail)(email)];
            case 1:
                userExist = _b.sent();
                if (userExist) {
                    return [2 /*return*/, res.status(409).json({ message: 'This email is already in use' })];
                }
                _b.label = 2;
            case 2:
                _b.trys.push([2, 5, , 6]);
                return [4 /*yield*/, bcrypt.hash(password, 10)];
            case 3:
                hashPassword = _b.sent();
                return [4 /*yield*/, (0, service_1.createUser)({
                        firstname: firstname,
                        lastname: lastname,
                        email: email,
                        password: hashPassword,
                        status: status,
                        gradeLevel: 0
                    })];
            case 4:
                newUser = _b.sent();
                return [2 /*return*/, res.status(201).json({
                        message: 'New account created',
                        data: newUser
                    })];
            case 5:
                error_1 = _b.sent();
                console.log('Error', error_1);
                return [2 /*return*/, res.status(500).json({
                        message: 'Something went wrong while creating the account.'
                    })];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.registerUser = registerUser;
var signIn = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, userExist, pwd, compPwd, accessToken;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                return [4 /*yield*/, (0, service_1.getUserEmail)(email)];
            case 1:
                userExist = _b.sent();
                if (!userExist) {
                    return [2 /*return*/, res.status(404).json({ message: "user not found" })];
                }
                ;
                pwd = userExist.password;
                return [4 /*yield*/, bcrypt.compare(password, pwd)];
            case 2:
                compPwd = _b.sent();
                if (!compPwd) {
                    return [2 /*return*/, res.status(400).json({ message: "invalid credentials" })];
                }
                return [4 /*yield*/, (0, jwt_1.generateJwt)(email, userExist.id)];
            case 3:
                accessToken = _b.sent();
                req.session.user_id = userExist.id;
                req.session.email = email;
                return [2 /*return*/, res.status(200).json({
                        message: "you have sucessfully logged in",
                        accessToken: accessToken,
                        id: userExist.id
                    })];
        }
    });
}); };
exports.signIn = signIn;
var logUserOut = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        if (req.session) {
            // delete the session object
            req.session.destroy(function (err) {
                if (err) {
                    console.log('error:' + err);
                    return res.status(400).json('unable to log out');
                }
                else {
                    res.clearCookie('connect.sid'); // 'connect.sid' is the default session cookie name
                    return res.status(200).json({ message: 'logging you out...' });
                }
            });
        }
        else {
            return [2 /*return*/, res.status(200).json({ message: "logging you out...", })];
        }
        return [2 /*return*/];
    });
}); };
exports.logUserOut = logUserOut;
//# sourceMappingURL=auth.controller.js.map