"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = exports.userSchema = void 0;
var joi_1 = __importDefault(require("joi"));
exports.userSchema = joi_1.default.object({
    firstname: joi_1.default.string().required(),
    lastname: joi_1.default.string().required(),
    email: joi_1.default.string().required(),
    password: joi_1.default.string().required(),
});
var validateRequest = function (schema) {
    return function (req, res, next) {
        var result = schema.validate(req.body);
        if (result.error) {
            return res.status(400).json({
                error: result.error.details[0].message,
            });
        }
        if (!req.value) {
            req.value.body = {};
        }
        req.value.body = result.value; // Assign 'body' property to 'req.value'
        next();
    };
};
exports.validateRequest = validateRequest;
//# sourceMappingURL=validator.js.map