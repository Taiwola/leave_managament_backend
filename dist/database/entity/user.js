"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.UserStatus = void 0;
var typeorm_1 = require("typeorm");
var entity_1 = require("./entity");
var UserStatus;
(function (UserStatus) {
    UserStatus["user"] = "user";
    UserStatus["admin"] = "admin";
    UserStatus["superadmin"] = "superadmin";
})(UserStatus || (exports.UserStatus = UserStatus = {}));
var User = /** @class */ (function () {
    function User() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
        __metadata("design:type", String)
    ], User.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
        __metadata("design:type", String)
    ], User.prototype, "firstname", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
        __metadata("design:type", String)
    ], User.prototype, "lastname", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
        __metadata("design:type", String)
    ], User.prototype, "email", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "enum", enum: UserStatus }),
        __metadata("design:type", String)
    ], User.prototype, "status", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
        __metadata("design:type", String)
    ], User.prototype, "password", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return entity_1.Leave; }, function (leave) { return leave.user; }, { cascade: true }),
        __metadata("design:type", Array)
    ], User.prototype, "leave", void 0);
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return entity_1.Department; }, function (department) { return department.director; }),
        __metadata("design:type", entity_1.Department)
    ], User.prototype, "directorOf", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return entity_1.Department; }, function (staff) { return staff.staff; }),
        (0, typeorm_1.JoinColumn)({ name: 'department_table' }),
        __metadata("design:type", entity_1.Department)
    ], User.prototype, "staff", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "text", nullable: true }),
        __metadata("design:type", String)
    ], User.prototype, "signature", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return entity_1.Relieving_officer; }, function (relieving_officer) { return relieving_officer.relieving_officer; }),
        __metadata("design:type", entity_1.Relieving_officer)
    ], User.prototype, "relieving_officer", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return entity_1.Relieving_officer; }, function (relieving_officer) { return relieving_officer.requesting_officer; }),
        __metadata("design:type", entity_1.Relieving_officer)
    ], User.prototype, "requesting_officer", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({
            type: "timestamp",
            default: function () { return "CURRENT_TIMESTAMP"; },
            name: "created_at",
        }),
        __metadata("design:type", Date)
    ], User.prototype, "createdAt", void 0);
    User = __decorate([
        (0, typeorm_1.Entity)({ name: "User" })
    ], User);
    return User;
}());
exports.User = User;
//# sourceMappingURL=user.js.map