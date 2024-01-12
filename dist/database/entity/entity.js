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
exports.Relieving_officer = exports.Department = exports.Leave = exports.Approval_type = exports.Type = exports.Status = void 0;
var typeorm_1 = require("typeorm");
var user_1 = require("./user");
var Status;
(function (Status) {
    Status["pending"] = "PENDING";
    Status["approved"] = "approved";
    Status["reject"] = "reject";
})(Status || (exports.Status = Status = {}));
var Type;
(function (Type) {
    Type["annual leave"] = "annual leave";
    Type["vacation"] = "vacation";
    Type["sick leave"] = "sick leave";
    Type["maternity leave"] = "maternity leave";
})(Type || (exports.Type = Type = {}));
var Approval_type;
(function (Approval_type) {
    Approval_type["reviewed"] = "reviewed";
    Approval_type["to be reviewed"] = "to be reviewed";
    Approval_type["rejected"] = "rejected";
})(Approval_type || (exports.Approval_type = Approval_type = {}));
var Leave = /** @class */ (function () {
    function Leave() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
        __metadata("design:type", String)
    ], Leave.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: false }),
        __metadata("design:type", String)
    ], Leave.prototype, "title", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: false }),
        __metadata("design:type", String)
    ], Leave.prototype, "description", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: false }),
        __metadata("design:type", String)
    ], Leave.prototype, "number_of_weeks", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: false }),
        __metadata("design:type", String)
    ], Leave.prototype, "number_of_days", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: false }),
        __metadata("design:type", String)
    ], Leave.prototype, "start_date", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: false }),
        __metadata("design:type", String)
    ], Leave.prototype, "end_date", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "enum", enum: Approval_type, nullable: true, default: Approval_type["to be reviewed"] }),
        __metadata("design:type", String)
    ], Leave.prototype, "departmental_approval", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "enum", enum: Approval_type, nullable: true, default: Approval_type["to be reviewed"] }),
        __metadata("design:type", String)
    ], Leave.prototype, "operation_management_approval", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "enum", enum: Status, default: Status.pending }),
        __metadata("design:type", String)
    ], Leave.prototype, "status", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 500, nullable: true }),
        __metadata("design:type", String)
    ], Leave.prototype, "comment", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 500, nullable: true }),
        __metadata("design:type", String)
    ], Leave.prototype, "cover_letter", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "enum", enum: Type, nullable: true }),
        __metadata("design:type", String)
    ], Leave.prototype, "leave_type", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return user_1.User; }, function (user) { return user.leave; }),
        __metadata("design:type", user_1.User)
    ], Leave.prototype, "user", void 0);
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return Relieving_officer; }),
        __metadata("design:type", Relieving_officer)
    ], Leave.prototype, "reliving_officer", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({
            type: "timestamp",
            default: function () { return "CURRENT_TIMESTAMP"; },
            name: "created_at",
        }),
        __metadata("design:type", Date)
    ], Leave.prototype, "createdAt", void 0);
    Leave = __decorate([
        (0, typeorm_1.Entity)({ name: 'leave' })
    ], Leave);
    return Leave;
}());
exports.Leave = Leave;
var Department = /** @class */ (function () {
    function Department() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
        __metadata("design:type", String)
    ], Department.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", nullable: false }),
        __metadata("design:type", String)
    ], Department.prototype, "name", void 0);
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return user_1.User; }, function (user) { return user.directorOf; }, { nullable: true }) // Assuming a department may not have a director
        ,
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", user_1.User)
    ], Department.prototype, "director", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return user_1.User; }, function (user) { return user.staff; }, { nullable: true }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", Array)
    ], Department.prototype, "staff", void 0);
    Department = __decorate([
        (0, typeorm_1.Entity)({ name: 'department' })
    ], Department);
    return Department;
}());
exports.Department = Department;
var Relieving_officer = /** @class */ (function () {
    function Relieving_officer() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
        __metadata("design:type", String)
    ], Relieving_officer.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'boolean', default: false }),
        __metadata("design:type", Boolean)
    ], Relieving_officer.prototype, "is_viewed", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "boolean", nullable: true }),
        __metadata("design:type", Boolean)
    ], Relieving_officer.prototype, "accept_relieve", void 0);
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return Leave; }),
        __metadata("design:type", Leave // one to one
        )
    ], Relieving_officer.prototype, "relieve_leave", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return user_1.User; }, function (user) { return user.relieving_officer; }),
        __metadata("design:type", user_1.User // many to one
        )
    ], Relieving_officer.prototype, "relieving_officer", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return user_1.User; }, function (user) { return user.requesting_officer; }),
        __metadata("design:type", user_1.User // many to one
        )
    ], Relieving_officer.prototype, "requesting_officer", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({
            type: "timestamp",
            nullable: true
        }),
        __metadata("design:type", Date)
    ], Relieving_officer.prototype, "acceptance_date", void 0);
    Relieving_officer = __decorate([
        (0, typeorm_1.Entity)({ name: 'relieving_officer' })
    ], Relieving_officer);
    return Relieving_officer;
}());
exports.Relieving_officer = Relieving_officer;
//# sourceMappingURL=entity.js.map